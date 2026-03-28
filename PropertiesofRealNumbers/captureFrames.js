const puppeteer = require('puppeteer');
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const HTML_FILE = path.resolve('properties-of-real-numbers.html');
const FRAMES_DIR = './frames';
const FPS = 30;
const DURATION_SECONDS = 125;

fs.mkdirSync(FRAMES_DIR, { recursive: true });

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(`file://${HTML_FILE}`);

  const totalFrames = DURATION_SECONDS * FPS;
  for (let i = 0; i < totalFrames; i++) {
    await page.screenshot({ path: `${FRAMES_DIR}/frame_${String(i).padStart(4,'0')}.png` });
    await new Promise(r => setTimeout(r, 1000 / FPS));
  }

  await browser.close();
})();
