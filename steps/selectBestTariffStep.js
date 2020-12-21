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
    await (await driver).sleep(2000);
});

Then('I should see a page that lists the available tariffs for my selection', async function () {
    console.log("Validate that suggested tariff page is opened.");
    await driver.wait(until.elementLocated(By.xpath(pageObject.TextTitleErmittelteTarife)),20000);
    await driver.wait(until.elementLocated(By.xpath(pageObject.TextTitleTarifempfehlung)));
    const textUp = await driver.findElement(By.xpath(pageObject.TextTitleTarifempfehlung));
    const textDown =  await driver.findElement(By.xpath(pageObject.TextTitleErmittelteTarife));
    const statusTextUp = await textUp.isDisplayed();
    const statusTextDown = await textDown.isDisplayed();
    // console.log("Title up status: " + statusTextUp);
    // console.log("Title down status: " +statusTextDown);
    assert.ok(statusTextUp, "Verivox-Tarifempfehlung is not displaying!");
    assert.ok(statusTextDown, "Ermittelte Tarife is not displaying!");
    console.log("Verivox-Tarifempfehlung is displaying.");
    console.log("Ermittelte Tarife is displaying!");

});

Then('at least {string} internet tariffs are displayed', async function (string) {
    console.log("Validate that at least five internet tariffs are displayed.");
    await driver.wait(until.elementLocated(By.xpath(pageObject.ListTariff)));
    const tariffListPath = await driver.findElements(By.xpath(pageObject.ListTariff));
    // const tariffList = await tariffListPath.findElements(By.className("row my-4"));
    const sizeTariffList = await tariffListPath.length;
    console.log("Length is: " + sizeTariffList);
    var counter=0;
    for (let index = 0; index < tariffListPath.length; index++) {
        console.log("index: " + index);
        const elementChild = await tariffListPath[index].findElements(By.xpath("./child::*"));
        const lenChild = await elementChild.length;
        console.log("elementChild length: " +lenChild);
        if (lenChild == 1)
        {
            const classNameChild = await elementChild[0].getAttribute("class");
            // console.log("Classname is: " + classNameChild);
            if (classNameChild.includes("col-12 px-1 px-lg-3"))
            {
                console.log("Tariff is found and increasing counter.");
                counter = counter+1;
            }
        }
        else
            throw new Error("Count error on child elements!")

    }
    console.log("Total tariff count is: " + counter);
    if (parseInt(string)<= counter)
        console.log("More than " + string + " tariffs are displaying.");
    else
        throw new Error("Less than " + string + " tariffs are displaying!");
});

Given('the displayed tariffs provide at least {string} download speed', async function (string) {
    console.log("Validate that the displayed tariffs provide at least " + string + " download speed.");
    console.log("Gather all download speeds from the page.");
    const downloadSpeedListPath = await driver.findElements(By.xpath(pageObject.LinkSelection100Mbit))
    console.log("Total value on page is: " + await downloadSpeedListPath.length);
    var listVal=[];
    for (let index = 0; index < downloadSpeedListPath.length; index++) {
        var element = await downloadSpeedListPath[index].getText();
        console.log("Element is: " + element);
        if (element.includes("."))
            element = element.replace(".","");
        if (parseInt(element)>=parseInt(string))
            listVal.pop(parseInt(element));
        else
            throw new Error("Download speed is less than 100mbit: " + element);
    }

});