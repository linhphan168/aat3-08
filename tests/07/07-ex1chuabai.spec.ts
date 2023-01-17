import { test, expect, BrowserContext } from "@playwright/test";
import { LoginPage } from "../../src/pages/authentication/login.page";
import { ProductPage } from "../../src/pages/dashboard/product.page";
import { Product } from "../../src/pages/type/type";
import { ProductStorefront } from "../../src/pages/dashboard/product_verify.page";

// test.describe('create product POM 17-1', (page) => {

test("create product POM 17-1", async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const productStorefront = new ProductStorefront(page);

    // await test.step("Initialize env", async () => {

    // });

    await test.step("Login vao dashboard", async () => {
        await loginPage.login();
    });
    
    await test.step("chon menu product, add product ", async () => {
        await productPage.navigateToMenu("Products");   //  chon menu product -> Viet o trong DashboardPage
        await productPage.clickButtonCreateProduct();   // Click button create product -> Viet o trong ProductPage
    });

    await test.step("create product", async () => {
        await productPage.createProduct({
            name: "iPhone 14 Pro Max 128GB - linhphan", 
            price: "100.00",
            options: {
                name: "Color",
                values: ["Space black", "Silver", "Gold", "Deep Purple"],
            }
        });
        console.log("create product success");
    });
    await page.waitForTimeout(5 * 1000);
    
    await test.step("Verify product storefront", async () => {
        await productStorefront.verifyProduct(
            context,
            {
            name: "iPhone 14 Pro Max 128GB - linhphan", 
            price: "100.00",
            options: {
                name: "Color",
                values: ["Space black", "Silver", "Gold", "Deep Purple"],
            }})
    console.log('done test')

    });

})

    // // Verify product
    // const verifyProduct = ( context: BrowserContext, productName: string, productPrice: string, productOptionName: string, productVariants: Array<string>) => {

    // // Start waiting for new page before clicking. Note no await.
    // const pagePromise = context.waitForEvent('page');
    // await productPage.page.click("//span[normalize-space()='View']");
    // const productStorefront = await pagePromise;
    // await productStorefront.waitForLoadState();
    // console.log(await productStorefront.title());

    // //Verify product name
    // const productNameStorefront = await productStorefront.locator("//h1[@class='h4 d-block product__name mt0 mb12 product__name-product']").textContent();
    // await productStorefront.waitForTimeout(3 * 1000);
    // console.log(productNameStorefront);
    // expect(productNameStorefront).toEqual(); //

    // //verify price
    // const priceStorefront = await productStorefront.locator("//div[@class='product__price h4']").textContent();
    // expect(priceStorefront?.trim()).toEqual(`$${productPrice}`);
    // console.log(priceStorefront);

    // // Verify Variants
    // const optionLocators = await productStorefront.locator(`//button[contains(@class, 'product__option')]`).all();
    // for (let i = 0; i < productVariants.length; i++) {
    //     const optionText = await optionLocators[i].textContent();
    //     expect(optionText).toEqual(productVariants[i]);
    //     console.log(optionText);
    // }
    // console.log("verify product");
    // }       


    //     console.log("done test");


