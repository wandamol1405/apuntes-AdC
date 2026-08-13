import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import MarkdownIt from 'markdown-it';
import markdownItKatex from 'markdown-it-katex';
import puppeteer from 'puppeteer';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;
const GDRIVE_CREDENTIALS = process.env.GDRIVE_CREDENTIALS;
const GDRIVE_FILE_ID = process.env.GDRIVE_FILE_ID;

const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

// Configuración de MarkdownIt con KaTeX (math inline/block)
const md = new MarkdownIt({ html: true, breaks: true }).use(markdownItKatex);

// Transformers personalizados para NotionToMarkdown
n2m.setCustomTransformer('equation', async (block) => {
  const { equation } = block;
  return `\n$$\n${equation.expression}\n$$\n`;
});

n2m.setCustomTransformer('inline_equation', async (block) => {
  const { equation } = block;
  return `$${equation.expression}$`;
});

n2m.setCustomTransformer('image', async (block) => {
  const image = block.image;
  const imageUrl = image.type === 'file' ? image.file.url : image.external.url;
  const caption = image.caption ? image.caption.map((c) => c.plain_text).join('') : '';
  return `<figure><img src="${imageUrl}" alt="${caption}" /><figcaption>${caption}</figcaption></figure>`;
});

async function exportToPdf() {
  console.log('Obteniendo datos de Notion...');
  
  // Asignamos directamente el título requerido
  const documentTitle = 'Arquitectura de Computadoras';

  const mdblocks = await n2m.pageToMarkdown(NOTION_PAGE_ID);
  const mdString = n2m.toMarkdownString(mdblocks);
  
  // Renderizar Markdown + Math KaTeX a HTML
  const contentHtml = md.render(mdString.parent);

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <!-- Soporte para estilos de fórmulas matemáticas KaTeX -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
      <style>
        @page {
          size: A4;
          margin: 20mm 15mm 20mm 15mm;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          line-height: 1.6;
          color: #2f3437;
          font-size: 10.5pt;
        }

        /* Título Principal */
        .doc-title {
          font-size: 24pt;
          font-weight: 700;
          color: #111;
          border-bottom: 2px solid #2eaadc;
          padding-bottom: 8px;
          margin-top: 0;
          margin-bottom: 24px;
        }

        /* Control de saltos de página y títulos */
        h1, h2, h3, h4 {
          page-break-after: avoid;
          break-after: avoid;
          color: #111;
        }

        h1 { font-size: 18pt; margin-top: 24px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
        h2 { font-size: 14pt; margin-top: 20px; }
        h3 { font-size: 11.5pt; margin-top: 16px; }

        /* Estilos de LaTeX / Fórmulas centradas */
        .katex-display {
          margin: 1em 0 !important;
          padding: 10px;
          background: #fdfdfd;
          border-radius: 4px;
          border: 1px solid #eaeaea;
          page-break-inside: avoid;
        }

        /* Tablas */
        table {
          border-collapse: collapse;
          width: 100%;
          margin: 16px 0;
          font-size: 9.5pt;
          page-break-inside: avoid;
        }

        th, td {
          border: 1px solid #e1e1e1;
          padding: 6px 10px;
          text-align: left;
        }

        th {
          background-color: #f7f6f3;
          font-weight: 600;
        }

        /* Imágenes */
        figure {
          margin: 18px 0;
          text-align: center;
          page-break-inside: avoid;
        }

        img {
          max-width: 90%;
          height: auto;
          border-radius: 4px;
          border: 1px solid #eaeaea;
        }

        figcaption {
          font-size: 8.5pt;
          color: #73726e;
          margin-top: 6px;
        }

        /* Bloques de código (Ejemplos C / Assembly) */
        pre {
          background: #f7f6f3;
          padding: 12px;
          border-radius: 5px;
          border: 1px solid #e8e8e8;
          overflow-x: auto;
          font-size: 9pt;
          page-break-inside: avoid;
        }

        code {
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
          background: #f4f4f4;
          color: #eb5757;
          padding: 2px 4px;
          border-radius: 3px;
          font-size: 0.9em;
        }

        pre code {
          background: transparent;
          color: inherit;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <h1 class="doc-title">${documentTitle}</h1>
      ${contentHtml}
    </body>
    </html>
  `;

  console.log('Generando PDF con Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'networkidle0', timeout: 60000 });

  const pdfPath = path.join('/tmp', 'output.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    footerTemplate: `
      <div style="font-size: 8pt; font-family: sans-serif; width: 100%; text-align: right; padding-right: 15mm; color: #777;">
        Arquitectura de Computadoras — Página <span class="pageNumber"></span> de <span class="totalPages"></span>
      </div>
    `,
    headerTemplate: `<div></div>`,
    margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' }
  });

  await browser.close();
  return pdfPath;
}

async function updateDriveFile(pdfPath) {
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

  console.log('¡PDF actualizado con éxito en Google Drive!');
}

async function main() {
  try {
    const pdfPath = await exportToPdf();
    await updateDriveFile(pdfPath);
  } catch (error) {
    console.error('Error durante la ejecución:', error);
    process.exit(1);
  }
}

main();