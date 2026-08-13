import { Client } from '@notionhq/client';
import puppeteer from 'puppeteer';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;
const GDRIVE_CREDENTIALS = process.env.GDRIVE_CREDENTIALS;
const GDRIVE_FILE_ID = process.env.GDRIVE_FILE_ID;

const notion = new Client({ auth: NOTION_TOKEN });

async function exportToPdf() {
  console.log('Obteniendo datos de Notion y generando PDF con Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const cleanId = NOTION_PAGE_ID.replace(/-/g, '');
  const pageUrl = `https://www.notion.so/${cleanId}`;
  
  await page.goto(pageUrl, { waitUntil: 'networkidle2' });
  
  const pdfPath = path.join('/tmp', 'output.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
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
