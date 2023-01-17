import { Locator, Page } from "@playwright/test";

export class LoginPage1 {
    page: Page;
    username: Locator;
    password: Locator;
    loginbutton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator("//input[@placeholder='example@email.com']");
        this.password = page.locator("//input[@id='password']");
        this.loginbutton = page.locator("//button[@type='submit']");
    }
    async login1() {
        this.username.fill('tuyetle+1@beeketing.net');
        this.password.fill('123456');
        this.loginbutton.click();
    }
}


// async login1 = new LoginPage(page) {
//     this.username.fill('tuyetle+1@beeketing.net');
//     this.password.fill('123456');
//     this.loginbutton.click();
// };


