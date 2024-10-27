import {Page, expect} from "@playwright/test";

export default class HomePage{
    private readonly homePageWelcome = ".page-header .customer-welcome";

    constructor(private page: Page) {

    }

    async expectHomePageToBeDisplayed() {
        await expect(this.page.locator(this.homePageWelcome)).toBeVisible({timeout:15000});
    }
}