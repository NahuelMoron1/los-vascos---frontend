import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { SwiperComponent } from './main-menu/swiper/swiper.component';
import { ProductsComponent } from './main-menu/products/products.component';
import { BranchesComponent } from './main-menu/branches/branches.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductItemComponent } from './products-list/product-item/product-item.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryItemComponent } from './categories/category-item/category-item.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { EntryDataComponent } from './login/entry-data/entry-data.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { UserOptionsComponent } from './login/user-options/user-options.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CheckoutOptionsComponent } from './cart/cart-list/checkout-options/checkout-options.component';
import { CheckoutButtonsComponent } from './cart/cart-list/checkout-options/checkout-buttons/checkout-buttons.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShipmentComponent } from './checkout/shipment/shipment.component';
import { UserDataComponent } from './checkout/user-data/user-data.component';
import { PayComponent } from './checkout/user-data/pay/pay.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { MessageSuccessComponent } from './order-placed/message-success/message-success.component';
import { OrderButtonsComponent } from './order-placed/order-buttons/order-buttons.component';
import { OrderProgressComponent } from './order-progress/order-progress.component';
import { HasOrderComponent } from './has-order/has-order.component';
import { MessageErrorComponent } from './has-order/message-error/message-error.component';
import { OrderDetailComponent } from './order-placed/order-detail/order-detail.component';
import { ButtonsDetailComponent } from './order-placed/order-detail/buttons-detail/buttons-detail.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RegisterDataComponent } from './sign-up/register-data/register-data.component';
import { SendVoucherComponent } from './order-placed/send-voucher/send-voucher.component';
import { InfoSentComponent } from './order-placed/send-voucher/info-sent/info-sent.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { BrandsComponent } from './brands/brands.component';
import { BrandInfoComponent } from './brands/brand-info/brand-info.component';
import { BrandsDataComponent } from './brands/brands-data/brands-data.component';
import { UserCredentialsComponent } from './user-info/user-credentials/user-credentials.component';
import { OptionsUserComponent } from './user-info/user-credentials/options-user/options-user.component';
import { MyAccountComponent } from './user-info/user-credentials/my-account/my-account.component';
import { MyBoughtsComponent } from './user-info/user-credentials/my-boughts/my-boughts.component';
import { PrivacityComponent } from './user-info/user-credentials/privacity/privacity.component';
import { ShipmentDataComponent } from './user-info/user-credentials/shipment-data/shipment-data.component';
import { TechSupportComponent } from './user-info/user-credentials/tech-support/tech-support.component';
import { ShipmentInformationComponent } from './sign-up/shipment-information/shipment-information.component';
import { UserDetailsComponent } from './user-info/user-credentials/my-account/user-details/user-details.component';
import { PosterInfoComponent } from './poster-info/poster-info.component';
import { SelectBrandComponent } from './poster-info/select-brand/select-brand.component';
import { SearchBarComponent } from './poster-info/search-bar/search-bar.component';
import { OrdersInfoComponent } from './user-info/user-credentials/orders-info/orders-info.component';
import { OrdersInfoCompletedComponent } from './user-info/user-credentials/orders-info-completed/orders-info-completed.component';
import { ProductDataComponent } from './add-products/product-data/product-data.component';
import { AdminSupportComponent } from './user-info/user-credentials/admin-support/admin-support.component';
import { NoCartComponent } from './cart/no-cart/no-cart.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { DiscountDataComponent } from './discounts/discount-data/discount-data.component';
import { UserAccountComponent } from './user-info/user-credentials/user-account/user-account.component';
import { HeaderComponent } from './discounts/header/header.component';
import { DiscountButtonsComponent } from './discounts/discount-buttons/discount-buttons.component';
import { DiscountProductsComponent } from './discounts/discount-products/discount-products.component';
import { DiscountMessagesComponent } from './discounts/discount-messages/discount-messages.component';
import { NoOrdersComponent } from './user-info/user-credentials/my-boughts/no-orders/no-orders.component';
import { ChangePricesComponent } from './change-prices/change-prices.component';
import { DataPricesComponent } from './change-prices/data-prices/data-prices.component';
import { IncreaseComponent } from './change-prices/data-prices/increase/increase.component';
import { DecreaseComponent } from './change-prices/data-prices/decrease/decrease.component';
import { HeaderPricesComponent } from './change-prices/header-prices/header-prices.component';
import { ChangeEmailComponent } from './user-info/user-credentials/privacity/change-email/change-email.component';
import { ChangePasswordComponent } from './user-info/user-credentials/privacity/change-password/change-password.component';
import { ChangeDetailsComponent } from './user-info/user-credentials/privacity/change-details/change-details.component';
import { PayedProofComponent } from './payed-proof/payed-proof.component';
import { PayedDataComponent } from './payed-proof/payed-data/payed-data.component';
import { LoadingComponent } from './loading/loading.component';
import { NoProductsComponent } from './products-list/no-products/no-products.component';
import { NotAvailableComponent } from './not-available/not-available.component';
import { RecoverPasswordComponent } from './login/recover-password/recover-password.component';
import { CreateCouponComponent } from './create-coupon/create-coupon.component';
import { CouponDataComponent } from './create-coupon/coupon-data/coupon-data.component';
import { SearchCouponComponent } from './user-info/user-credentials/search-coupon/search-coupon.component';
import { SwalConfirmComponent } from './swal-confirm/swal-confirm.component';
import { ManteinanceComponent } from './manteinance/manteinance.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { CompanyComponent } from './company/company.component';
import { CompanyDataComponent } from './company/company-data/company-data.component';
import { CompanyHeaderComponent } from './company/company-header/company-header.component';
import { CompanyFooterComponent } from './company/company-footer/company-footer.component';
import { CompanyTextComponent } from './company/company-text/company-text.component';
import { ArticlesComponent } from './company/articles/articles.component';
import { ModifyOrderComponent } from './modify-order/modify-order.component';
import { OrderDataComponent } from './modify-order/order-data/order-data.component';
import { SelectUserComponent } from './checkout/select-user/select-user.component';
import { ListsComponent } from './company/lists/lists.component';
import { ProductAccesibilitiesComponent } from './add-products/product-accesibilities/product-accesibilities.component';
import { AddOptionComponent } from './add-products/product-accesibilities/add-option/add-option.component';
import { UpdateOptionComponent } from './add-products/product-accesibilities/update-option/update-option.component';
import { AddFeaturesComponent } from './add-products/product-accesibilities/add-features/add-features.component';
import { UpdatePriceComponent } from './add-products/product-accesibilities/update-price/update-price.component';
import { ModifyFeaturesComponent } from './add-products/product-accesibilities/modify-features/modify-features.component';
import { UpBarComponent } from './nav-bar-extended/up-bar/up-bar.component';
import { LoginButtonComponent } from './nav-bar-extended/up-bar/login-button/login-button.component';
import { NavBarExtendedComponent } from './nav-bar-extended/nav-bar-extended.component';
import { PresentationComponent } from './main-menu/presentation/presentation.component';
import { CategoriesMenuComponent } from './main-menu/categories-menu/categories-menu.component';
import { ParametersComponent } from './products-list/parameters/parameters.component';
import { PaginationComponent } from './products-list/pagination/pagination.component';
import { BrandDataComponent } from './add-products/brand-data/brand-data.component';
import { CategoryDataComponent } from './add-products/category-data/category-data.component';
import { BranchesMenuComponent } from './main-menu/branches-menu/branches-menu.component';
import { SubcategoriesComponent } from './add-products/category-data/subcategories/subcategories.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    NavBarComponent,
    FooterComponent,
    SwiperComponent,
    ProductsComponent,
    BranchesComponent,
    ProductsListComponent,
    ProductItemComponent,
    CategoriesComponent,
    CategoryItemComponent,
    CartComponent,
    LoginComponent,
    EntryDataComponent,
    AddProductsComponent,
    UserOptionsComponent,
    CartListComponent,
    CheckoutOptionsComponent,
    CheckoutButtonsComponent,
    CheckoutComponent,
    ShipmentComponent,
    UserDataComponent,
    PayComponent,
    OrderPlacedComponent,
    MessageSuccessComponent,
    OrderButtonsComponent,
    OrderProgressComponent,
    HasOrderComponent,
    MessageErrorComponent,
    OrderDetailComponent,
    ButtonsDetailComponent,
    SignUpComponent,
    RegisterDataComponent,
    SendVoucherComponent,
    InfoSentComponent,
    UserInfoComponent,
    BrandsComponent,
    BrandInfoComponent,
    BrandsDataComponent,
    UserCredentialsComponent,
    OptionsUserComponent,
    MyAccountComponent,
    MyBoughtsComponent,
    PrivacityComponent,
    ShipmentDataComponent,
    TechSupportComponent,
    ShipmentInformationComponent,
    UserDetailsComponent,
    PosterInfoComponent,
    SelectBrandComponent,
    SearchBarComponent,
    OrdersInfoComponent,
    OrdersInfoCompletedComponent,
    ProductDataComponent,
    AdminSupportComponent,
    NoCartComponent,
    DiscountsComponent,
    DiscountDataComponent,
    UserAccountComponent,
    HeaderComponent,
    DiscountButtonsComponent,
    DiscountProductsComponent,
    DiscountMessagesComponent,
    NoOrdersComponent,
    ChangePricesComponent,
    DataPricesComponent,
    IncreaseComponent,
    DecreaseComponent,
    HeaderPricesComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    ChangeDetailsComponent,
    PayedProofComponent,
    PayedDataComponent,
    LoadingComponent,
    NoProductsComponent,
    NotAvailableComponent,
    RecoverPasswordComponent,
    CreateCouponComponent,
    CouponDataComponent,
    SearchCouponComponent,
    SwalConfirmComponent,
    ManteinanceComponent,
    ModifyUserComponent,
    CompanyComponent,
    CompanyDataComponent,
    CompanyHeaderComponent,
    CompanyFooterComponent,
    CompanyTextComponent,
    ArticlesComponent,
    ModifyOrderComponent,
    OrderDataComponent,
    SelectUserComponent,
    ListsComponent,
    ProductAccesibilitiesComponent,
    AddOptionComponent,
    UpdateOptionComponent,
    AddFeaturesComponent,
    UpdatePriceComponent,
    ModifyFeaturesComponent,
    UpBarComponent,
    NavBarExtendedComponent,
    LoginButtonComponent,
    PresentationComponent,
    CategoriesMenuComponent,
    ParametersComponent,
    PaginationComponent,
    BrandDataComponent,
    CategoryDataComponent,
    BranchesMenuComponent,
    SubcategoriesComponent,
    ContactComponent,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
