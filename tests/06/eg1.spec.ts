import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://www.shopbase.com/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/ShopBase/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://hiendo2.sbprod.tk/products/lee-straight-jean');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });

test('add to cart 02', async ({ page }) => {
  await page.goto('https://hiendo2.sbprod.tk/products/lee-straight-jean');

  // Click add to cart.
  await page.click("//button[@id='add-to-cart']");

  await page.waitForTimeout(5 * 1000);
  console.log('add to cart success');

  // Get cart number
  const cartNumber = await page.locator('//span[@class="cart-number"]').textContent();
  console.log(cartNumber);

  // expect cart number is 01
  expect(cartNumber).toEqual("01");

  //  pause for 10s
  // await page.waitForTimeout(10 * 60 * 1000)
});

test('add to cart and cost', async ({ page }) => {
  await page.goto('https://hiendo2.sbprod.tk/collections/jeans/products/lee-straight-jean');

  await page.waitForTimeout(5 * 1000);
  // Click add to cart.
  await page.click("//button[@id='add-to-cart']");

  console.log('add to cart success');

  // Toi gio hang
  await page.goto('https://hiendo2.sbprod.tk/cart ');
  await page.waitForTimeout(5 * 1000);

  // Get cart number
  const cartNumber02 = await page.inputValue('//input[@class="quantity__num"]');
  console.log(cartNumber02);

  // get price
  const price = await page.locator('//p[@class="h5 product-cart__price"]').textContent();
  console.log(price);

  // expect cart number is 01
  expect(cartNumber02).toEqual('1');
  expect(price?.trim()).toEqual('$188.00')

  //  pause for 10s
  // await page.waitForTimeout(10 * 60 * 1000)
});



// Ex1 View sản phẩm ngoài storefront, verify các thông tin tạo là đúng
test('Verify product linhphan01', async ({ page }) => {

  
  await page.goto('https://aat3-lp-shopbase.onshopbase.com/admin/');
  await page.waitForTimeout(2 *1000);
  await page.locator("//input[@id='email']").fill('tuyetle+1@beeketing.net');
  await page.locator("//input[@id='password']").fill('123456');
  await page.click("//button[@type='submit']");
  console.log("login success");
  await page.waitForTimeout(5 *1000);




  await page.click("//span[normalize-space()='Products']");
  await page.waitForTimeout(1 *1000);
  await page.click("//span[normalize-space()='All products']");
  await page.waitForTimeout(1 *1000);
  await page.click("//button[@class='s-button pull-right s-button is-primary m-l-sm is-default']");
  await page.waitForTimeout(3 *1000);
  await page.locator("//input[@placeholder='Short Sleeve T-Shirt']").fill("iPhone 14 Pro Max 128GB - linhphan01");
  await page.click("//a[@class='pull-right']");
  await page.waitForTimeout(1 *1000);
  await page.locator("//input[@id='option-name']").fill("Color");
  await page.locator("//input[@placeholder='Separate options with comma']").fill("Space black, Silver, Gold, Deep Purple");
  await page.waitForTimeout(2 *1000);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1 *1000);
  await page.click("//span[normalize-space()='Save product']");
  await page.waitForTimeout(2 * 1000);

  await page.click("//span[normalize-space()='View']");
  await page.waitForTimeout(3 * 1000);
  //product name
  const productName = await page.locator("//div[@id='detail-contents']//h1[@class='h4 d-block product__name mt0 mb12 product__name-product']").textContent();
  await page.waitForTimeout(3 * 1000);
  console.log(productName);
  await expect(productName).toEqual("iPhone 14 Pro Max 128GB - linhphan01");
  

  
  const variants = await page.locator("//button[@class='product__option relative is-uppercase px12 py8 mr6 mb6 shape-sharp-t-l-b-r product__option--active']").textContent();
  await page.waitForTimeout(2 * 1000);
  console.log(variants);
  await expect(variants).toContain(['Space black', 'Silver' , 'Deep Purple', 'Gold']);


  // await page.click("//span[normalize-space()='Products']");
  // await page.waitForTimeout(1 *1000);
  // await page.goto('https://aat3-lp-shopbase.onshopbase.com/collections/all');
  // await page.waitForTimeout(5 * 1000);

  // const variants = await page.locator(`//button[contains(@class, 'product__option')]`);
  // await expect(variants).toHaveText(['Space black', 'Silver' , 'Deep Purple', 'Gold']);
  
});

// Ex 2
test('Verify product linhphan', async ({ page }) => {
  await page.goto('https://aat3-lp-shopbase.onshopbase.com/admin/');
  await page.waitForTimeout(2 *1000);
  await page.locator("//input[@id='email']").fill('tuyetle+1@beeketing.net');
  await page.locator("//input[@id='password']").fill('123456');
  await page.click("//button[@type='submit']");
  console.log("login success");
  await page.waitForTimeout(5 *1000);

  await page.click("//span[normalize-space()='Discounts']");
  await page.waitForTimeout(1 *1000);
  await page.click("//span[normalize-space()='Codes']");
  await page.waitForTimeout(1 *1000);
});

// Ex 2
test('Tạo manual collection Mobile phone', async ({ page }) => {

  // Tao collection
  await page.goto('https://aat3-lp-shopbase.onshopbase.com/admin/');
  await page.waitForTimeout(2 *1000);
  await page.locator("//input[@id='email']").fill('tuyetle+1@beeketing.net');
  await page.locator("//input[@id='password']").fill('123456');
  await page.click("//button[@type='submit']");
  console.log("login success");
  await page.waitForTimeout(5 *1000);

  await page.click("//span[normalize-space()='Products']");
  await page.waitForTimeout(1 *1000);
  await page.click("//span[normalize-space()='Collections']");
  await page.waitForTimeout(1 *1000);
  await page.click("//span[normalize-space()='Create collection']");
  await page.waitForTimeout(1 *1000);
  await page.locator("//input[@placeholder='e.g Summer collection, Under $100, Staff picks']").fill('Mobile phone');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1 *1000);
  await page.click("//div[@class='col-md-8 col-xs-12']//div[1]//label[1]//span[2]");
  await page.waitForTimeout(1 *1000);
  console.log("create collection success");

  // add product
  await page.goto('https://aat3-lp-shopbase.onshopbase.com/admin/products/1000000453624357');
  await page.waitForTimeout(2 *1000);
  await page.locator("//input[@placeholder='Search for collections']").fill('Mobile phone');
  await page.waitForTimeout(1 *1000);
  await page.click("//button[@class='btn btn-primary']");
  await page.waitForTimeout(1 *1000);
  console.log("add product success");

  // verify storefront
  await page.goto('https://aat3-lp-shopbase.onshopbase.com/collections/mobile-phone');
  await page.waitForTimeout(3 * 1000);
  const productName01 = await page.locator("//div[@class='collection-detail__product-details text-align-left']").textContent();
  await page.waitForTimeout(1 * 1000);
  console.log(productName01);
  await expect(productName01).toEqual("iPhone 14 Pro Max 128GB - linhphan01");

});