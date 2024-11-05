import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import {encrypt, decrypt} from "../utils/CryptojsUtils";
import {encryptEnvFile, decryptEnvFile} from "../utils/EncryptEnvFile";
import logger from "../utils/LoggerUtils";
import cdata from '../testdata/datademo.json';
import { convertCsvFileToJsonFile } from "../utils/CsvToJson";
import { exportToCsv, exportToJson, generateTestData } from "../utils/FakerDataUtils";

test("test login", async ({page}) => {
    logger.info("Test test login Started");
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillEmail(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickSignInButton();
    await homePage.expectServiceLinkToBeDisplayed();
    logger.info("Test test login Completed");
});

for(const contact of cdata) {
    test(`Advanced DD test for ${contact.firstName}`, async({page}) => {
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