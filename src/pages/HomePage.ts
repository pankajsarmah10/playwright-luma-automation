import {Page, expect} from "@playwright/test";
import logger from "../utils/LoggerUtils";
import ContactsPage from "./ContactsPage";

export default class HomePage{
    private readonly serviceTitleLocator = ".verticalNavMenuListItem .appItemLabel";
    private readonly contactsLinkLocator = "one-app-nav-bar nav[role=navigation] :text-is(\"Contacts\")";

    constructor(private page: Page) {

    }

    async expectServiceLinkToBeDisplayed() {          
        await expect(this.page.locator(this.serviceTitleLocator).getByText('Service')).toBeVisible({timeout:15000
        }).catch((error) => {
           logger.error(`Service Title not exist: ${error}`);
           throw error;
        }).then(() => logger.info(`Service title ${this.serviceTitleLocator} is visible`));
    }

    async navigateToContactsTab() {
        await expect(this.page.locator(this.contactsLinkLocator)).toBeVisible();
        logger.info('Contacts tab is visible');
        await this.page.locator(this.contactsLinkLocator).click();
        await this.page.waitForTimeout(3000);
        logger.info('Contacts tab is clicked');
        return new ContactsPage(this.page);
    }
}