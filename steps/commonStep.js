const initializeDriver = require("./../utils/createDriver");
const {Before, AfterAll, After} = require("@cucumber/cucumber");

Before(function () {
    var driver = initializeDriver();
    global.driver = driver;
});

After(function () {
    console.log("Deleting cookies");
    driver.manage().deleteAllCookies();
    driver.executeScript("window.sessionStorage.clear();window.localStorage.clear();")
});

AfterAll(function () {
    console.log("Killing browser");
    driver.quit();
});

