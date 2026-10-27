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
  await page.setViewport({ width: 1200, height: 900 });

  try {
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0', timeout: 15000 });
    
    const section = await page.$('.leadership-section');
    if (section) {
      await section.scrollIntoView();
      await new Promise(r => setTimeout(r, 600));
      const outputPath = path.join(ARTIFACT_DIR, 'updated-custodian-leadership.png');
      await section.screenshot({ path: outputPath });
      console.log('Saved element screenshot of .leadership-section');
    }
  } catch (err) {
    console.error(`Failed: ${err.message}`);
  }

  await browser.close();
}

run();
