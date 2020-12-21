const initializeDriver = require("./../utils/createDriver");
const { Background, Before, BeforeAll, Given, When, Then, AfterAll, After, setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(10 * 1000);

Before(function () {
    var driver = initializeDriver();
    global.driver = driver;
});

// After(function () {
//     console.log("Deleting cookies");
//     driver.manage().deleteAllCookies();
//     driver.executeScript("window.sessionStorage.clear();window.localStorage.clear();")
// });

// AfterAll(function () {
//     console.log("Closing browser");
//     driver.quit();
// });

