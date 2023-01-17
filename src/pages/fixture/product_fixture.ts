import { test as base, expect  } from "@playwright/test";
import { Product } from "../type/type";
import { LoginPage } from "../authentication/login.page";
import { ProductPage } from "../dashboard/product.page";




const test = base.extend<{ productPage: ProductPage }>({
    productPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);

        await loginPage.login();
        await productPage.navigateToMenu("Products");

        await use(productPage);

        await productPage.deleteProduct("iPhone 14 Pro Max 128GB - linhphan");
    
    },
  
    // dashBoard: async ({ page }, use) => {
    //   await use(new DashBoard(page));
    // },
    
  });
  
  export { test, expect };
  

//   const test1 = base.extend<{ productPage: ProductPage }>({
//     productPage: async ({ page }, use) => {
//       // Login vao dashboard
//       const loginPage = new LoginPage(page);
//       const productPage = new ProductPage(page);
  
//       await loginPage.login();
  
//       await productPage.navigateToMenu("Products");
//       // use
//       await use(productPage);
  
//       // after - delete product
//       await productPage.page.goto(
//         "https://shopbase-truongnx.onshopbase.com/admin/"
//       );
//       await productPage.navigateToMenu("Products");
//       await productPage.page.waitForTimeout(5 * 1000);
//       await productPage.deleteProduct();
//       await productPage.page.waitForTimeout(5 * 1000);
//       console.log("Delete product successfully");
//     },
//   });
  
