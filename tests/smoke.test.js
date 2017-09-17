const casual = require('casual');
const puppeteer = require('puppeteer');

var browser = null;
var page = null;
var newUser = {
  username: casual.first_name,
  email: casual.email,
  password: casual.password
};

beforeAll(async() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  browser = await puppeteer.launch(
    /* {
        headless: false,
        slowMo: 250,
      } */
  );
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
  await page.goto('http://localhost:4100');
  await page.waitForSelector('nav.navbar');
  await page.waitForSelector('div.home-page');
  await page.waitForSelector('div.home-page');
  await page.screenshot({ path: '.screenshots/landing_page.png' });
});

test('Signup', async() => {

  // Register new user
  await page.goto('http://localhost:4100');
  await page.click('a[href*="register"]');
  await page.screenshot({ path: '.screenshots/signup_01_start.png' });
  await page.focus('input[placeholder="Username"]');
  await page.type(newUser.username);
  await page.focus('input[placeholder="Email"]');
  await page.type(newUser.email);
  await page.focus('input[placeholder="Password"]');
  await page.type(newUser.password);
  await page.screenshot({ path: '.screenshots/signup_02_filled.png' });
  await page.click('button');

  // Verify username is displayed in navbar right side
  var expectedUsername = newUser.username.toLowerCase();
  var profileLinkSelector = `a[href*="${expectedUsername}"]`;
  await page.waitForSelector(profileLinkSelector);
  await page.screenshot({ path: '.screenshots/signup_03_done.png' });
  var profileLinkInnerText = await page.$eval(profileLinkSelector, el => el.innerText);
  console.log(`profileLinkInnerText = [${profileLinkInnerText}]`);
  expect(profileLinkInnerText).toBe(expectedUsername);

});
