import { Client } from '@notionhq/client';
import puppeteer from 'puppeteer';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;
const GDRIVE_CREDENTIALS = process.env.GDRIVE_CREDENTIALS;
const GDRIVE_FOLDER_ID = process.env.GDRIVE_FILE_ID; // Usamos la variable con el ID de la carpeta

const notion = new Client({ auth: NOTION_TOKEN });

async function getNotionPageTitle(pageId) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    if (page.properties && page.properties.title) {
      return page.properties.title.title[0]?.plain_text || 'Notion Export';
    }
    if (page.properties && page.properties.Name) {
      return page.properties.Name.title[0]?.plain_text || 'Notion Export';
    }
  } catch (e) {
    console.log('No se pudo obtener el título exacto, usando título por defecto.');
  }
  return 'Notion Export';
}

async function exportToPdf() {
  console.log('Obteniendo datos de Notion y generando PDF con Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Formatear la URL de la página de Notion
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

async function uploadOrUpdateInFolder(pdfPath) {
  console.log('Subiendo a Google Drive...');
  
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(GDRIVE_CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/drive']
  });

  const drive = google.drive({ version: 'v3', auth });
  const fileName = 'Notion_Export.pdf';

  // Buscar si el archivo ya existe en la carpeta
  const res = await drive.files.list({
    q: `'${GDRIVE_FOLDER_ID}' in parents and name = '${fileName}' and trashed = false`,
    fields: 'files(id, name)',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true
  });

  const media = {
    mimeType: 'application/pdf',
    body: fs.createReadStream(pdfPath)
  };

  if (res.data.files && res.data.files.length > 0) {
    // Si existe, lo actualiza
    const existingFileId = res.data.files[0].id;
    console.log(`Actualizando archivo existente en Drive (ID: ${existingFileId})...`);
    await drive.files.update({
      fileId: existingFileId,
      media: media,
      supportsAllDrives: true
    });
    console.log('¡PDF actualizado con éxito en Google Drive!');
  } else {
    // Si no existe, lo crea dentro de la carpeta asignando la ubicación
    console.log('Creando nuevo archivo PDF en la carpeta de Google Drive...');
    await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [GDRIVE_FOLDER_ID]
      },
      media: media,
      supportsAllDrives: true
    });
    console.log('¡PDF creado y subido con éxito en Google Drive!');
  }
}

async function main() {
  try {
    const pdfPath = await exportToPdf();
    await uploadOrUpdateInFolder(pdfPath);
  } catch (error) {
    console.error('Error durante la sincronización:', error);
    process.exit(1);
  }
}

main();
