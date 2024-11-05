import {Page} from "@playwright/test";
import HomePage from "./HomePage";
import logger from "../utils/LoggerUtils";

export default class LoginPage {

    private readonly emailInputSelector = "#username";
    private readonly passwordInputSelector = "#password";
    private readonly signInButtonSelector = "#Login";

    constructor(private page: Page) {

    }

    async navigateToLoginPage() {
        await this.page.goto("/");
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        logger.info('Navigated to Login page');
    }

    async fillEmail(email: string) {
        await this.page.locator(this.emailInputSelector).fill(email);
        logger.info('Filled username');
    } 

    async fillPassword(password: string) {
        await this.page.locator(this.passwordInputSelector).fill(password);
        logger.info('Filled password');
    }

    async clickSignInButton() {
        await this.page
        .locator(this.signInButtonSelector)
        .scrollIntoViewIfNeeded();
        
        await this.page
        .locator(this.signInButtonSelector)
        .click()
        .catch((error) => {
            logger.error(`Error clicking on Login button: ${error}`);
            throw error;
        }).then(() => logger.info('Clicked Login button'));

        const homePage = new HomePage(this.page);
        return homePage;
    }
}