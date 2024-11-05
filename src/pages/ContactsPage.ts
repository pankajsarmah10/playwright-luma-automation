import {Page, expect} from "@playwright/test";
import logger from "../utils/LoggerUtils";


export default class ContactsPage {

    private readonly newButtonLocator = "New";
    private readonly firstNameTextFieldLocator = "First Name";
    private readonly lastNameTextFieldLocator = "Last Name"
    private readonly accountNameLocator = "Search Accounts...";
    private readonly accountNameListItemLocator = "//*[contains(@class,'slds-combobox_container')]//li[contains(@class,'slds-listbox__item')]//span[contains(text(),'{item_text}')]"
    private saveButtonLocator = "button[name=SaveEdit]";
    private readonly contactFullNamelabelLocator = "[name=primaryField] lightning-formatted-name";

    constructor(private page: Page) {

    }

    async createNewContact(f_name: string, l_name: string, ac_name:string) {
        await this.page.getByRole('button', {name: this.newButtonLocator}).click();
        logger.info("New button is clicked");
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).click();
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).fill(f_name);
        logger.info(`First name is filled as ${f_name}`);
        await this.page.getByPlaceholder(this.lastNameTextFieldLocator).click();
        await this.page.getByPlaceholder(this.lastNameTextFieldLocator).fill(l_name);
        logger.info(`Last name is filled as ${l_name}`);
        await this.page.getByPlaceholder(this.accountNameLocator).click();
        await this.page.waitForTimeout(3000);
        (await this.page.waitForSelector(this.accountNameListItemLocator.replace('{item_text}', ac_name))).click();
        logger.info(`Account name selected as ${ac_name}`);        
        await this.page.locator(this.saveButtonLocator).click()
        .catch((error) => {
            logger.error(`Error clicking on Save button: ${error}`);
        }).then(() => logger.info(`Save button is clicked`));
    }

    async expectContactlabelContainsFirstNameAndLastName(f_name: string, l_name:string) {
        await expect(this.page.locator(this.contactFullNamelabelLocator)).toContainText(`${f_name} ${l_name}`);
        logger.info(`New contact created and ${f_name} ${l_name} is visible`);
    }

}

