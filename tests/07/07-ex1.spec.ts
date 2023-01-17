import { test, expect, BrowserContext } from "@playwright/test";
import { LoginPage } from "../../src/pages/authentication/login.page";
import { ProductPage } from "../../src/pages/dashboard/product.page";

test('create product POM 16-1', async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);


    await test.step("Login vao dashboard", async () => {
        await loginPage.login();
    });


    await test.step("chon menu product,Click button create product", async () => {
        await productPage.navigateToMenu("Products");
        await productPage.clickButtonCreateProduct();

    });


    await test.step("create product", async () => {
        await productPage.createProduct(
            {
                name: "iPhone 14 Pro Max 128GB - linhphan",
                price: "100.00",
                options: {
                    name: "Color",
                    values: ["Space black", "Silver", "Gold", "Deep Purple"],
                }
            }
        );
        await productPage.page.waitForTimeout(5 * 1000);
        console.log("create product success");
    });
    

    await test.step("verify product", async () => {
        await productPage.verifyProduct(context, "iPhone 14 Pro Max 128GB - linhphan", "100.00", "Color", ["Space black", "Silver", "Gold", "Deep Purple"])
        await productPage.page.waitForTimeout(5 * 1000);
        console.log("done test");
    });

})

