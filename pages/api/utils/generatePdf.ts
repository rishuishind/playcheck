import { db } from "@/lib/firebase";
import { parse } from "cookie";
import {USER_ACCESS_TOKEN} from "@/lib/helper";
import puppeteer from 'puppeteer';

async function handler(req: any, res: any) {

    const { html } = req.body;

  if (!html) {
    return res.status(400).json({ error: 'Missing HTML content' });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setContent(html);

    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=generated-pdf.pdf');
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
}

export default handler;
