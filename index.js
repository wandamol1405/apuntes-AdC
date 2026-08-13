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

// Configurar MarkdownIt con soporte para KaTeX / Math
const md = new MarkdownIt({ html: true }).use(markdownItKatex);

async function getNotionPageTitle(pageId) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    if (page.properties && page.properties.title) {
      return page.properties.title.title[0]?.plain_text || 'Arquitectura de Computadoras';
    }
    if (page.properties && page.properties.Name) {
      return page.properties.Name.title[0]?.plain_text || 'Arquitectura de Computadoras';
    }
  } catch (e) {
    console.log('Usando título genérico para el PDF...');
  }
  return 'Arquitectura de Computadoras';
}

async function exportToPdf() {
  console.log('Obteniendo bloques de Notion vía API...');
  
  const title = await getNotionPageTitle(NOTION_PAGE_ID);
  const mdblocks = await n2m.pageToMarkdown(NOTION_PAGE_ID);
  const mdString = n2m.toMarkdownString(mdblocks);
  const contentHtml = md.render(mdString.parent);

  // Incluir CSS de KaTeX para que las fórmulas se rendericen de forma estética
  const fullHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <!-- Hoja de estilos KaTeX para fórmulas matemáticas -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #37352f;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        h1 { border-bottom: 1px solid #e1e1e1; padding-bottom: 8px; margin-top: 0; }
        h2 { margin-top: 24px; border-bottom: 1px solid #f0f0f0; padding-bottom: 4px; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
        pre { background: #f7f7f7; padding: 12px; border-radius: 6px; overflow-x: auto; }
        blockquote { border-left: 3px solid #37352f; margin: 0; padding-left: 14px; color: #6a6a6a; }
        ul, ol { padding-left: 20px; }
        table { border-collapse: collapse; width: 100%; margin: 16px 0; }
        th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
        th { background-color: #f8f9fa; }
        .katex-display { margin: 1em 0; overflow-x: auto; overflow-y: hidden; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      ${contentHtml}
    </body>
    </html>
  `;

  console.log('Generando PDF con ecuaciones matemáticas...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Esperar a que se descarguen las fuentes/CSS de KaTeX desde la CDN
  await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

  const pdfPath = path.join('/tmp', 'output.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
  });

  await browser.close();
  return pdfPath;
}

async function updateDriveFile(pdfPath) {
  console.log('Subiendo a Google Drive...');
  
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
    console.error('Error durante la sincronización:', error);
    process.exit(1);
  }
}

main();