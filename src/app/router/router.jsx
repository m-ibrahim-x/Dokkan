
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./protectedRoute";
import MainLayout from "../layout/mainLayout";
import Loading from "../../shared/loading/loading";

import {
    HomePage,
    ProductsPage,
    ProductDetailsPage,
    RegisterPage,
    VerifyOTPPage,
    LoginPage,
    ForgotPasswordPage,
    CartPage,
    WishlistPage,
    FavoritePage,
    CheckoutPage,
    PaymentPage,
    OrderSuccessPage,
    ProfilePage,
    MyOrdersPage,
    OrderDetailsPage
} from "./lazypages";

// Wrap lazy-loaded routes with Suspense
const withSuspense = (element) => (
    <Suspense fallback={<Loading />}>
        {element}
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [

            // Public Routes
            {
                index: true,
                element: withSuspense(<HomePage />),
            },
            {
                path: "/products",
                element: withSuspense(<ProductsPage />),
            },
            {
                path: "/products/:id",
                element: withSuspense(<ProductDetailsPage />),
            },
            {
                path: "/register",
                element: withSuspense(<RegisterPage />),
            },
            {
                path: "/verify-otp",
                element: withSuspense(<VerifyOTPPage />),
            },
            {
                path: "/login",
                element: withSuspense(<LoginPage />),
            },
            {
                path: "/forgot-password",
                element: withSuspense(<ForgotPasswordPage />),
            },
            {
                path: "/cart",
                element: withSuspense(<CartPage />),
            },
            {
                path: "/checkout",
                element: withSuspense(<CheckoutPage />),
            },
            {
                path: "/checkout/payment",
                element: withSuspense(<PaymentPage />),
            },
            {
                path: "/order-success",
                element: withSuspense(<OrderSuccessPage />),
            },
            {
                path: "/profile",
                element: withSuspense(<ProfilePage />),
            },
            {
                path: "/profile/orders",
                element: withSuspense(<MyOrdersPage />),
            },
            {
                path: "/profile/orders/:id",
                element: withSuspense(<OrderDetailsPage />),
            },

            // Protected Routes
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/wishlist",
                        element: withSuspense(<WishlistPage />),
                    },
                    {
                        path: "/favorite",
                        element: withSuspense(<FavoritePage />),
                    },
                ],
            },
        ],
    },
]);
