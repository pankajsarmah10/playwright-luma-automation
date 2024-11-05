import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import {encrypt, decrypt} from "../utils/CryptojsUtils";
import {encryptEnvFile, decryptEnvFile} from "../utils/EncryptEnvFile";
import logger from "../utils/LoggerUtils";
import cdata from '../testdata/datademo.json';
import { convertCsvFileToJsonFile } from "../utils/CsvToJson";
import { exportToCsv, exportToJson, generateTestData } from "../utils/FakerDataUtils";

let auth = "src/config/auth.json";

test.skip("test login", async ({page}) => {
    logger.info("Test test login Started");
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillEmail(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickSignInButton();
    await homePage.expectServiceLinkToBeDisplayed();
    await page.context().storageState({ path: auth});
    logger.info("Test test login Completed");
});

for(const contact of cdata) {
    test.skip(`Advanced DD test for ${contact.firstName}`, async({page}) => {
        logger.info("Test for Contact Creation Started");
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.fillEmail(decrypt(process.env.userid!));
        await loginPage.fillPassword(decrypt(process.env.password!));
        
        const homePage = await loginPage.clickSignInButton();
        await homePage.expectServiceLinkToBeDisplayed();
    
        const contactsPage = await homePage.navigateToContactsTab();
        await contactsPage.createNewContact(contact.firstName, contact.lastName, contact.account);
        await contactsPage.expectContactlabelContainsFirstNameAndLastName(contact.firstName, contact.lastName);
        logger.info("Test for Contact creation is completed");
    
    });
}

test.skip("csv to json", async({page}) => {
    convertCsvFileToJsonFile("data.csv", "datademo.json");
})

test.skip("faker utils test", async({page}) => {
    const testData = generateTestData(20);
    exportToJson(testData, 'testData_en.json');
    exportToCsv(testData, 'testData_en.csv');
})

test("Login with auth file", async ({browser}) => {
    const context = await browser.newContext({storageState: auth});
    const page = await context.newPage();
    await page.goto(
        "https://data-computing-581.lightning.force.com/lightning/o/Case/list?filterName=AllOpenCases"
    );
    await expect(page.getByRole("link", {name:"Cases"})).toBeVisible();
});

//save auth with codegen