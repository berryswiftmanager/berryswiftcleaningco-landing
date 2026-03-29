import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');

// Ensure screenshot directory exists
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

// Determine next screenshot number (auto-increment, never overwrite)
const existing = fs.readdirSync(screenshotDir)
  .filter(f => f.startsWith('screenshot-') && f.endsWith('.png'))
  .map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0'))
  .filter(n => !isNaN(n));
const nextNum = existing.length > 0 ? Math.max(...existing) + 1 : 1;

// Args: URL (required), label (optional)
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
const filename = label
  ? `screenshot-${nextNum}-${label}.png`
  : `screenshot-${nextNum}.png`;
const outputPath = path.join(screenshotDir, filename);

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Scroll through the page to trigger IntersectionObserver-based animations
    await page.evaluate(async () => {
      await new Promise(resolve => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 100);
      });
    });

    // Wait for animations to complete and fonts to settle
    await new Promise(r => setTimeout(r, 2000));

    // Force all reveal elements visible (in case any were missed)
    await page.evaluate(() => {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    });
    await new Promise(r => setTimeout(r, 500));

    await page.screenshot({ path: outputPath, fullPage: true });
    console.log(`Screenshot saved: ${outputPath}`);
  } catch (err) {
    console.error('Screenshot failed:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
