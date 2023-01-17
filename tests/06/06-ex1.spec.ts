import { test, expect } from "@playwright/test";

// Ex1 View sản phẩm ngoài storefront, verify các thông tin tạo là đúng
test('Verify product linhphan01test', async ({ page, context }) => {
  // Log in
  await page.goto('https://aat3-lp-shopbase.onshopbase.com/admin/');
  await page.waitForTimeout(2 * 1000);
  await page.locator("//input[@id='email']").fill('tuyetle+1@beeketing.net');
  await page.locator("//input[@id='password']").fill('123456');
  await page.click("//button[@type='submit']");
  console.log("login success");
  await page.waitForTimeout(5 * 1000);
  
  // Create product
  await page.click("//span[normalize-space()='Products']");
  await page.waitForTimeout(1 * 1000);
  await page.click("//span[normalize-space()='All products']");
  await page.waitForTimeout(1 * 1000);
  await page.click("//button[@class='s-button pull-right s-button is-primary m-l-sm is-default']");
  await page.waitForTimeout(3 * 1000);
  await page.locator("//input[@placeholder='Short Sleeve T-Shirt']").fill("iPhone 14 Pro Max 128GB - linhphan01");
  await page.waitForTimeout(1 * 1000);
  await page.locator("//input[@id='price']").fill("100");
  await page.waitForTimeout(1 * 1000);
  await page.click("//a[@class='pull-right']");
  await page.waitForTimeout(1 * 1000);
  await page.locator("//input[@id='option-name']").fill("Color");
  await page.locator("//input[@placeholder='Separate options with comma']").fill("Space black, Silver, Gold, Deep Purple");
  await page.waitForTimeout(2 * 1000);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1 * 1000);
  await page.click("//span[normalize-space()='Save product']");
  await page.waitForTimeout(2 * 1000);

  //Verify product name
  const [previewThemePage] = await Promise.all([
    context.waitForEvent("page"),
    await page.click("//span[normalize-space()='View']"),
  ]);
  await previewThemePage.waitForLoadState("networkidle");
  const productName001 = await previewThemePage.locator("//h1[@class='h4 d-block product__name mt0 mb12 product__name-product']").textContent();
  await previewThemePage.waitForTimeout(3 * 1000);
  console.log(productName001);
  expect(productName001).toEqual("iPhone 14 Pro Max 128GB - linhphan01");

  // await page.pause();
  // Verify Variants
  const optionLocators = await previewThemePage.locator(`//button[contains(@class, 'product__option')]`).all();
  const createOption = ['Space black', 'Silver', 'Gold', 'Deep Purple'];
  for (let i = 0; i < optionLocators.length; i++) {
    const optionText = await optionLocators[i].textContent();
    expect(optionText).toEqual(createOption[i]);
    console.log(optionText);
  };
});