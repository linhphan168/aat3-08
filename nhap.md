/ tên file:
admin-page.page.ts
export class AdminPage{
page: Page
prodcuts: Locator
allProduct: Locator
createProduct: Locator
contructor(){
this.page = Page
this.products = this.page("//locator")
this.allProduct = this.page("//locator")
this.createProduct = this.page("//locator")
}
async gotoAdminPage() {
this.page.goto('url');
}
async redirect() {
      this.page.products.click()
this.page.waitTimeOut(3000)
	this.page.allProduct.click()
	this.page.createProduct.click()
}
//tên file : test.spect.ts
import {adminPage} from '/link of class'
test('tent test)'async ({ page, context }) {
const adminPage = new AdminPage(page);
admin.gotoAdminPage();
adminPage.redirect();
}