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
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ]
  });
  
  const page = await browser.newPage();

  // 1. Emular un navegador moderno (Chrome de escritorio)
  await page.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  );

  // 2. Establecer un tamaño de viewport de escritorio
  await page.setViewport({ width: 1280, height: 800 });

  // 3. Formatear la URL de la página pública de Notion
  const cleanId = NOTION_PAGE_ID.replace(/-/g, '');
  const pageUrl = `https://www.notion.so/${cleanId}`;

  // 4. Navegar a la página esperando a que cargue todo el contenido dinámico
  await page.goto(pageUrl, { waitUntil: 'networkidle0', timeout: 60000 });

  // 5. Esperar un par de segundos extra para asegurar que React termine de renderizar el DOM
  await new Promise((r) => setTimeout(r, 4000));

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
