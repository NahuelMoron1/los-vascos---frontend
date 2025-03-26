import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ProductItemComponent } from './products-list/product-item/product-item.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { loggedGuard } from './guards/logged.guard';
import { adminGuard } from './guards/admin.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { checkoutGuard } from './guards/checkout.guard';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { HasOrderComponent } from './has-order/has-order.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SendVoucherComponent } from './order-placed/send-voucher/send-voucher.component';
import { BrandsComponent } from './brands/brands.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ShipmentInformationComponent } from './sign-up/shipment-information/shipment-information.component';
import { userdataGuard } from './guards/userdata.guard';
import { loginGuard } from './guards/login.guard';
import { DiscountsComponent } from './discounts/discounts.component';
import { ChangePricesComponent } from './change-prices/change-prices.component';
import { PayedProofComponent } from './payed-proof/payed-proof.component';
import { RecoverPasswordComponent } from './login/recover-password/recover-password.component';
import { CreateCouponComponent } from './create-coupon/create-coupon.component';
import { ManteinanceComponent } from './manteinance/manteinance.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { CompanyComponent } from './company/company.component';
import { ModifyOrderComponent } from './modify-order/modify-order.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
  },
  {
    path: 'products',
    component: ProductsListComponent,
  },
  {
    path: 'products/:id',
    component: ProductItemComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'categories/:category',
    component: ProductsListComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loggedGuard],
  },
  {
    path: 'add/product',
    component: AddProductsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'modify/product/:id',
    component: AddProductsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [checkoutGuard],
  },
  {
    path: 'checkout/:id',
    component: OrderPlacedComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'checkout/amount/exceeded',
    component: HasOrderComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'admin/signup',
    component: SignUpComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'login/recover',
    component: RecoverPasswordComponent,
    ///canActivate: [loggedGuard]
  },
  {
    path: 'admin/signup/shipmentData/:id',
    component: ShipmentInformationComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'voucher',
    component: SendVoucherComponent,
  },
  {
    path: 'brands',
    component: BrandsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'products/brands/:brand',
    component: ProductsListComponent,
  },
  {
    path: 'categories/:category/brands/:brand',
    component: ProductsListComponent,
  },
  {
    path: 'categories/:category/subcategories/:subcategory/brands/:brand',
    component: ProductsListComponent,
  },
  {
    path: 'categories/:category/subcategories/:subcategory',
    component: ProductsListComponent,
  },
  {
    path: 'user',
    component: UserInfoComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'signup/shipmentdata/:id',
    component: ShipmentInformationComponent,
    canActivate: [loggedGuard, userdataGuard],
  },
  {
    path: 'products/set/discounts',
    component: DiscountsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'products/modify/prices',
    component: ChangePricesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'checkout/id/proofment',
    component: PayedProofComponent,
  },
  {
    path: 'coupons',
    component: CreateCouponComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'coupons/:id',
    component: CreateCouponComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'maintenance',
    component: ManteinanceComponent,
  },
  {
    path: 'user/:id',
    component: ModifyUserComponent,
    canActivate: [adminGuard],
  },
  /*{
    path: 'company',
    component: CompanyComponent,
  },*/
  {
    path: 'modify/order/:orderID',
    component: ModifyOrderComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'add/category',
    component: AddProductsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'modify/category/:id',
    component: AddProductsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'add/brand',
    component: AddProductsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'modify/brand/:id',
    component: AddProductsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'contactus',
    component: ContactComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
