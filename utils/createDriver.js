const chrome = require('selenium-webdriver/chrome');
const {webdriver, Builder, By, until } = require('selenium-webdriver');

const screen = {
    width: 1024,
    height: 768
};

// const chromeOptions = new chrome.Options()
//     .addArguments("--disable-gpu", "--no-sandbox")
//     .windowSize(screen)

// console.log("Chrome Path:", process.env.CHROME_PATH);
// if (process.env.CHROME_PATH !== '') {
//     chromeOptions.setChromeBinaryPath(process.env.CHROME_PATH);
// }

// const driver = new Builder()
//     .forBrowser("chrome")
//     .setChromeOptions(chromeOptions)
//     .build();

// module.exports = () => {
//     return driver;
// }

const chromeOptions = new chrome.Options()
    .addArguments("--disable-gpu", "--no-sandbox",'start-maximized')
    .windowSize(screen)

const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

// const createDriver = async() =>
// {
//     var driver = new Builder()
//         .usingServer('http://localhost:4444/wd/hub')
//         .withCapabilities(webdriver.Capabilities.chrome())
//         .build();
//     driver.manage().timeouts().setScriptTimeout(10000);
//     return driver;
// }
 
module.exports = () => {
    return driver;
}

// driver.get("http://www.google.com");
 
// driver.getTitle().then(function (title) {
//     console.log(title);
// });
 
// driver.quit();
// module.exports = () => {
//     return createDriver;
// }
