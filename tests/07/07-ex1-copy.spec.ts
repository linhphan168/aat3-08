import { test, expect } from "@playwright/test";
import {  LoginPage } from "../../src/pages/authentication/login.page";
import { ProductPage } from "../../src/pages/dashboard/product.page";


test.describe('todo tests', () => {
    test.beforeAll(async () => {
      console.log('Before all run');
    });
  
    test.beforeEach(async ({ page }) => {
      console.log('Before each run');
      const loginPage = new LoginPage(page);
      await loginPage.login();
    });
  
    test.afterEach(async () => {
      console.log('After each run');
    });
  
    test.afterAll(async () => {
      console.log('After all run');
    });
  
    // test 1
    test('create product POM @1000', async ({ page, context }) => {

        const productPage = new ProductPage(page);

        //  chon menu product -> Viet o trong DashboardPage
        await productPage.navigateToMenu("Products");
        await productPage.page.waitForTimeout(5 * 1000);

        // Click button create product -> Viet o trong ProductPage
        await productPage.clickButtonCreateProduct();
        await productPage.page.waitForTimeout(5 * 1000);

        // create product
        await productPage.createProduct("iPhone 14 Pro Max 128GB - linhphan", "100.00", "Color", ["Space black", "Silver", "Gold", "Deep Purple"]);
        await productPage.page.waitForTimeout(5 * 1000);
        console.log("create product success")

        // Verify product
        await productPage.verifyProduct(context,"iPhone 14 Pro Max 128GB - linhphan", "100.00", "Color", ["Space black", "Silver", "Gold", "Deep Purple"])
        await productPage.page.waitForTimeout(5 * 1000);
        console.log("done test 1");
        
    })

    // TODO test 2
    test ('create manual collection POM @1234', async( {page, context} ) => {
      const productPage = new ProductPage(page);
  
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
      console.log("done test 2");
    })

    // TODO test 3
});


