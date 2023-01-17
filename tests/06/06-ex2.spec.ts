import { test, expect } from "@playwright/test";

// Ex 2 Tạo manual collection Mobile phone12-1
test('Tạo manual collection Mobile phone12-1', async ({ page, context }) => {

    // Tao collection
    await page.goto('https://aat3-lp-shopbase.onshopbase.com/admin/');
    await page.waitForTimeout(2 * 1000);
    await page.locator("//input[@id='email']").fill('tuyetle+1@beeketing.net');
    await page.locator("//input[@id='password']").fill('123456');
    await page.click("//button[@type='submit']");
    console.log("login success");
    await page.waitForTimeout(5 * 1000);

    await page.click("//span[normalize-space()='Products']");
    await page.waitForTimeout(1 * 1000);
    await page.click("//span[normalize-space()='Collections']");
    await page.waitForTimeout(1 * 1000);
    await page.click("//span[normalize-space()='Create collection']");
    await page.waitForTimeout(1 * 1000);
    await page.locator("//input[@placeholder='e.g Summer collection, Under $100, Staff picks']").fill('Mobile phone');
    await page.waitForTimeout(1 * 1000);
    await page.click("//div[@class='col-md-8 col-xs-12']//div[1]//label[1]//span[1]");
    await page.waitForTimeout(1 * 1000);
    await page.click("//span[normalize-space()='Save']");
    await page.waitForTimeout(5 * 1000);
    console.log("create collection success");
    await page.waitForTimeout(1 * 1000);

    // add product
    await page.click("//button[normalize-space()='Add product']");
    await page.waitForTimeout(1 * 1000);
    await page.locator("//input[@placeholder='Search for product']").type('iPhone 14 Pro Max 128GB - Linh Phan', { delay: 100 });
    await page.waitForTimeout(5 * 1000);
    await page.click("//div[@class='item-list']//div[1]//div[1]//label[1]//span[1]");
    await page.waitForTimeout(3 * 1000); 6
    await page.click("//div[contains(@class,'s-modal-footer')]//span[contains(@class,'s-flex s-flex--align-center')][normalize-space()='Save']");
    await page.waitForTimeout(3 * 1000);
    console.log('add product success')

    // verify sp da add
    const [previewThemePage] = await Promise.all([
        context.waitForEvent("page"),
        await page.click("//span[normalize-space()='View']"),
    ]);
    await previewThemePage.waitForLoadState("networkidle");
    await page.waitForTimeout(3 * 1000);
    const productName002 = await previewThemePage.locator("//span[@class='title d-block cl-black']").textContent();
    await previewThemePage.waitForTimeout(3 * 1000);
    console.log(productName002);
    expect(productName002).toEqual("iPhone 14 Pro Max 128GB - Linh Phan");
});