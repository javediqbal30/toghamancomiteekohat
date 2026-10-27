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
  await page.setViewport({ width: 1440, height: 1000 });

  const captures = [
    { name: 'phase4-overseas-desktop.png', url: 'http://localhost:4321/overseas' },
    { name: 'phase4-youth-desktop.png', url: 'http://localhost:4321/youth' },
    { name: 'phase4-womens-wing-desktop.png', url: 'http://localhost:4321/womens-wing' }
  ];

  for (const item of captures) {
    try {
      await page.goto(item.url, { waitUntil: 'networkidle0', timeout: 15000 });
      const outputPath = path.join(ARTIFACT_DIR, item.name);
      await page.screenshot({ path: outputPath, fullPage: false });
      console.log(`Saved ${item.name}`);
    } catch (err) {
      console.error(`Failed ${item.name}: ${err.message}`);
    }
  }

  await browser.close();
}

run();
