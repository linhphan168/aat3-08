import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/authentication/login.page";
import { ProductPage } from "../../src/pages/dashboard/product.page";

test ('create manual collection POM @1234', async( {page, context} ) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    // Login vao dashboard
    await loginPage.login();

    // Click button create collection
    await productPage.navigateToMenu("Products");
    await productPage.page.waitForTimeout(3 * 1000);
    await productPage.clickButtonCreateCollection();
    await productPage.page.waitForTimeout(3 * 1000);

    // Create manual collection & add product to collection
    await productPage.createManualCollection("Mobile phone");
    await productPage.addProductToCollection("iPhone 14 Pro Max 128GB - linhphan");

    // verify add product to collection
    await productPage.verifyManualCollection(context, "iPhone 14 Pro Max 128GB - linhphan");
    console.log("done test");

})