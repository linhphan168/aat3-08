import { Page, expect, Locator, BrowserContext } from "@playwright/test";
import { Product } from "../type/type";
import { DashboardPage } from "./dashboard.page";

export class ProductPage extends DashboardPage {

    constructor(page: Page) {
        super(page);
    }

    async clickButtonCreateProduct() {
        await this.page.getByText('Add product').click();
    }


    async createProduct(product: Product) {
        // productName: string, productPrice: string, productOptionName: string, productVariants: Array<string>
        await this.page.locator("//input[@placeholder='Short Sleeve T-Shirt']").fill(product.name);
        await this.page.locator("//input[@id='price']").fill(product.price);
        await this.page.click("//a[@class='pull-right']");
        await this.page.locator("//input[@id='option-name']").fill(product.options.name);
        await this.page.locator("//input[@placeholder='Separate options with comma']").fill(product.options.values.join(","));
        await this.page.keyboard.press('Enter');
        await this.page.click("//span[normalize-space()='Save product']");
    }

    async verifyProduct(context: BrowserContext, productName: string, productPrice: string, productOptionName: string, productVariants: Array<string>) {

        // Start waiting for new page before clicking. Note no await.
        const pagePromise = context.waitForEvent('page');
        await this.page.click("//span[normalize-space()='View']");
        const productStorefront = await pagePromise;
        await productStorefront.waitForLoadState();
        console.log(await productStorefront.title());

        //Verify product name
        const productNameStorefront = await productStorefront.locator("//h1[@class='h4 d-block product__name mt0 mb12 product__name-product']").textContent();
        await productStorefront.waitForTimeout(3 * 1000);
        console.log(productNameStorefront);
        expect(productNameStorefront).toEqual(productName);

        //verify price
        const priceStorefront = await productStorefront.locator("//div[@class='product__price h4']").textContent();
        expect(priceStorefront?.trim()).toEqual(`$${productPrice}`);
        console.log(priceStorefront);

        // Verify Variants
        const optionLocators = await productStorefront.locator(`//button[contains(@class, 'product__option')]`).all();
        for (let i = 0; i < productVariants.length; i++) {
            const optionText = await optionLocators[i].textContent();
            expect(optionText).toEqual(productVariants[i]);
            console.log(optionText);
        }
        console.log("verify product");
    }


    async clickButtonCreateCollection() {
        await this.page.getByText('Collections').click();
        await this.page.getByText('Create collection').click();
    }

    async createManualCollection(collectionName: string) {
        await this.page.locator("//input[@placeholder='e.g Summer collection, Under $100, Staff picks']").fill(collectionName);
        await this.page.click("//div[@class='col-md-8 col-xs-12']//div[1]//label[1]//span[1]");
        await this.page.click("//span[normalize-space()='Save']");
        console.log("create collection success");
    }

    async addProductToCollection(productName: string) {
        await this.page.click("//button[normalize-space()='Add product']");
        await this.page.locator("//input[@placeholder='Search for product']").fill(productName);
        await expect(this.page.locator('//div[@class="sbase-spinner"]')).toHaveCount(0);
        await this.page.click("//div[@class='item-list']//div[1]//div[1]//label[1]//span[1]");
        await this.page.click("//div[contains(@class,'s-modal-footer')]//span[contains(@class,'s-flex s-flex--align-center')][normalize-space()='Save']");
        await this.page.waitForTimeout(5 * 1000);
        console.log('add product success')
    }

    async verifyManualCollection(context, productNameInCollection: string) {

        // Start waiting for new page before clicking. Note no await.
        const pagePromise = context.waitForEvent('page');
        await this.page.click("//span[normalize-space()='View']");
        const collectionStorefront = await pagePromise;
        await collectionStorefront.waitForLoadState();
        console.log(await collectionStorefront.title());

        //Verify product in collection
        const productNameCollectionStorefront = await collectionStorefront.locator("//span[@class='title d-block cl-black']").textContent();
        expect(productNameCollectionStorefront).toEqual(productNameInCollection);
        console.log("verify product in collection " + productNameCollectionStorefront);
    }

    
    async deleteProduct(productName: string) {
        await this.page.getByText('All products').click();
        await this.page.locator("//input[contains(@placeholder,'Search products')]").fill(productName);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(5 * 1000);  // đổi
        await this.page.click("//div[@class='product-name']");
        await this.page.click("//span[normalize-space()='Delete product']");
        await this.page.click("//button[@class='s-button btn-confirm-delete is-danger']");
    }







}