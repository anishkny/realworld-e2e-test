const puppeteer = require('puppeteer');

test('adds 1 + 2 to equal 3', async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4000');
  await page.screenshot({ path: '.screenshots/landing_page.png' });
  await browser.close();
  expect(1 + 2).toBe(3);
});
