import { Page } from "@playwright/test";

export class DashboardPage {
    page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToMenu(menuName: string) {
        console.log('Navigating to menu:' + menuName);
        await this.page.locator(`//span[@class="unite-ui-dashboard__aside--text" and normalize-space()="${menuName}"]`).click();
    }

}