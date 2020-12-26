const initializeDriver = require("../utils/createDriver");
const assert = require("assert")
const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber")
const pageObject = require("../page-objects/pageObjectList");
const commonFunctions = require("../utils/commonFunctions");
const { By, until } = require("selenium-webdriver");
const { Key } = require("selenium-webdriver/lib/input");
setDefaultTimeout(30 * 1000);

const driver = initializeDriver();

var totalCount=0;
global.totalCount = totalCount;

var tariffLoadedCount = 0;
global.tariffLoadedCount = tariffLoadedCount;

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
    await driver.sleep(2000);
});

Then('I should see a page that lists the available tariffs for my selection', async function () {
    console.log("Validate that suggested tariff page is opened.");
    //waiting until element loaded
    await driver.wait(until.elementLocated(By.xpath(pageObject.TextTitleTarifempfehlung)));
    let textUp =  await driver.findElement(By.xpath(pageObject.TextTitleTarifempfehlung),30000);
    // await driver.executeScript("arguments[0].scrollIntoView();", textUp);
    await driver.sleep(2000);
    
    //getting length of texts to be sure page is loaded
    textUp =  await driver.findElements(By.xpath(pageObject.TextTitleTarifempfehlung));
    const statusTextUp = await textUp.length;
    assert.ok(statusTextUp>0, "Verivox-Tarifempfehlung title is not displaying!");
    console.log("Verivox-Tarifempfehlung title is displaying.");
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
    for (let index = 0; index < downloadSpeedListPath.length; index++) {
        var element = await downloadSpeedListPath[index].getText();
        // console.log("Element is: " + element);
        if (element.includes("."))
            element = element.replace(".","");
        if (parseInt(element)>=parseInt(string))
            continue
        else
            throw new Error("Download speed is less than 100mbit: " + element);
    }
    console.log("All the controlled download speed are equal or larger than " + string + " Mbit/s.");
});

Given('I should see the total number of available tariffs listed in the Ermittelte Tarife section', async function () {
    console.log("Validate that the total number of available tariffs are listed in the Ermittelte Tarife section.");
    await driver.wait(until.elementLocated(By.xpath(pageObject.TextErmittelteTarifeCount)));
    const countPath = await driver.findElement(By.xpath(pageObject.TextErmittelteTarifeCount));
    const countVal = await countPath.getText();
    console.log("The value is: " + countVal);
    totalCount = countVal.split(" ")[0]
    console.log("The total count of tarife is " + totalCount);
});

Given('I scroll to the end of the Result List page', async function () {
    console.log("Scroll bottom of the Result List page.");
    commonFunctions.scrollDownWeitereLadenButton(driver);
});

Given('I should see {string} tariffs displayed', async function (string) {
    console.log("Validate that " + string + " tariffs are displaying.");
    const tariffCountPath = await driver.findElements(By.xpath(pageObject.TextValueTariffCountNumber));
    console.log("Total count is: " + await tariffCountPath.length);
    const countDisplay = (await tariffCountPath[tariffCountPath.length-1].getText()).replace(".","");
    console.log("Count display is: " + countDisplay);
    if(countDisplay== string)
        console.log(string + " tariffs displayed");
    else
        throw new Error (string + " tariffs do not display. Displaying count is: " + countDisplay)
    
    tariffLoadedCount = await tariffCountPath.length;
});

Then('I click on `20 weitere Tarife laden` button', async function () {
    commonFunctions.clickWeitereLadenButton(driver);
    await (await driver).sleep(3000);
    await commonFunctions.scrollDownWeitereLadenButton(driver);
});

Then('I should see the next {string} tariffs displayed', async function (string) {
    console.log("Validate that after clicking on weitere laden button, next " + string + " tariffs are loaded");
    
    // await driver.wait(until.elementLocated(By.xpath(pageObject.ButtonWeitereLaden)));
    // const buttonPath =  await driver.findElement(By.xpath(pageObject.ButtonWeitereLaden));
    // await driver.executeScript("arguments[0].scrollIntoView();", buttonPath);
    // await driver.sleep(2000); 
    // await buttonPath.sendKeys(Key.TAB);
    
    //getting the total count of tariffs on the page
    const tariffCountPath = await driver.findElements(By.xpath(pageObject.TextValueTariffCountNumber));
    const tariffCount = (await tariffCountPath.length);
    console.log("Loaded tariff count is: " + tariffCount);

    //comparing loaded and expected tariff counts
    const expectedTariffCount = parseInt(string) + tariffLoadedCount;
    console.log("Expected tariff count: " + expectedTariffCount);
    assert.strictEqual(parseInt(tariffCount), expectedTariffCount, "Expected and displaying tariff count are not same!");
    console.log("Expected and displaying tariff counts are same: " + expectedTariffCount.toString());
    tariffLoadedCount = expectedTariffCount;
});

Given('I continue to click on `weitere Tarife laden` button unless I get last click option for `weitere Tarife laden` button', async function () {
    console.log("Click on weitere laden button until getting the last click option for weitere laden button.");
    console.log("Total count of tariffs: " + totalCount);
    console.log("Loaded tariffs: " + tariffLoadedCount.toString());
    console.log("Difference is: " + (totalCount-tariffLoadedCount));
    while((totalCount-tariffLoadedCount)>20)
    {
        console.log("Clicking on loading next 20 tariffs");
        commonFunctions.clickWeitereLadenButton(driver);
        await (await driver).sleep(3000);
        commonFunctions.scrollDownWeitereLadenButton(driver);

        // wait until all the required items are loaded to the page
        let pathToCheck = pageObject.ListTariff + "["+(parseInt(tariffLoadedCount)+1).toString()+"]";
        await driver.wait(until.elementLocated(By.xpath(pathToCheck)))
        let buttonWeitereLadenPath = await driver.findElements(By.xpath(pathToCheck));
        if ((await buttonWeitereLadenPath.length)==0)
            throw new Error("Weitere Tarife Laden button is not displaying!");
        // while ((await buttonWeitereLadenPath.length)==0)
        // while (lenPath ==0)
        // {
        //     console.log("*** in while loop****")
        //     await driver.sleep(1000);
        //     await driver.wait(until.elementLocated(By.xpath(pathToCheck)))
        //     buttonWeitereLadenPath = await driver.findElements(By.xpath(pathToCheck));
        //     counter = counter +1;
        //     if (counter ==10)
        //         throw new Error("Loading tariffs to page does not completed in 10 seconds!");
        // }

        await driver.wait(until.elementsLocated(By.xpath(pageObject.TextValueTariffCountNumber)),15000);
        const tariffCountPath = await driver.findElements(By.xpath(pageObject.TextValueTariffCountNumber));
        const tariffCount = (await tariffCountPath.length);
        console.log("Loaded tariff count is: " + tariffCount);
        tariffLoadedCount = parseInt(tariffCount);
        console.log("New tariff loaded count is: " + tariffLoadedCount);
    }
    console.log("***************");
    console.log("Loaded tariff count: " + tariffLoadedCount);
});

Given('I see the number on weitere laden button shows the remaining expected number of tariffs', async function () {
    console.log("Get the value on the weitere laden button.");
    commonFunctions.scrollDownWeitereLadenButton(driver);
    await driver.wait(until.elementLocated(By.xpath(pageObject.ButtonWeitereLaden)));
    const buttonWeitereLadenPath = await driver.findElement(By.xpath(pageObject.ButtonWeitereLaden));
    const valButton = await buttonWeitereLadenPath.getText();
    console.log("Text on the button is: " + valButton);
    const numberOnButton = (valButton.split(" "))[0];
    console.log("Current loaded tariff count is: " + tariffLoadedCount);
    console.log("The left tariff count is : " + numberOnButton);
    console.log("Total - loaded count: " + (totalCount - tariffLoadedCount));
    
});

Given('I click on `weitere Tarife laden` button', async function () {
    commonFunctions.clickWeitereLadenButton(driver);
    await driver.sleep(3000);
});

Given('weitere laden button gets invisible', async function () {
    commonFunctions.scrollToBottomOfPage(driver);
    console.log("Validate that weitere laden button gets invisible")
    const buttonWeitereLadenPath = await driver.findElements(By.xpath(pageObject.ButtonWeitereLaden));
    const val = await buttonWeitereLadenPath.length;
    console.log("Length is: " + val);
    if (val == 0)
        console.log("Weitere laden button is no longer displaying as expected.");
    else   
        throw new Error("Weitere laden button is still displaying!")
});

Given('all suggested tariffs are displaying', async function () {
    console.log("Validate that all suggested tariffs are displaying.");
    // const buttonPath =  await driver.wait(until.elementLocated(By.xpath(pageObject.ButtonWeitereLaden)));
    // await buttonPath.sendKeys(Key.TAB);

    const tariffCountPath = await driver.findElements(By.xpath(pageObject.TextValueTariffCountNumber));
    const tariffCount = (await tariffCountPath.length);
    console.log("Loaded tariff count is: " + tariffCount);
    console.log("Total expected count is: " + totalCount);
});