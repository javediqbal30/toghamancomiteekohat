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

  const captures = [
    { name: 'phase3-portal-login-desktop.png', url: 'http://localhost:4321/portal/login', width: 1440, height: 900 },
    { name: 'phase3-portal-login-mobile.png', url: 'http://localhost:4321/portal/login', width: 390, height: 844 },
    { name: 'phase3-portal-dashboard-desktop.png', url: 'http://localhost:4321/portal/dashboard', width: 1440, height: 1100 },
    { name: 'phase3-portal-dashboard-mobile.png', url: 'http://localhost:4321/portal/dashboard', width: 390, height: 844 },
    { name: 'phase3-portal-meetings-desktop.png', url: 'http://localhost:4321/portal/meetings', width: 1440, height: 1200 },
    { name: 'phase3-portal-complaints-desktop.png', url: 'http://localhost:4321/portal/complaints', width: 1440, height: 1000 },
    { name: 'phase3-portal-finance-desktop.png', url: 'http://localhost:4321/portal/finance', width: 1440, height: 1100 },
    { name: 'phase3-portal-audit-desktop.png', url: 'http://localhost:4321/portal/audit', width: 1440, height: 1100 }
  ];

  for (const item of captures) {
    await page.setViewport({ width: item.width, height: item.height });
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
