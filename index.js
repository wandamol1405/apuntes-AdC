import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import MarkdownIt from 'markdown-it';
import markdownItKatex from '@vscode/markdown-it-katex';
import hljs from 'highlight.js';
import puppeteer from 'puppeteer';
import { google } from 'googleapis';

const GDRIVE_CREDENTIALS = process.env.GDRIVE_CREDENTIALS;
const GDRIVE_FILE_ID = process.env.GDRIVE_FILE_ID;

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const NODE_MODULES = path.join(ROOT, 'node_modules');
const MARKDOWN_PATH = path.join(ROOT, 'docs', 'arquitectura.md');
const DOC_DIR = path.dirname(MARKDOWN_PATH);
const STYLES_PATH = path.join(ROOT, 'styles', 'pdf.css');
const OUTPUT_PATH = path.join(ROOT, 'out', 'arquitectura.pdf');

// --local genera el PDF en out/ sin subirlo a Drive
const LOCAL_ONLY = process.argv.includes('--local');

// Los bloques ```nasm del apunte son ensamblador RISC-V/MIPS (comentarios con #, registros $n)
const HIGHLIGHT_ALIASES = { nasm: 'mipsasm', asm: 'mipsasm' };

const FONTS = [
  { family: 'Inter', pkg: 'inter', weight: 400, style: 'normal' },
  { family: 'Inter', pkg: 'inter', weight: 400, style: 'italic' },
  { family: 'Inter', pkg: 'inter', weight: 600, style: 'normal' },
  { family: 'Inter', pkg: 'inter', weight: 600, style: 'italic' },
  { family: 'Inter', pkg: 'inter', weight: 700, style: 'normal' },
  { family: 'Inter', pkg: 'inter', weight: 700, style: 'italic' },
  { family: 'JetBrains Mono', pkg: 'jetbrains-mono', weight: 400, style: 'normal' },
  { family: 'JetBrains Mono', pkg: 'jetbrains-mono', weight: 700, style: 'normal' }
];

const missingImages = [];

function toDataUri(filePath) {
  return `data:font/woff2;base64,${fs.readFileSync(filePath).toString('base64')}`;
}

// Las fuentes van embebidas: una página file:// no puede cargar fuentes de otra carpeta
function buildFontCss() {
  return FONTS.map(({ family, pkg, weight, style }) => {
    const file = path.join(NODE_MODULES, '@fontsource', pkg, 'files', `${pkg}-latin-${weight}-${style}.woff2`);
    return `@font-face { font-family: '${family}'; font-weight: ${weight}; font-style: ${style}; src: url(${toDataUri(file)}) format('woff2'); }`;
  }).join('\n');
}

function buildKatexCss() {
  const distDir = path.join(NODE_MODULES, 'katex', 'dist');
  return fs.readFileSync(path.join(distDir, 'katex.min.css'), 'utf-8')
    .replace(/,url\(fonts\/[^)]+\.(?:woff|ttf)\) format\("[^"]+"\)/g, '')
    .replace(/url\(fonts\/([^)]+\.woff2)\)/g, (_, file) => `url(${toDataUri(path.join(distDir, 'fonts', file))})`);
}

// Separa el título (primer H1) y las líneas "Clave: valor" que Notion exporta debajo
function extractFrontMatter(source) {
  const match = source.match(/^\s*# (.+)\n+((?:[^\n:#]+: .+\n)*)/);
  if (!match) return { title: path.basename(MARKDOWN_PATH, '.md'), meta: [], body: source };

  const meta = match[2].split('\n').filter(Boolean).map((line) => {
    const separator = line.indexOf(': ');
    return { label: line.slice(0, separator), value: line.slice(separator + 2).trim() };
  });
  return { title: match[1].trim(), meta, body: source.slice(match[0].length) };
}

// Corrige artefactos del export de Notion antes de parsear (sin tocar los bloques de código)
function normalizeMarkdown(source) {
  const lines = source.split('\n');
  let inFence = false;

  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    // Math inline exportado como \( ... \)
    lines[i] = lines[i].replace(/\\\((.+?)\\\)/g, (_, tex) => `$${tex}$`);

    // Un | dentro de `código` corta la celda de la tabla
    if (/^\s*\|/.test(lines[i])) {
      lines[i] = lines[i].replace(/`[^`]*`/g, (code) => code.replace(/(?<!\\)\|/g, '\\|'));
    }

    // Una fórmula sola en su párrafo se muestra centrada (display)
    const alone = lines[i].match(/^(\s*)\$([^$]+)\$\s*$/);
    const isBlank = (line) => line === undefined || line.trim() === '';
    if (alone && isBlank(lines[i - 1]) && isBlank(lines[i + 1])) {
      lines[i] = `${alone[1]}$$${alone[2]}$$`;
    }
  }
  return lines.join('\n');
}

// Notion envuelve fórmulas en *cursiva* y escribe palabras enteras en modo matemático;
// las palabras pasan a \text{} para que se lean como texto y conserven los espacios
function tidyMath(tex) {
  return tex
    .replace(/^\s*\*|\*\s*$/g, '')
    .replace(
      /(?<![\\A-Za-zÀ-ÿ])[A-Za-zÀ-ÿ]{2,}(?:(?:\\ |\s)+[A-Za-zÀ-ÿ]+)*(?![A-Za-zÀ-ÿ])/g,
      (words) => `\\text{${words.replace(/(?:\\ |\s)+/g, ' ')}}`
    );
}

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function resolveImage(src) {
  if (/^(https?:|data:)/.test(src)) return src;

  // Los enlaces exportados apuntan a la carpeta de Notion; los archivos viven en docs/images
  const decoded = decodeURIComponent(src);
  const candidates = [path.resolve(DOC_DIR, decoded), path.join(DOC_DIR, 'images', path.basename(decoded))];
  const found = candidates.find((candidate) => fs.existsSync(candidate));
  if (!found) {
    missingImages.push(decoded);
    return src;
  }
  return pathToFileURL(found).href;
}

function createRenderer() {
  const md = new MarkdownIt({
    html: true,
    highlight(code, lang) {
      const language = HIGHLIGHT_ALIASES[lang] ?? lang;
      if (!language || !hljs.getLanguage(language)) return '';
      return hljs.highlight(code, { language }).value;
    }
  }).use(markdownItKatex.default ?? markdownItKatex, { throwOnError: false, strict: 'ignore' });

  md.core.ruler.push('tidy_math', (state) => {
    const visit = (tokens) => tokens.forEach((token) => {
      if (token.type.startsWith('math_')) token.content = tidyMath(token.content);
      if (token.children) visit(token.children);
    });
    visit(state.tokens);
  });

  // Asigna ids a los títulos y los junta en env.headings para armar el índice
  md.core.ruler.push('heading_ids', (state) => {
    const used = new Map();
    state.env.headings = [];

    state.tokens.forEach((token, index) => {
      if (token.type !== 'heading_open') return;

      const text = state.tokens[index + 1].children
        .filter((child) => child.type === 'text' || child.type === 'code_inline')
        .map((child) => child.content)
        .join('')
        .trim();
      if (!text) return;

      const base = slugify(text) || 'seccion';
      const count = used.get(base) ?? 0;
      used.set(base, count + 1);
      const id = count ? `${base}-${count}` : base;

      token.attrSet('id', id);
      state.env.headings.push({ level: Number(token.tag.slice(1)), text, id });
    });
  });

  const renderImage = md.renderer.rules.image;
  md.renderer.rules.image = (tokens, index, options, env, self) => {
    const token = tokens[index];
    token.attrSet('src', resolveImage(token.attrGet('src')));
    return renderImage(tokens, index, options, env, self);
  };

  return md;
}

function buildToc(md, headings) {
  // Cada título de nivel 1-2 abre un grupo con sus subtítulos, para que no se separen entre columnas
  const groups = [];
  headings.filter(({ level }) => level <= 3).forEach(({ level, text, id }) => {
    const link = `<a class="toc-l${level}" href="#${id}">${md.utils.escapeHtml(text)}</a>`;
    if (level < 3 || !groups.length) groups.push([]);
    groups[groups.length - 1].push(link);
  });

  if (!groups.length) return '';
  const items = groups.map((links) => `<div class="toc-group">${links.join('')}</div>`).join('\n');
  return `<nav class="toc"><p class="toc-title">Contenido</p><div class="toc-list">${items}</div></nav>`;
}

function buildHtml() {
  const md = createRenderer();
  const { title, meta, body } = extractFrontMatter(fs.readFileSync(MARKDOWN_PATH, 'utf-8'));

  const env = {};
  const contentHtml = md.render(normalizeMarkdown(body), env);

  if (missingImages.length) {
    throw new Error(`No se encontraron estas imágenes en docs/: ${missingImages.join(', ')}`);
  }

  const escape = md.utils.escapeHtml;
  const metaHtml = meta
    .map(({ label, value }) => `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`)
    .join('');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${escape(title)}</title>
  <style>${buildFontCss()}</style>
  <style>${buildKatexCss()}</style>
  <style>${fs.readFileSync(STYLES_PATH, 'utf-8')}</style>
</head>
<body>
  <header class="doc-header">
    <h1 class="doc-title">${escape(title)}</h1>
    ${metaHtml ? `<dl class="doc-meta">${metaHtml}</dl>` : ''}
  </header>
  ${buildToc(md, env.headings)}
  <main>
    ${contentHtml}
  </main>
</body>
</html>`;

  return { html, title: escape(title) };
}

async function exportToPdf() {
  console.log('Leyendo documento Markdown local...');
  const { html, title } = buildHtml();

  // Se carga desde un archivo: una página creada con setContent no puede leer imágenes file://
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'md-pdf-'));
  const htmlPath = path.join(tempDir, 'documento.html');
  fs.writeFileSync(htmlPath, html);

  console.log('Generando PDF con Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    await page.pdf({
      path: OUTPUT_PATH,
      format: 'A4',
      printBackground: true,
      outline: true,
      displayHeaderFooter: true,
      footerTemplate: `
        <div style="font-size: 7.5pt; font-family: sans-serif; width: 100%; display: flex; justify-content: space-between; padding: 0 16mm; color: #8c959f;">
          <span>${title}</span>
          <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
        </div>
      `,
      headerTemplate: `<div></div>`,
      margin: { top: '18mm', right: '16mm', bottom: '20mm', left: '16mm' }
    });
  } finally {
    await browser.close();
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  console.log(`PDF generado en ${path.relative(ROOT, OUTPUT_PATH)}`);
  return OUTPUT_PATH;
}

async function updateDriveFile(pdfPath) {
  if (!GDRIVE_CREDENTIALS || !GDRIVE_FILE_ID) {
    throw new Error('Faltan GDRIVE_CREDENTIALS o GDRIVE_FILE_ID (usar --local para generar solo el PDF)');
  }

  console.log('Actualizando archivo en Google Drive...');
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(GDRIVE_CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/drive']
  });

  const drive = google.drive({ version: 'v3', auth });

  await drive.files.update({
    fileId: GDRIVE_FILE_ID,
    media: {
      mimeType: 'application/pdf',
      body: fs.createReadStream(pdfPath)
    }
  });

  console.log('¡Sincronización completada con éxito!');
}

async function main() {
  try {
    const pdfPath = await exportToPdf();
    if (!LOCAL_ONLY) await updateDriveFile(pdfPath);
  } catch (error) {
    console.error('Error durante la ejecución:', error);
    process.exit(1);
  }
}

main();
