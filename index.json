import { Client } from '@notionhq/client';
import { google } from 'googleapis';
import puppeteer from 'puppeteer';
import Readable from 'stream';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function getNotionPageAsHtml(pageId) {
  // Consulta la página de Notion y sus bloques
  const page = await notion.pages.retrieve({ page_id: pageId });
  const blocks = await notion.blocks.children.list({ block_id: pageId });

  // Genera un HTML estructurado simple a partir de los bloques
  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #37352f; line-height: 1.5; }
        h1 { border-bottom: 1px solid #e1e1e1; padding-bottom: 8px; }
        p { margin-bottom: 12px; }
        ul { padding-left: 20px; }
      </style>
    </head>
    <body>
  `;

  for (const block of blocks.results) {
    if (block.type === 'paragraph' && block.paragraph.rich_text.length > 0) {
      const text = block.paragraph.rich_text.map(t => t.plain_text).join('');
      htmlContent += `<p>${text}</p>`;
    } else if (block.type === 'heading_1' && block.heading_1.rich_text.length > 0) {
      const text = block.heading_1.rich_text.map(t => t.plain_text).join('');
      htmlContent += `<h1>${text}</h1>`;
    } else if (block.type === 'heading_2' && block.heading_2.rich_text.length > 0) {
      const text = block.heading_2.rich_text.map(t => t.plain_text).join('');
      htmlContent += `<h2>${text}</h2>`;
    } else if (block.type === 'bulleted_list_item' && block.bulleted_list_item.rich_text.length > 0) {
      const text = block.bulleted_list_item.rich_text.map(t => t.plain_text).join('');
      htmlContent += `<ul><li>${text}</li></ul>`;
    }
  }

  htmlContent += `</body></html>`;
  return htmlContent;
}

async function convertHtmlToPdf(html) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();
  return pdfBuffer;
}

async function updateDriveFile(pdfBuffer) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GDRIVE_CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/drive.file']
  });

  const drive = google.drive({ version: 'v3', auth });
  const fileId = process.env.GDRIVE_FILE_ID;

  const stream = new Readable.Readable();
  stream.push(pdfBuffer);
  stream.push(null);

  await drive.files.update({
    fileId: fileId,
    media: {
      mimeType: 'application/pdf',
      body: stream
    }
  });

  console.log('PDF actualizado exitosamente en Google Drive.');
}

async function main() {
  try {
    console.log('Obteniendo datos de Notion...');
    const html = await getNotionPageAsHtml(process.env.NOTION_PAGE_ID);

    console.log('Generando PDF con Puppeteer...');
    const pdfBuffer = await convertHtmlToPdf(html);

    console.log('Subiendo a Google Drive...');
    await updateDriveFile(pdfBuffer);
  } catch (error) {
    console.error('Error durante la sincronización:', error);
    process.exit(1);
  }
}

main();
