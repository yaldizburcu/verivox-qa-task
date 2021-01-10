const chrome = require('selenium-webdriver/chrome');
const {webdriver, Builder, By, until } = require('selenium-webdriver');

const screen = {
    width: 1278,
    height: 1024
};

const chromeOptions = new chrome.Options()
    // .addArguments("--disable-gpu", "--no-sandbox",'start-maximized')
    .addArguments("--disable-gpu", "--no-sandbox")
    .windowSize(screen)

const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
 
module.exports = () => {
    return driver;
}

