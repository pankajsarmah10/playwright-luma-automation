import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test("test login", async ({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillEmail("pankajqa@qa.com");
    await loginPage.fillPassword("P@ssw0rd@1");

    const homePage = loginPage.clickSignInButton();
    (await homePage).expectHomePageToBeDisplayed();
});