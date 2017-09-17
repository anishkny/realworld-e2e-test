const casual = require('casual');
const puppeteer = require('puppeteer');

var browser = null;
var page = null;
var newUser = {
  username: casual.username,
  email: casual.email,
  password: casual.password
};

beforeAll(async() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
  });
  page = await browser.newPage();
  await page.setViewport({
    width: 1024,
    height: 768,
  });
});

afterAll(async() => {
  await browser.close();
});

test('Landing page loads', async() => {
  await page.goto('http://localhost:4000');
  await page.screenshot({ path: '.screenshots/landing_page.png' });
});

test('Signup', async() => {
  await page.goto('http://localhost:4000',  {waitUntil: 'networkidle'});
  await page.click('a[ui-sref="app.register"]');
  await page.screenshot({ path: '.screenshots/signup_01_start.png' });
  await page.focus('input[placeholder="Username"]');
  await page.type(newUser.username);
  await page.focus('input[placeholder="Email"]');
  await page.type(newUser.email);
  await page.focus('input[placeholder="Password"]');
  await page.type(newUser.password);
  await page.screenshot({ path: '.screenshots/signup_02_filled.png' });
  await page.focus('input[placeholder="Password"]');
  await page.press('Enter');
  // const signupButton = await page.$('button');
  // console.log(`signupButton.innerText = [${signupButton.innerText}]`)
  // await signupButton.click();
  // await page.click('button[type="submit"]');
  // var functionToWait = `document.querySelector('a[ui-sref^="app.profile.main"]').innerText == '${newUser.username}'`;
  // console.log(`functionToWait = [${functionToWait}]`);
  // await page.waitForFunction(functionToWait);
  await page.waitFor(5000);
  await page.screenshot({ path: '.screenshots/signup_03_done.png' });
  await page.goto('http://localhost:4000');
  await page.screenshot({ path: '.screenshots/signup_04_homepage.png' });
});
