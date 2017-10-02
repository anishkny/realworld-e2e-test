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
  const launchOptions = process.env.CI ? {} : { headless: false, slowMo: 250, };
  browser = await puppeteer.launch(launchOptions);
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
  expect(await page.$('nav.navbar')).toBeTruthy();
  expect(await page.$('div.home-page')).toBeTruthy();
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

test('New Post', async() => {

  var newArticle = {
    title: casual.title,
    description: casual.description,
    body: casual.text,
  };
  await page.click('a[href*="editor"]');
  await page.waitForSelector('div.editor-page');
  await page.focus('input[placeholder="Article Title"]');
  await page.type(newArticle.title);
  await page.focus('input[placeholder="What\'s this article about?"]');
  await page.type(newArticle.description);
  await page.focus('textarea[placeholder="Write your article (in markdown)"]');
  await page.type(newArticle.body);
  await page.screenshot({ path: '.screenshots/new_post_01_filled.png' });
  await page.click('button');
  await page.waitForSelector('div.article-page');
  await page.screenshot({ path: '.screenshots/new_post_02_submitted.png' });
  //TODO: Assert on created article

});

test('Add Comment', async() => {
  var newComment = casual.sentence;

  await page.focus('textarea[placeholder="Write a comment..."]');
  await page.type(newComment);
  await page.screenshot({ path: '.screenshots/new_post_03_comment_filled.png' });
  await page.click('button[type="submit"]');
  await page.waitForSelector('p.card-text');
  await page.screenshot({ path: '.screenshots/new_post_02_comment_submitted.png' });
  //TODO: Assert on created comment

});
