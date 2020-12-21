const { By, until } = require("selenium-webdriver");
const pageObject = require("../page-objects/pageObjectList");

const validatePopUpStatus = async(driver, expectedStatus = true) =>
{
    const elements = await driver.findElements(By.xpath(pageObject.PopupWindowCookie));
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
        if(elements.length > 0){
            throw new Error('Pop up window is still open!');
        } else {
            console.log("Popup window is closed.");
        }
    }

}

module.exports = 
{
    validatePopUpStatus
}