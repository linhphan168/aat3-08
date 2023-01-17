import { Page, expect } from "@playwright/test";
import { DashboardPage } from "./dashboard.page";

export class DiscountPage extends DashboardPage {
    constructor(page: Page) {
        super(page);
    }

    async clickButtonCreateDiscount() {
        await this.page.getByText('Codes').click();
        await this.page.getByText('Create discount').click();
    }

    async createPercentageDiscountCode(percentageDiscountCode: string, percentageDiscountValue: string, productName: string) {
        await this.page.locator("//input[@placeholder='e.g. SUMMERSALE']").fill(percentageDiscountCode);
        await this.page.locator("//input[@placeholder='0' and @class = 's-input__inner']").fill(percentageDiscountValue);
        // await this.page.click(`//label[3]//span[2]`);  

        //   add product to discount
        await this.page.getByText('Specific products').click();
        await this.page.waitForTimeout(2 * 1000);
        await this.page.locator("//input[@placeholder='Search products']").fill(productName);
        await this.page.click("//div[@class='select-product-component s-mt16']//span[@class='s-flex s-flex--align-center'][normalize-space()='Browse']");
        await expect(this.page.locator('//div[@class="sbase-spinner"]')).toHaveCount(0); // đợi loading
        await this.page.click("//body/div[@id='app']/div[@class='unite-ui-frame vertical-screen']/main[@class='s-mb96 unite-ui-dashboard__main menu-expand']/div[@class='m-t-ex container']/div/div[@class='discount-detail-page']/div[@class='row']/div[@class='col-xs-12 col-sm-8']/form[@class='s-form']/div[@class='section s-mt24']/div[@class='section-body s-flex s-flex--vertical s-mt4']/div[@class='select-product-component s-mt16']/div[@class='s-modal is-active modal-select-product modal-select-item']/div[@class='s-modal-wrapper']/div[@class='s-animation-content s-modal-content']/div[@class='s-modal-body']/div[@class='item-list']/div[1]/div[1]/label[1]/span[1]");
        await this.page.waitForTimeout(3 * 1000);
        await this.page.click("//button[normalize-space()='Save']");
        await this.page.click("//button[normalize-space()='Save changes']");
        console.log("create discount code")
    }

    async goToProduct(productName: string) {
        await this.page.getByText('All products').click();
        await this.page.locator("//input[contains(@placeholder,'Search products')]").fill(productName);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(5 * 1000);  // đổi
        await this.page.click("//div[@class='product-name']");
    }

    async addProductToCart({context}) {
        const pagePromise = context.waitForEvent('page');
        await this.page.click("//span[normalize-space()='View']");
        const productStorefront = await pagePromise;
        await productStorefront.waitForLoadState();
        console.log(await productStorefront.title());

        await productStorefront.click("//span[normalize-space()='Add to cart']");
        await productStorefront.waitForTimeout(5 * 1000);
        await productStorefront.click("//button[@name='checkout']");
        await productStorefront.waitForTimeout(5 * 1000);
    }

    async verifyPercentageDiscountCode( percentageDiscountCode: string) {
        await this.page.locator("//input[@placeholder='Enter your promotion code']").fill(percentageDiscountCode);
        await this.page.click("//button[normalize-space()='Apply']");
        await this.page.waitForTimeout(1 * 1000);
        const discountCode = await this.page.locator("//span[@class='reduction-code']//span[@class='reduction-code__text']").textContent();
        expect(discountCode).toEqual(percentageDiscountCode);
        console.log('add discount code');
    }

    async fillShippingAdress() {
        await this.page.locator("//input[@id='checkout_shipping_address_email']").fill("tuyetle+1@beeketing.net");
        await this.page.locator("//input[@id='checkout_shipping_address_last_name']").fill("linhphan");
        await this.page.locator("//input[@id='checkout_shipping_address_address_line1']").fill("US");
        await this.page.locator("//input[@id='checkout_shipping_address_city']").fill("HANOI");
        await this.page.locator("//input[@id='checkout_shipping_address_zip']").fill("10000");
        await this.page.locator("//input[@id='checkout_shipping_address_phone']").fill("012345687");
        await this.page.click("//span[normalize-space()='Keep me up-to-date on the order progress and exclusive offers via text messages']");
        await this.page.waitForTimeout(1 * 1000);
        await this.page.click("//button[normalize-space()='Continue to shipping method']");
        await this.page.click("//button[@class='s-button step__continue-button']");
        await this.page.waitForTimeout(1 * 1000);

    }

    async checkout() {
        await this.page.locator('//div[@class="fieldset stripe-form test-gateway"]')
            .frameLocator("//div[@id='stripe-card-number']//iframe")
            .locator('//input[@placeholder="Card number"]')
            .fill("4242424242424242");
        await this.page.waitForTimeout(3 * 1000);
        await this.page.locator("//input[@placeholder='Cardholder name']").fill("linh phan");
        await this.page
            .locator("//div[@class='fieldset stripe-form test-gateway']")
            .frameLocator("//div[@id='stripe-card-expiry']//iframe")
            .locator("//input[@placeholder='MM/YY']")
            .fill("0424");
        await this.page
            .locator("//div[@class='fieldset stripe-form test-gateway']")
            .frameLocator("//div[@id='stripe-card-cvc']//iframe")
            .locator("//input[@placeholder='CVV']")
            .fill("111");
        await this.page.waitForTimeout(5 * 1000);
        await this.page.click("//button[normalize-space()='Complete order']");
        console.log('check out success');
    }

    async verifyCheckoutDiscountCode(totalPrice: string) {

        const productName003 = await this.page.locator("//div[@class='os-header__heading']//h2[@class='os-header__title']").textContent();
        const total = await this.page.locator("//span[@class='payment-due__price']").textContent();
        await this.page.waitForTimeout(3 * 1000);
        expect(productName003).toEqual("Thank you!");
        expect(total?.trim()).toEqual(totalPrice);
        console.log('done verify check out');
    }


}