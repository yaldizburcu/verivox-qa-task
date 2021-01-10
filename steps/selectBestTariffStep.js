const initializeDriver = require("../utils/createDriver");
const assert = require("assert")
const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber")
const pageObject = require("../page-objects/pageObjectList");
const commonFunctions = require("../utils/commonFunctions");
const selectedTariffDetails = require("../page-objects/selectedTariffDetails");
const { By, until } = require("selenium-webdriver");
const { Key } = require("selenium-webdriver/lib/input");
const { count } = require("console");
setDefaultTimeout(120 * 1000);

const driver = initializeDriver();
// var driver = initializeDriver();
// global.driver = driver;

var totalCount = 0;
global.totalCount = totalCount;

var tariffLoadedCount = 0;
global.tariffLoadedCount = tariffLoadedCount;

var tariffName = "";
global.tariffName = tariffName;

var feeName = "";
global.feeName = feeName;

Given('I can open {string}', async function (string) {
    console.log("Launch page link: " + string);
    // driver = initializeDriver();
    await driver.get(string);

    console.log("Validate that popup window is opened and close if it is opened by accepting.");
    await driver.sleep(5000);
    const popupWindowPath = await driver.findElements(By.xpath(pageObject.PopupWindowCookie));
    const lenPopUp = await popupWindowPath.length;
    console.log("Popup length is: " + lenPopUp)
    if (lenPopUp>0) {
        console.log("Popup window is opened.");
        console.log("Closing popup window.");
        const buttonAcceptPath = await driver.findElement(By.xpath(pageObject.ButtonAccept));
        await buttonAcceptPath.click();
        console.log("Validate pop up window is closed.");
        commonFunctions.validatePopUpStatus(driver, expectedStatus = false);
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
    let textUp = await driver.findElement(By.xpath(pageObject.TextTitleTarifempfehlung), 30000);
    await driver.sleep(2000);

    //getting length of texts to be sure page is loaded
    textUp = await driver.findElements(By.xpath(pageObject.TextTitleTarifempfehlung));
    const statusTextUp = await textUp.length;
    assert.ok(statusTextUp > 0, "Verivox-Tarifempfehlung title is not displaying!");
    console.log("Verivox-Tarifempfehlung title is displaying.");
    await driver.sleep(3000);
});

Then('at least {string} internet tariffs are displayed', async function (string) {
    console.log("Validate that at least five internet tariffs are displayed.");
    await driver.wait(until.elementLocated(By.xpath(pageObject.ListTariff)));
    const tariffListPath = await driver.findElements(By.xpath(pageObject.ListTariff));
    const sizeTariffList = await tariffListPath.length;
    console.log("Length is: " + sizeTariffList);
    var counter = 0;
    for (let index = 0; index < tariffListPath.length; index++) {
        console.log("index: " + index);
        const elementChild = await tariffListPath[index].findElements(By.xpath("./child::*"));
        const lenChild = await elementChild.length;
        console.log("elementChild length: " + lenChild);
        if (lenChild == 1) {
            const classNameChild = await elementChild[0].getAttribute("class");
            // console.log("Classname is: " + classNameChild);
            if (classNameChild.includes("col-12 px-1 px-lg-3")) {
                console.log("Tariff is found and increasing counter.");
                counter = counter + 1;
            }
        }
        else
            throw new Error("Count error on child elements!")

    }
    console.log("Total tariff count is: " + counter);
    if (parseInt(string) <= counter)
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
            element = element.replace(".", "");
        if (parseInt(element) >= parseInt(string))
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
    console.log("The total count of tariff is " + totalCount);
});

Given('I scroll to the end of the Result List page', async function () {
    console.log("Scroll bottom of the Result List page.");
    commonFunctions.scrollDownWeitereLadenButton(driver);
});

Given('I should see {string} tariffs displayed', async function (string) {
    console.log("Validate that " + string + " tariffs are displaying.");
    const tariffCountPath = await driver.findElements(By.xpath(pageObject.TextValueTariffCountNumber));
    console.log("Total count is: " + await tariffCountPath.length);
    const countDisplay = (await tariffCountPath[tariffCountPath.length - 1].getText()).replace(".", "");
    console.log("Count display is: " + countDisplay);
    if (countDisplay == string)
        console.log(string + " tariffs displayed");
    else
        throw new Error(string + " tariffs do not display. Displaying count is: " + countDisplay)

    tariffLoadedCount = await tariffCountPath.length;
});

Then('I click on `20 weitere Tarife laden` button', async function () {
    commonFunctions.clickWeitereLadenButton(driver);
    await (await driver).sleep(3000);
    await commonFunctions.scrollDownWeitereLadenButton(driver);
});

Then('I should see the next {string} tariffs displayed', async function (string) {
    console.log("Validate that after clicking on weitere laden button, next " + string + " tariffs are loaded");

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
    console.log("Difference is: " + (totalCount - tariffLoadedCount));
    while ((totalCount - tariffLoadedCount) > 20) {
        console.log("Clicking on loading next 20 tariffs");
        commonFunctions.clickWeitereLadenButton(driver);
        await (await driver).sleep(3000);
        commonFunctions.scrollDownWeitereLadenButton(driver);

        // wait until all the required items are loaded to the page
        let pathToCheck = pageObject.ListTariff + "[" + (parseInt(tariffLoadedCount) + 1).toString() + "]";
        await driver.wait(until.elementLocated(By.xpath(pathToCheck)))
        let buttonWeitereLadenPath = await driver.findElements(By.xpath(pathToCheck));
        if ((await buttonWeitereLadenPath.length) == 0)
            throw new Error("Weitere Tarife Laden button is not displaying!");

        await driver.wait(until.elementsLocated(By.xpath(pageObject.TextValueTariffCountNumber)), 15000);
        const tariffCountPath = await driver.findElements(By.xpath(pageObject.TextValueTariffCountNumber));
        const tariffCount = (await tariffCountPath.length);
        console.log("Loaded tariff count is: " + tariffCount);
        tariffLoadedCount = parseInt(tariffCount);
        console.log("New tariff loaded count is: " + tariffLoadedCount);
    }
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
    const tariffCountPath = await driver.findElements(By.xpath(pageObject.TextValueTariffCountNumber));
    const tariffCount = (await tariffCountPath.length);
    console.log("Loaded tariff count is: " + tariffCount);
    console.log("Total expected count is: " + totalCount);
});

When('I get the required data for tariff suggestion {string} from Ermittelte Tarife', async function (string) {
    console.log("Getting the tariff name of the selected tariff number  " + string);
    //first I should open the required page according to selected tarif count number
    //each page displays 20 tariff and I got total count
    const totalCountToClickNextbutton = parseInt(parseInt(string) / 20);
    console.log("Required click on Weitere laden button to get the required tariff detail is: " + totalCountToClickNextbutton.toString());
    if (totalCountToClickNextbutton == 0)
    {
        console.log("Getting the related tariff from first page.");
        await driver.wait(until.elementLocated(By.xpath(pageObject.TextTariffNamesList)));
        const listPath = await driver.findElements(By.xpath(pageObject.TextTariffNamesList));
        tariffName = await listPath[parseInt(string) - 1].getText();
        console.log("Tariff name for " + string + " is : " + tariffName);
    }
    else {
        for (let index = 0; index <= totalCountToClickNextbutton; index++) {
            console.log("Loading new tariff suggestions.");
            commonFunctions.clickWeitereLadenButton(driver);
            await driver.sleep(5000);
        }
        await driver.wait(until.elementLocated(By.xpath(pageObject.TextTariffNamesList)));
        const listPath = await driver.findElements(By.xpath(pageObject.TextTariffNamesList));
        await driver.sleep(10000);
        tariffName = await (await listPath[parseInt(string) - 1]).getText();
        console.log("Tariff name for " + string + " is : " + tariffName);
    }

    console.log("Getting the fee of the tariff " + tariffName);
    await driver.wait(until.elementLocated(By.xpath(pageObject.TextFeeList)));
    const listFeePath = await (await driver).findElements(By.xpath(pageObject.TextFeeList));
    feeName = await listFeePath[3 + parseInt(string) - 1].getText();
    console.log("Fee is: " + feeName);
});

When('I click Zum Angebot button to select tariff for suggestion {string} from Ermittelte Tarife', async function (string) {
    console.log("Clicking on `Zum Angebot` button to select tariff for suggesting " + string + " from Ermittelte Tarife.");
    await driver.wait(until.elementLocated(By.xpath(pageObject.ButtonZumAngebotList)));
    const listButtonZumAngebotPath = await driver.findElements(By.xpath(pageObject.ButtonZumAngebotList));
    let buttonZumAngebot;
    if (string <=20)
        buttonZumAngebot = await listButtonZumAngebotPath[3 + parseInt(string) - 1]
    else
        buttonZumAngebot = await listButtonZumAngebotPath[3 + parseInt(string) - 2]
    await buttonZumAngebot.click();
});

Then('offer page opens for suggestion tariff {string}', async function (string) {
    console.log("Validate that offer page is opened for suggestion " + string);
    console.log("Getting actual tariff name displaying on page.");
    await driver.sleep(4000);
    await driver.wait(until.elementLocated(By.xpath(selectedTariffDetails.TextTariffName)));
    const actualTariffNamePath = await driver.findElement(By.xpath(selectedTariffDetails.TextTariffName));
    const actualTariffName = await actualTariffNamePath.getText();
    console.log("Displaying tariff name is: " + actualTariffName);
    console.log("Actual tariff name is: " + tariffName);
    assert.strictEqual(actualTariffName, tariffName, "Tariff names are not same!");
    console.log("Tariff details page is opened for related tariff: " + tariffName);
});

Then('there are two `In 5 Minuten online wechseln` buttons', async function () {
    console.log("Validate that there are two `In 5 Minuten online wechseln` buttons are displaying on the page.");
    const listButtonsPath = await driver.findElements(By.xpath(selectedTariffDetails.ButtonList5MinutenWecheln));
    const countButtons = await listButtonsPath.length;
    console.log("Total buttons on page: " + countButtons);
    assert.strictEqual(2, parseInt(countButtons), "There are not 2 `In 5 Minuten online wechseln` buttons displaying!");
    console.log("There are two `In 5 Minuten online wechseln` buttons are displaying on the page.");
});

Then('the page contains hardware list', async function () {
    console.log("Validate that the page contains hardware list according to selected tariff " + tariffName);
    const listHardwarePath = await driver.findElements(By.xpath(selectedTariffDetails.ModuleHardwareList));
    const countHardwares = await listHardwarePath.length;
    console.log(`There are ${countHardwares} hardwares for the tariff ${tariffName}`);
});

Then('the page contains the same price as in previous page', async function () {
    console.log("Validate that the selected tariff fee is as " + feeName);
    const listPricePath = await driver.findElements(By.xpath(selectedTariffDetails.TextListDurchPreise));
    let listPrices = []
    for (let index = 0; index < await listPricePath.length; index++) {
        const element = await listPricePath[index].getText();
        console.log("Price is: " + element);
        listPrices.push(element);
    }
    console.log("Getting price value displaying at Durchschnittpreis the page");
    const priceDurchschnittpreisPath = await driver.findElement(By.xpath(selectedTariffDetails.TextDurchschnittpreisValue));
    const priceVal = await priceDurchschnittpreisPath.getText();
    console.log("Price displaying at Durchschnittpreis is: " + priceVal);
    listPrices.push(priceVal);
    console.log("Validating all the prices are same for the tariff " + tariffName)
    for (let index = 0; index < listPrices.length; index++) {
        const element = listPrices[index];
        if (element == feeName)
            continue
        else
            throw new Error("Problem on displaying price value on Tariff Details page for tariff " + tariffName);
    }
    console.log("All the price values displaing at Tariff Details page for tariff " + tariffName + " are correct as expected: " + feeName);

});

Then('selected tariff price details are displaying', async function () {
    console.log(`Validate that the price details of ${tariffName} is displaying.`);
    console.log("Validating `Tarifkosten` title is displaying.");
    const tarifKostenList = await driver.findElements(By.xpath(selectedTariffDetails.TextTariffKosten));
    const tarifKostenVal = await tarifKostenList[0].getText()
    assert.strictEqual(tarifKostenVal, "Tarifkosten", "`Tarifkosten` title is NOT displaying!")
    console.log("`Tarifkosten` title is displaying.");

    console.log("Validate that `Hardware` and/or `Vorteile`  titles are displaying.");
    const titlesList = await driver.findElements(By.xpath(selectedTariffDetails.ListTextTariffs));
    let listTitles = [];
    for (let index = 0; index < await titlesList.length; index++) {
        const element = await titlesList[index].getText();
        listTitles.push(element);
    }
    console.log("Displaying titles are: ");
    console.log(await listTitles);
    if (await listTitles.indexOf("Vorteile") > -1) {
        console.log("Vorteile title is displaying");
    }
    else {
        throw new Error("Vorteile title is NOT displaying!");
    }

});