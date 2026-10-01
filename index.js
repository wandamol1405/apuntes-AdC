import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';
import markdownItKatex from 'markdown-it-katex';
import puppeteer from 'puppeteer';
import { google } from 'googleapis';

const GDRIVE_CREDENTIALS = process.env.GDRIVE_CREDENTIALS;
const GDRIVE_FILE_ID = process.env.GDRIVE_FILE_ID;

// Configurar MarkdownIt con KaTeX
const md = new MarkdownIt({ html: true, breaks: true }).use(markdownItKatex);

async function exportToPdf() {
  console.log('Leyendo documento Markdown local...');
  
  const markdownPath = path.join(process.cwd(), 'docs', 'arquitectura.md');
  const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
  
  // Renderizar Markdown a HTML
  const contentHtml = md.render(markdownContent);
  const documentTitle = 'Arquitectura de Computadoras';

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
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          line-height: 1.6;
          color: #2f3437;
          font-size: 10.5pt;
        }
        .doc-title {
          font-size: 24pt;
          font-weight: 700;
          color: #111;
          border-bottom: 2px solid #2eaadc;
          padding-bottom: 8px;
          margin-bottom: 24px;
        }
        h1, h2, h3 { page-break-after: avoid; color: #111; }
        h1 { font-size: 18pt; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
        h2 { font-size: 14pt; }
        .katex-display {
          margin: 1em 0 !important;
          padding: 10px;
          background: #fdfdfd;
          border: 1px solid #eaeaea;
          border-radius: 4px;
        }
        table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 9.5pt; }
        th, td { border: 1px solid #e1e1e1; padding: 6px 10px; text-align: left; }
        th { background-color: #f7f6f3; }
        img { max-width: 90%; height: auto; display: block; margin: 10px auto; border-radius: 4px; }
        pre { background: #f7f6f3; padding: 12px; border-radius: 5px; font-size: 9pt; }
        code { font-family: monospace; background: #f4f4f4; padding: 2px 4px; }
        pre code { background: transparent; }
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

  // setContent con baseUrl para que Puppeteer resuelva las imágenes locales en docs/
  const baseUrl = `file://${path.join(process.cwd(), 'docs')}/`;
  await page.setContent(fullHtml, { waitUntil: 'networkidle0', baseUrl });

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

  console.log('¡Sincronización completada con éxito!');
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
