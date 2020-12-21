const initializeDriver = require("../utils/createDriver");
const assert = require("assert")
const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber")
const pageObject = require("../page-objects/pageObjectList");
const commonFunctions = require("../utils/commonFunctions");
const { By, until } = require("selenium-webdriver");
setDefaultTimeout(30 * 1000);

const driver = initializeDriver();

Given('I can open {string}', async function (string) {
    console.log("Launch page link: " + string);
    await driver.get(string);

    console.log("Validate that popup window is opened and close if it is opened by accepting.");
    await driver.wait(until.elementLocated(By.xpath(pageObject.PopupWindowCookie)));
    const popupWindowPath  = await driver.findElement(By.xpath(pageObject.PopupWindowCookie));
    if (popupWindowPath.isDisplayed())
    {
        console.log("Popup window is opened.");
        console.log("Closing popup window.");
        const buttonAcceptPath = await driver.findElement(By.xpath(pageObject.ButtonAccept));
        await buttonAcceptPath.click();
        console.log("Validate pop up window is closed.");
        commonFunctions.validatePopUpStatus(driver,expectedStatus=false);

    }
    else
        console.log("No popup window is opened.");     
});

When('I navigate to the DSL calculator page', async function () {
    console.log("Click on DSL calculator page.");
    await driver.wait(until.elementLocated(By.xpath(pageObject.LinkDSLTab)));
    const dslButtonPath = await driver.findElement(By.xpath(pageObject.LinkDSLTab));
    await dslButtonPath.click();
});

When('I select {string} and enter {string} for my area code', async function (string, string2) {
    console.log("Selecting " + string + " sub tab from DSL tab.");
    // await driver.wait(until.elementLocated(By.xpath(pageObject.LinkSubTabsDSL)));
    var subTabPath;
    switch (string) {
        case "Internet+Telefon":
            await driver.wait(until.elementLocated(By.id(pageObject.LinkSubTabInternetTelefon)));
            subTabPath = await driver.findElement(By.id(pageObject.LinkSubTabInternetTelefon));
            break;
        default:
            break;
    }
    console.log("here");
    await subTabPath.click();

    console.log("Submitting " + string2 + " to area code.");
    const postCodePath = await driver.findElement(By.xpath(pageObject.FieldAreaCode));
    await postCodePath.click();
    await postCodePath.sendKeys(string2);
});

When('I select the {string} bandwidth option', async function (string) {
    console.log("Selecting " + string + " bandwidth option.");
    await driver.wait(until.elementLocated(By.xpath(pageObject.Link100Mbit)));
    const bwToSelect = await driver.findElement(By.xpath(pageObject.Link100Mbit));
    await bwToSelect.click();
});

When('I click the `Jetzt vergleichen` button', async function () {
    console.log("Click on `Jetzt vergleichen` button.");
    await driver.wait(until.elementLocated(By.xpath(pageObject.ButtonJetztVergleichen)));
    const bttnPath = await driver.findElement(By.xpath(pageObject.ButtonJetztVergleichen));
    await bttnPath.click();
});

Then('I should see a page that lists the available tariffs for my selection', async function () {
    console.log("Validate that suggested tariff page is opened.");
    await driver.wait(until.elementLocated(By.xpath(pageObject.TextTitleErmittelteTarife)));
    await driver.wait(until.elementLocated(By.xpath(pageObject.TextTitleTarifempfehlung)));
    const textUp = await driver.findElement(By.xpath(pageObject.TextTitleTarifempfehlung));
    const textDown =  await driver.findElement(By.xpath(pageObject.TextTitleErmittelteTarife));
    console.log("Title up status: " + await textUp.isDisplayed());
    console.log("Title down status: " + await textDown.isDisplayed());

});
