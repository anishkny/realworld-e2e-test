const casual = require('casual');
const puppeteer = require('puppeteer');
const expect = require('chai').expect;

var browser = null;
var page = null;
var newUser = {
  username: casual.first_name,
  email: casual.email,
  password: casual.password
};

describe('Chrome Puppeteer', async () => {

  before(async () => {
    const launchOptions = process.env.CI ? {} : { headless: false, slowMo: 5, };

    // Workaround till https://github.com/GoogleChrome/puppeteer/issues/290 is fixed
    if (process.env.LAUNCH_CHROME_NO_SANDBOX) {
      console.warn('Launching Chrome with "--no-sandbox" option. ' +
        'This is not recommended due to security reasons!');
      Object.assign(launchOptions, { args: ['--no-sandbox'] });
    }

    browser = await puppeteer.launch(launchOptions);
    page = await browser.newPage();
    await page.setViewport({
      width: 1024,
      height: 768,
    });
  });

  after(async () => {
    await browser.close();
  });

  it('Landing page loads', async () => {
    await page.goto('http://localhost:4100');
    expect(await page.$('nav.navbar')).to.be.ok;
    expect(await page.$('div.home-page')).to.be.ok;
    await page.screenshot({ path: '.screenshots/landing_page.png' });
  });

  it('Sign in with invalid credentials', async () => {

    // Sign in with invalid user
    await page.goto('http://localhost:4100');
    await page.click('a[href*="login"]');
    await page.screenshot({ path: '.screenshots/signin_01_start.png' });
    await page.type('input[placeholder="Email"]', newUser.email);
    await page.type('input[placeholder="Password"]', newUser.password);
    await page.screenshot({ path: '.screenshots/signin_02_filled.png' });
    await page.click('button');
    await page.waitForSelector('ul.error-messages > li');
    await page.screenshot({ path: '.screenshots/signin_03_error.png' });
    expect(await page.$('ul.error-messages > li')).to.be.ok;

  });

  it('Signup', async () => {

    // Register new user
    await page.goto('http://localhost:4100');
    await page.click('a[href*="register"]');
    await page.screenshot({ path: '.screenshots/signup_01_start.png' });
    await page.type('input[placeholder="Username"]', newUser.username);
    await page.type('input[placeholder="Email"]', newUser.email);
    await page.type('input[placeholder="Password"]', newUser.password);
    await page.screenshot({ path: '.screenshots/signup_02_filled.png' });
    await page.click('button');

    // Verify username is displayed in navbar right side
    var expectedUsername = newUser.username.toLowerCase();
    var profileLinkSelector = `a[href*="${expectedUsername}"]`;
    await page.waitForSelector(profileLinkSelector);
    await page.screenshot({ path: '.screenshots/signup_03_done.png' });
    var profileLinkInnerText = await page.$eval(profileLinkSelector, el => el.innerText);
    console.log(`profileLinkInnerText = [${profileLinkInnerText}]`);
    expect(profileLinkInnerText).to.equal(expectedUsername);

  });

  it('New Post', async () => {

    var newArticle = {
      title: casual.title,
      description: casual.description,
      body: casual.text,
    };
    await page.click('a[href*="editor"]');
    await page.waitForSelector('div.editor-page');
    await page.type('input[placeholder="Article Title"]', newArticle.title);
    await page.type('input[placeholder="What\'s this article about?"]', newArticle.description);
    await page.type('textarea[placeholder="Write your article (in markdown)"]', newArticle.body);
    await page.screenshot({ path: '.screenshots/new_post_01_filled.png' });
    await page.click('button');
    await page.waitForSelector('div.article-page');
    await page.screenshot({ path: '.screenshots/new_post_02_submitted.png' });

    // Assert on created article
    var titleSelector = 'h1';
    await page.waitForSelector(titleSelector);
    var titleInnerText = await page.$eval(titleSelector, el => el.innerText);
    expect(titleInnerText).to.equal(newArticle.title);

    var bodySelector = 'p';
    await page.waitForSelector(bodySelector);
    var bodyInnerText = await page.$eval(bodySelector, el => el.innerText);
    expect(bodyInnerText).to.equal(newArticle.body);

  });

  it('Add Comment', async () => {
    var newComment = casual.sentence;

    await page.type('textarea[placeholder="Write a comment..."]', newComment);
    await page.screenshot({ path: '.screenshots/new_post_03_comment_filled.png' });
    await page.click('button[type="submit"]');
    await page.waitForSelector('p.card-text');
    await page.screenshot({ path: '.screenshots/new_post_02_comment_submitted.png' });

    // Assert on created comment
    var commentSelector = 'p.card-text';
    await page.waitForSelector(commentSelector);
    var commentInnerText = await page.$eval(commentSelector, el => el.innerText);
    expect(commentInnerText).to.equal(newComment);

  });

});
