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

  // Desktop capture
  await page.setViewport({ width: 1440, height: 950 });
  try {
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0', timeout: 15000 });
    // Move mouse over hero section to trigger ambient spotlight
    await page.mouse.move(700, 350);
    await new Promise(r => setTimeout(r, 600));

    const outputPathDesktop = path.join(ARTIFACT_DIR, 'redesigned-hero-desktop.png');
    await page.screenshot({ path: outputPathDesktop, fullPage: false });
    console.log('Saved redesigned-hero-desktop.png');
  } catch (err) {
    console.error('Desktop capture failed:', err.message);
  }

  // Mobile capture
  await page.setViewport({ width: 390, height: 844 });
  try {
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise(r => setTimeout(r, 600));

    const outputPathMobile = path.join(ARTIFACT_DIR, 'redesigned-hero-mobile.png');
    await page.screenshot({ path: outputPathMobile, fullPage: false });
    console.log('Saved redesigned-hero-mobile.png');
  } catch (err) {
    console.error('Mobile capture failed:', err.message);
  }

  await browser.close();
}

run();
