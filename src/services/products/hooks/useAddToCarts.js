import { useState } from "react";
import { toast } from "sonner";
import { AddItemToCard } from "../../cart/api/cartsApi";

const useAddToCart = () => {
    const [result, setResult] = useState({
        loading: false,
        error: null,
        success: false,
        cart: null,
    });

    const addToCart = async (productId, quantity = 1) => {
        if (!productId || !Number.isInteger(quantity) || quantity < 1) {
            const errorMessage = "Invalid product ID or quantity";

            setResult({
                loading: false,
                error: errorMessage,
                success: false,
                cart: null,
            });

            toast.error(errorMessage);

            return false;
        }

        try {
            setResult((prev) => ({
                ...prev,
                loading: true,
                error: null,
                success: false,
            }));

            const response = await AddItemToCard({
                productId,
                quantity,
            });

            setResult({
                loading: false,
                error: null,
                success: true,
                cart: response?.data ?? null,
            });

            toast.success("Product added to cart successfully");

            return true;
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to add product to cart";

            setResult({
                loading: false,
                error: errorMessage,
                success: false,
                cart: null,
            });

            toast.error(errorMessage);

            return false;
        }
    };

    return {
        ...result,
        addToCart,
    };
};

export default useAddToCart;