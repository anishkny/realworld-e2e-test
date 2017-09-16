const puppeteer = require('puppeteer');
var browser = null;
var page = null;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

test('Landing page loads', async() => {
  await page.goto('http://localhost:4000');
  await page.screenshot({ path: '.screenshots/landing_page.png' });
  await browser.close();
});
