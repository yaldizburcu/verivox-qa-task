const { By, until } = require("selenium-webdriver");
const pageObject = require("../page-objects/pageObjectList");
const { Key } = require("selenium-webdriver/lib/input");

const validatePopUpStatus = async(driver, expectedStatus = true) =>
{
    await driver.sleep(2000);
    let elements = await driver.findElements(By.xpath(pageObject.PopupWindowCookie));
    if (expectedStatus)
    {
        console.log("Validate Cookie accept popup window is open");
        if(elements.length > 0){
            console.log('Pop up window is open as expected.');
        } else {
            throw new Error("Popup window is not open!");
        }
    }
    else
    {   
        console.log("Validate Cookie accept popup window is closed");
        elements = await driver.findElements(By.xpath(pageObject.PopupWindowCookie));
        if(elements.length > 0){
            throw new Error('Pop up window is still open!');
        } else {
            console.log("Popup window is closed.");
        }
    }

}
//click on weitere laden button
const clickWeitereLadenButton = async(driver) =>
{
    console.log("Click on `weitere Tarife laden` button");
    await driver.wait(until.elementLocated(By.xpath(pageObject.ButtonWeitereLaden)));
    let buttonWeitereLadenPath = await driver.findElement(By.xpath(pageObject.ButtonWeitereLaden));
    await driver.executeScript("arguments[0].scrollIntoView();", buttonWeitereLadenPath);
    await driver.sleep(3000);
    await buttonWeitereLadenPath.click();
    // scrollToBottomOfPage(driver);
}

// scroll down to the page of tariffs until getting weitere laden button
const scrollDownWeitereLadenButton = async(driver) =>
{
    console.log("Scroll down to weitere laden button");
    await driver.wait(until.elementLocated(By.xpath(pageObject.ButtonWeitereLaden)));
    let buttonPath = await driver.findElement(By.xpath(pageObject.ButtonWeitereLaden));
    await driver.executeScript("arguments[0].scrollIntoView();", buttonPath);
    await driver.sleep(3000); 
    await buttonPath.sendKeys(Key.TAB);
    await driver.sleep(3000);
}

//scroll down to the page where footer is
const scrollToBottomOfPage = async (driver) =>
{
    console.log("Scrolling to the bottom of the page.");
    await driver.wait(until.elementLocated(By.xpath(pageObject.FieldFooter)));
    const footerPath = await driver.findElement(By.xpath(pageObject.FieldFooter));
    await footerPath.click();
}
module.exports = 
{
    validatePopUpStatus,
    clickWeitereLadenButton,
    scrollDownWeitereLadenButton,
    scrollToBottomOfPage
}