const sauceConnectLauncher = require('sauce-connect-launcher');

let client = null;
let sauceConnectProcess = null;

describe('Sauce Labs', async () => {

  before(async () => {

    console.log('Starting Sauce Connect Server...');

    sauceConnectProcess = await new Promise((resolve, reject) => {
      sauceConnectLauncher({
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        verbose: true,
      }, function(err, aSauceConnectProcess) {
        if (err) {
          console.error(err.message);
          reject(err);
          return;
        }
        console.log("Sauce Connect ready");
        resolve(aSauceConnectProcess);
      });
    });

    client = require('webdriverio').remote({
      user: process.env.SAUCE_USERNAME,
      key: process.env.SAUCE_ACCESS_KEY,
      host: 'ondemand.saucelabs.com',
      desiredCapabilities: {
        browserName: 'chrome'
      },
    });
    console.log(client);
  });

  after(async () => {
    if (sauceConnectProcess) {
      console.log('Shutting down Sauce Connect Server...');
      await new Promise((resolve) => {
        sauceConnectProcess.close(function() {
          console.log("Closed Sauce Connect process");
          resolve();
        })
      });
    }
  });

  it('should load UI', async () => {
    await client
      .init()
      .url(`http://localhost:4100`)
      .getTitle().then(console.log)
      .end();
  });

});
