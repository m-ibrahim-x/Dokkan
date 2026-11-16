
import { lazy } from "react";

// Home
export const HomePage = lazy(() =>
  import("../../pages/homePage")
);

// Products
export const ProductsPage = lazy(() =>
  import("../../pages/products/productsPage")
);

export const ProductDetailsPage = lazy(() =>
  import("../../pages/products/productDetailsPage")
);

// Authentication
export const RegisterPage = lazy(() =>
  import("../../pages/auth/registerPage")
);

export const VerifyOTPPage = lazy(() =>
  import("../../pages/auth/verifyOTPPage")
);

export const LoginPage = lazy(() =>
  import("../../pages/auth/loginPage")
);

export const ForgotPasswordPage = lazy(() =>
  import("../../pages/auth/forgotPasswordPage")
);

// Shopping
export const CartPage = lazy(() =>
  import("../../pages/cartPage")
);

export const WishlistPage = lazy(() =>
  import("../../pages/wishlistPage")
);

export const FavoritePage = lazy(() =>
  import("../../pages/favoritesPage")
);

// Checkout
export const CheckoutPage = lazy(() =>
  import("../../pages/checkout/checkoutPage")
);

export const PaymentPage = lazy(() =>
  import("../../pages/checkout/paymentPage")
);

export const OrderSuccessPage = lazy(() =>
  import("../../pages/checkout/orderSuccessPage")
);

// Profile
export const ProfilePage = lazy(() =>
  import("../../pages/profile/profilePage")
);

export const MyOrdersPage = lazy(() =>
  import("../../pages/profile/myOrdersPage")
);

export const OrderDetailsPage = lazy(() =>
  import("../../pages/profile/orderDetailsPage")
);
