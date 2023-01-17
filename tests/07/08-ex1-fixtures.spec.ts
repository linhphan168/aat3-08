import { ProductPage } from "../../src/pages/dashboard/product.page";
import { Product } from "../../src/pages/type/type";
import { test, expect } from "../../src/pages/fixture/product_fixture";
import { LoginPage } from "../../src/pages/authentication/login.page";

test.describe("product test fixture", () => {
  test("test create product fixtures 17-1 @123", async ({context, page, productPage ,}) => {

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
  });
});