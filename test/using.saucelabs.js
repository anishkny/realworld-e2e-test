const sauceConnectLauncher = require('sauce-connect-launcher');
const webdriverIO = require('webdriverio');

let client = null;
let sauceConnectProcess = null;
const browserNames = ['chrome', 'firefox', 'internet explorer', 'MicrosoftEdge'];

describe('Sauce Labs', async () => {

  before(async () => {
    console.log('Sauce Connect Server: Starting...');
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
        console.log('Sauce Connect Server: Ready');
        resolve(aSauceConnectProcess);
      });
    });
  });

  after(async () => {
    if (sauceConnectProcess) {
      console.log('Sauce Connect Server: Closing...');
      await new Promise((resolve) => {
        sauceConnectProcess.close(function() {
          console.log('Sauce Connect Server: Closed');
          resolve();
        })
      });
    }
  });

  for (let iBrowserName = 0; iBrowserName < browserNames.length; ++iBrowserName) {
    const browserName = browserNames[iBrowserName];

    describe(browserName, async () => {

      before(async () => {

        client = webdriverIO.remote({
          user: process.env.SAUCE_USERNAME,
          key: process.env.SAUCE_ACCESS_KEY,
          host: 'ondemand.saucelabs.com',
          desiredCapabilities: {
            browserName: browserName,
          },
        });
      });

      it('Should load UI', async () => {
        await client
          .init()
          .url(`http://localhost:4100`)
          .getTitle().then(console.log)
          .end();
      });

    });
  }

});
