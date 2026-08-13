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

// 1. Configurar soporte de LaTeX / Math
const md = new MarkdownIt({ html: true, breaks: true }).use(markdownItKatex);

// 2. Custom Renderers para Notion-to-MD (Garantiza imágenes y ecuaciones de Notion)
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

async function getNotionPageTitle(pageId) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    if (page.properties && page.properties.title) {
      return page.properties.title.title[0]?.plain_text || 'Documento Notion';
    }
    if (page.properties && page.properties.Name) {
      return page.properties.Name.title[0]?.plain_text || 'Documento Notion';
    }
  } catch (e) {
    console.log('Usando título genérico...');
  }
  return 'Documento Notion';
}

async function exportToPdf() {
  console.log('Obteniendo datos de Notion con transformers personalizados...');
  
  const title = await getNotionPageTitle(NOTION_PAGE_ID);
  const mdblocks = await n2m.pageToMarkdown(NOTION_PAGE_ID);
  const mdString = n2m.toMarkdownString(mdblocks);
  const contentHtml = md.render(mdString.parent);

  // Plantilla HTML estilizada para apuntes académicos / técnicos
  const fullHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
      <style>
        @page {
          size: A4;
          margin: 20mm 15mm 20mm 15mm;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          line-height: 1.5;
          color: #2f3437;
          font-size: 11pt;
        }

        /* Evitar saltos huérfanos en títulos */
        h1, h2, h3 {
          page-break-after: avoid;
          break-after: avoid;
          color: #111;
        }

        h1 {
          font-size: 22pt;
          border-bottom: 2px solid #2eaadc;
          padding-bottom: 6px;
          margin-top: 0;
        }

        h2 {
          font-size: 15pt;
          border-bottom: 1px solid #e1e1e1;
          padding-bottom: 4px;
          margin-top: 20px;
        }

        h3 {
          font-size: 12pt;
          margin-top: 14px;
        }

        /* Ecuaciones centradas */
        .katex-display {
          margin: 1.2em 0 !important;
          padding: 8px;
          background: #fbfbfb;
          border-radius: 4px;
          border: 1px solid #f0f0f0;
          page-break-inside: avoid;
        }

        /* Tablas tipo Notion */
        table {
          border-collapse: collapse;
          width: 100%;
          margin: 16px 0;
          font-size: 9.5pt;
          page-break-inside: avoid;
        }

        th, td {
          border: 1px solid #e9e9e9;
          padding: 6px 10px;
          text-align: left;
        }

        th {
          background-color: #f7f6f3;
          font-weight: 600;
        }

        /* Imágenes ajustadas y centradas */
        figure {
          margin: 16px 0;
          text-align: center;
          page-break-inside: avoid;
        }

        img {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          border: 1px solid #eaeaea;
        }

        figcaption {
          font-size: 8.5pt;
          color: #73726e;
          margin-top: 4px;
        }

        /* Bloques de código */
        code {
          background: #f4f4f4;
          color: #eb5757;
          padding: 2px 5px;
          border-radius: 3px;
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
          font-size: 0.9em;
        }

        pre code {
          background: transparent;
          color: inherit;
          padding: 0;
        }

        pre {
          background: #f7f6f3;
          padding: 12px;
          border-radius: 5px;
          overflow-x: auto;
          font-size: 9pt;
          page-break-inside: avoid;
        }

        blockquote {
          border-left: 3px solid #2f3437;
          margin: 12px 0;
          padding-left: 12px;
          color: #5a5a5a;
          background: #fbfbfb;
          padding-top: 4px;
          padding-bottom: 4px;
        }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      ${contentHtml}
    </body>
    </html>
  `;

  console.log('Generando el PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Cargar contenido y esperar a que bajen recursos gráficos
  await page.setContent(fullHtml, { waitUntil: 'networkidle0', timeout: 60000 });

  const pdfPath = path.join('/tmp', 'output.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    // Pie de página con numeración "Página X de Y"
    footerTemplate: `
      <div style="font-size: 8pt; font-family: sans-serif; width: 100%; text-align: right; padding-right: 15mm; color: #888;">
        Página <span class="pageNumber"></span> de <span class="totalPages"></span>
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

  console.log('¡Sincronización completada!');
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