import {Page} from "@playwright/test";
import HomePage from "./HomePage";

export default class LoginPage {

    private readonly emailInputSelector = "#email";
    private readonly passwordInputSelector = "[name='login[password]']";
    private readonly signInButtonSelector = "button.action.login.primary";

    constructor(private page: Page) {

    }

    async navigateToLoginPage() {
        await this.page.goto("/customer/account/login");
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    async fillEmail(email: string) {
        await this.page.locator(this.emailInputSelector).fill(email);
    } 

    async fillPassword(password: string) {
        await this.page.locator(this.passwordInputSelector).fill(password);
    }

    async clickSignInButton() {
        await this.page
        .locator(this.signInButtonSelector)
        .scrollIntoViewIfNeeded();
        
        await this.page
        .locator(this.signInButtonSelector)
        .click()
        .catch((error) => {
            console.log(`Error clicking on Sign in button: ${error}`);
            throw error;
        })

        const homePage = new HomePage(this.page);
        return homePage;
    }
}