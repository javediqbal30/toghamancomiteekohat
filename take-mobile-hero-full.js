import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\PMLS\\.gemini\\antigravity\\brain\\4f04f8de-f276-4c11-bad0-4c2176898705';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 1200 });

  try {
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0', timeout: 15000 });
    const heroEl = await page.$('.hero-section');
    if (heroEl) {
      const outputPath = path.join(ARTIFACT_DIR, 'redesigned-hero-mobile-full.png');
      await heroEl.screenshot({ path: outputPath });
      console.log('Saved redesigned-hero-mobile-full.png');
    }
  } catch (err) {
    console.error('Failed:', err.message);
  }

  await browser.close();
}

run();
