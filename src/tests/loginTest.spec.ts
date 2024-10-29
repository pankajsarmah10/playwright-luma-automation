import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import {encrypt, decrypt} from "../utils/CryptojsUtils";
import {encryptEnvFile, decryptEnvFile} from "../utils/EncryptEnvFile";

test("test login", async ({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillEmail(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));

    const homePage = loginPage.clickSignInButton();
    (await homePage).expectHomePageToBeDisplayed();

    
});