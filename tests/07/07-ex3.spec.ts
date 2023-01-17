import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/authentication/login.page";
import { DiscountPage } from "../../src/pages/dashboard/discount.page";

test ('Create discount code POM', async({page, context}) => {
    const loginPage = new LoginPage(page);
    const discountPage = new DiscountPage(page);

    // Login vao dashboard
    await loginPage.login();

    // Click button create collection
    await discountPage.navigateToMenu("Discounts");
    await discountPage.navigateToMenu("Discounts");
    await discountPage.page.waitForTimeout(3 * 1000);
    await discountPage.clickButtonCreateDiscount();
    await discountPage.page.waitForTimeout(3 * 1000); 

    await discountPage.createPercentageDiscountCode('OCG_2023_TALENT', '10', 'iPhone 14 Pro Max 128GB - linhphan');
    await discountPage.navigateToMenu("Products")
    await discountPage.goToProduct('iPhone 14 Pro Max 128GB - linhphan');
    await discountPage.addProductToCart({context}, 'OCG_2023_TALENT');
    // await discountPage.verifyPercentageDiscountCode('OCG_2023_TALENT');
    await discountPage.fillShippingAdress();
    await discountPage.checkout();
    await discountPage.verifyCheckoutDiscountCode("$96.99");

})

