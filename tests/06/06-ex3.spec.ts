import { test, expect } from "@playwright/test";
// Tạo discount code

test('Create discount code OCG_2023_TALENT', async ({ page, context }) => {

    await page.goto('https://aat3-lp-shopbase.onshopbase.com/admin/');
    await page.waitForTimeout(2 * 1000);
    await page.locator("//input[@id='email']").fill('tuyetle+1@beeketing.net');
    await page.locator("//input[@id='password']").fill('123456');
    await page.click("//button[@type='submit']");
    console.log("login success");
    await page.waitForTimeout(5 * 1000);

    // await page.click("//span[normalize-space()='Discounts']");
    // await page.waitForTimeout(5 * 1000);
    // await page.click("//span[normalize-space()='Codes']"); 
    // await page.waitForTimeout(3 * 1000);

    await page.goto('https://aat3-lp-shopbase.onshopbase.com/admin/discounts');
    await page.waitForTimeout(5 * 1000);
    await page.click("//span[normalize-space()='Codes']");
    await page.click("//button[normalize-space()='Create discount']");
    await page.waitForTimeout(3 * 1000);
    await page.locator("//input[@placeholder='e.g. SUMMERSALE']").fill('OCG_2023_TALENT');
    await page.waitForTimeout(1 * 1000);
    await page.locator("//input[@placeholder='0' and @class = 's-input__inner']").fill('10');
    await page.waitForTimeout(1 * 1000);

    await page.click(`//label[3]//span[2]`);
    await page.waitForTimeout(2 * 1000);
    // await page.click(`//form//input[normalize-space()='specific_products']`);
    // await page.waitForTimeout(2* 1000);

    await page.locator("//input[@placeholder='Search products']").fill('iphone 14 Pro Max 128GB - linhphan01');
    await page.click("//div[@class='select-product-component s-mt16']//span[@class='s-flex s-flex--align-center'][normalize-space()='Browse']");
    await expect(page.locator('//div[@class="sbase-spinner"]')).toHaveCount(0); // đợi loading
    await page.click("//body/div[@id='app']/div[@class='unite-ui-frame vertical-screen']/main[@class='s-mb96 unite-ui-dashboard__main menu-expand']/div[@class='m-t-ex container']/div/div[@class='discount-detail-page']/div[@class='row']/div[@class='col-xs-12 col-sm-8']/form[@class='s-form']/div[@class='section s-mt24']/div[@class='section-body s-flex s-flex--vertical s-mt4']/div[@class='select-product-component s-mt16']/div[@class='s-modal is-active modal-select-product modal-select-item']/div[@class='s-modal-wrapper']/div[@class='s-animation-content s-modal-content']/div[@class='s-modal-body']/div[@class='item-list']/div[1]/div[1]/label[1]/span[1]");
    await page.waitForTimeout(3 * 1000);
    await page.click("//button[normalize-space()='Save']");
    await page.click("//button[normalize-space()='Save changes']");
    await page.waitForTimeout(1 * 1000);
    console.log("create discount code")

    // Add to cart
    await page.goto('https://aat3-lp-shopbase.onshopbase.com/products/iphone-14-pro-max-128gb-linhphan01');
    await page.waitForTimeout(3 * 1000);
    await page.click("//span[normalize-space()='Add to cart']");
    await page.click("//button[@name='checkout']");
    await page.waitForTimeout(5 * 1000);


    // Check apply discount code
    await page.locator(" //input[@placeholder='Enter your promotion code']").fill("OCG_2023_TALENT");
    await page.click("//button[normalize-space()='Apply']");
    await page.waitForTimeout(1 * 1000);
    const discountPrice = await page.locator("//span[@class='reduction-code']//span[@class='reduction-code__text']").textContent();
    console.log('add discount code');
    expect(discountPrice).toEqual('OCG_2023_TALENT');




    // Shipping information
    await page.locator("//input[@id='checkout_shipping_address_email']").fill("tuyetle+1@beeketing.net");
    await page.locator("//input[@id='checkout_shipping_address_last_name']").fill("linhphan");
    await page.locator("//input[@id='checkout_shipping_address_address_line1']").fill("US");
    await page.locator("//input[@id='checkout_shipping_address_city']").fill("HANOI");
    await page.locator("//input[@id='checkout_shipping_address_zip']").fill("10000");
    await page.locator("//input[@id='checkout_shipping_address_phone']").fill("012345687");
    await page.click("//span[normalize-space()='Keep me up-to-date on the order progress and exclusive offers via text messages']");
    await page.waitForTimeout(1 * 1000);
    await page.click("//button[normalize-space()='Continue to shipping method']");
    await page.click("//button[@class='s-button step__continue-button']");
    await page.waitForTimeout(1 * 1000);

    // Check out
    await page.locator('//div[@class="fieldset stripe-form test-gateway"]')
        .frameLocator("//div[@id='stripe-card-number']//iframe")
        .locator('//input[@placeholder="Card number"]')
        .fill("4242424242424242");
    await page.waitForTimeout(3 * 1000);

    await page.locator("//input[@placeholder='Cardholder name']").fill("linh phan");

    await page
        .locator("//div[@class='fieldset stripe-form test-gateway']")
        .frameLocator("//div[@id='stripe-card-expiry']//iframe")
        .locator("//input[@placeholder='MM/YY']")
        .fill("0424");

    await page
        .locator("//div[@class='fieldset stripe-form test-gateway']")
        .frameLocator("//div[@id='stripe-card-cvc']//iframe")
        .locator("//input[@placeholder='CVV']")
        .fill("111");

    await page.waitForTimeout(5 * 1000);

    // verify sp check out
    await page.click("//button[normalize-space()='Complete order']");
      const productName003 = await page.locator("//div[@class='os-header__heading']//h2[@class='os-header__title']").textContent();
    const total = await page.locator("//span[@class='payment-due__price']").textContent();
    await page.waitForTimeout(3 * 1000);
    expect(productName003).toEqual("Thank you!");
    expect(total?.trim()).toEqual("$96.99");
    console.log('check out success');
});


test('Discount Scheduled', async ({ page, context }) => {

    await page.goto('https://aat3-lp-shopbase.onshopbase.com/admin/');
    await page.waitForTimeout(2 * 1000);
    await page.locator("//input[@id='email']").fill('tuyetle+1@beeketing.net');
    await page.locator("//input[@id='password']").fill('123456');
    await page.click("//button[@type='submit']");
    console.log("login success");
    await page.waitForTimeout(5 * 1000);

    // await page.click("//span[normalize-space()='Discounts']");
    // await page.waitForTimeout(5 * 1000);
    // await page.click("//span[normalize-space()='Codes']"); 
    // await page.waitForTimeout(3 * 1000);

    // discount code
    await page.goto('https://aat3-lp-shopbase.onshopbase.com/admin/discounts/9999759389935');
    await page.waitForTimeout(5 * 1000);
    await page.click("//div[@class='s-date-editor s-input s-input--suffix s-date-editor--datetime']//input[@type='text']");
    await page.waitForTimeout(3 * 1000);
    await page.click("//span[normalize-space()='21']");
    await page.waitForTimeout(3 * 1000);
    await page.click("//span[normalize-space()='Confirm']");
    await page.waitForTimeout(1 * 1000);
    await page.click("//button[normalize-space()='Save changes']");
    await page.waitForTimeout(1 * 1000);
    console.log("discount code Scheduled")


    // Add to cart
    await page.goto('https://aat3-lp-shopbase.onshopbase.com/products/iphone-14-pro-max-128gb-linhphan01');
    await page.waitForTimeout(3 * 1000);
    await page.click("//span[normalize-space()='Add to cart']");
    await page.click("//button[@name='checkout']");
    await page.waitForTimeout(5 * 1000);


    // Check gia apply discount code
    await page.locator(" //input[@placeholder='Enter your promotion code']").fill("OCG_2023_TALENT");
    await page.click("//button[normalize-space()='Apply']");
    await page.waitForTimeout(1 * 1000);
       
    const applyCode = await page.locator("//span[@class='order-summary__emphasis']").textContent();
    expect(applyCode?.trim()).toEqual('$100.00');
    console.log('discount code not active');

});