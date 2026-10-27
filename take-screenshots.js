import puppeteer from 'puppeteer-core';
import path from 'path';

const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\PMLS\\.gemini\\antigravity\\brain\\4f04f8de-f276-4c11-bad0-4c2176898705';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Resolutions List Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4321/transparency/resolutions/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, 'phase2-resolutions-desktop.png') });
  console.log('Saved phase2-resolutions-desktop.png');

  // 2. Resolution Detail Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4321/transparency/resolutions/res-05-2026/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, 'phase2-resolution-detail-desktop.png') });
  console.log('Saved phase2-resolution-detail-desktop.png');

  // 3. Projects Tracker Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4321/transparency/projects/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, 'phase2-projects-desktop.png') });
  console.log('Saved phase2-projects-desktop.png');

  // 4. Financial Reports Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4321/transparency/finances/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, 'phase2-finances-desktop.png') });
  console.log('Saved phase2-finances-desktop.png');

  // 5. Statements Archive Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4321/transparency/statements/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, 'phase2-statements-desktop.png') });
  console.log('Saved phase2-statements-desktop.png');

  // 6. Resolutions Mobile (360x800)
  await page.setViewport({ width: 360, height: 800, isMobile: true });
  await page.goto('http://localhost:4321/transparency/resolutions/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, 'phase2-resolutions-mobile.png') });
  console.log('Saved phase2-resolutions-mobile.png');

  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
