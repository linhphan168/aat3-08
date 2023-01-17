import { Page, expect, Locator, BrowserContext } from "@playwright/test";
import { Product } from "../type/type";
import { DashboardPage } from "./dashboard.page";
import { ProductPage } from "./product.page";

export class ProductStorefront extends ProductPage {
    productNameStoreFront: string;
    productPriceStoreFront: Locator;
    productOptionNameStoreFront: Locator;
    productVariantsStoreFront: Locator;

    constructor(page: Page) {
        super(page);
        this.productNameStoreFront = "//h1[@class='h4 d-block product__name mt0 mb12 product__name-product']";
        this.productPriceStoreFront = page.locator("//div[@class='product__price h4']");
        // this.productOptionNameStoreFront = page.locator("");
        this.productVariantsStoreFront = page.locator("//button[contains(@class, 'product__option')]");
    }

    // async verifyProduct(context: BrowserContext, product: Product) {

    //     // Start waiting for new page before clicking. Note no await.
    //     // const pagePromise = context.waitForEvent('page');
    //     // await this.page.click("//span[normalize-space()='View']");
    //     // const productStorefront = await pagePromise;
    //     // await productStorefront.waitForLoadState();
    //     // console.log(await productStorefront.title());

    //     const [productStorefront] = await Promise.all([
    //         context.waitForEvent('page'),
    //         await this.page.click("//span[normalize-space()='View']"),
    //     ]);

    //     await productStorefront.waitForLoadState("networkidle");

    //     await productStorefront.waitForTimeout(3 * 1000);

    //     //Verify product name
    //     expect(productStorefront.locator(this.productNameStoreFront).textContent()).toEqual(product.name);

    //     //verify price
    //     const priceStorefront = await productStorefront.locator("//div[@class='product__price h4']").textContent();
    //     expect(priceStorefront?.trim()).toEqual(`$${product.price}`);
    //     console.log(priceStorefront);

    //     // Verify Variants
    //     const optionLocators = await productStorefront.locator("//button[contains(@class, 'product__option')]").all();
    //     for (let i = 0; i < product.options.values.length; i++) {
    //         const optionText = await optionLocators[i].textContent();
    //         expect(optionText).toEqual(product.options.values[i]);
    //         console.log(optionText);
    //     }
    //     console.log("verify product");
    // }

}