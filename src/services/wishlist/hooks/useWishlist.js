import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    addToWishlist as apiAddToWishlist,
    removeFromWishlist as apiRemoveFromWishlist,
    getMyWishlist,
} from "../api/wishlistApi";

const useWishlist = (productId) => {
    const [result, setResult] = useState({
        loading: false,
        error: null,
        success: false,
        wishlist: [],
    });

    useEffect(() => {
        let isMounted = true;

        const fetchWishlist = async () => {
            try {
                const response = await getMyWishlist();
                const products = response?.data?.wishlist?.products || [];

                if (isMounted) {
                    setResult((prev) => ({
                        ...prev,
                        wishlist: products,
                        error: null,
                    }));
                }
            } catch (err) {
                if (isMounted) {
                    const errorMessage =
                        err.response?.data?.message ||
                        err.message ||
                        "Failed to fetch wishlist";

                    setResult((prev) => ({
                        ...prev,
                        error: errorMessage,
                    }));
                }
            }
        };

        fetchWishlist();

        return () => {
            isMounted = false;
        };
    }, []);

    const isWishlisted = Boolean(
        productId &&
        result.wishlist.some((item) => {
            const id = typeof item === "string" ? item : item?._id || item?.id;
            return id === productId;
        })
    );

    const addToWishlist = async (targetId = productId) => {
        const idToAdd = targetId || productId;
        if (!idToAdd) {
            const errorMessage = "Invalid product ID";

            setResult((prev) => ({
                ...prev,
                loading: false,
                error: errorMessage,
                success: false,
            }));

            toast.error(errorMessage);
            return false;
        }

        if (result.loading) return false;

        try {
            setResult((prev) => ({
                ...prev,
                loading: true,
                error: null,
                success: false,
            }));

            const response = await apiAddToWishlist(idToAdd);

            const updatedProducts =
                response?.data?.wishlist?.products ?? [
                    ...result.wishlist,
                    { _id: idToAdd },
                ];

            setResult({
                loading: false,
                error: null,
                success: true,
                wishlist: updatedProducts,
            });

            toast.success(
                response?.data?.message || "Product added to wishlist successfully"
            );

            return true;
        } catch (err) {
            if (err.response?.status === 400) {
                const message =
                    err.response?.data?.message || "Product already in wishlist";

                setResult((prev) => ({
                    ...prev,
                    loading: false,
                    error: message,
                    success: false,
                }));

                toast.error(message);
                return false;
            }

            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to add product to wishlist";

            setResult((prev) => ({
                ...prev,
                loading: false,
                error: errorMessage,
                success: false,
            }));

            toast.error(errorMessage);
            return false;
        }
    };

    const removeFromWishlist = async (targetId = productId) => {
        const idToRemove = targetId || productId;
        if (!idToRemove) {
            const errorMessage = "Invalid product ID";

            setResult((prev) => ({
                ...prev,
                loading: false,
                error: errorMessage,
                success: false,
            }));

            toast.error(errorMessage);
            return false;
        }

        if (result.loading) return false;

        try {
            setResult((prev) => ({
                ...prev,
                loading: true,
                error: null,
                success: false,
            }));

            const response = await apiRemoveFromWishlist(idToRemove);

            const updatedProducts =
                response?.data?.wishlist?.products ??
                result.wishlist.filter(
                    (item) =>
                        (typeof item === "string"
                            ? item
                            : item?._id || item?.id) !== idToRemove
                );

            setResult({
                loading: false,
                error: null,
                success: true,
                wishlist: updatedProducts,
            });

            toast.success(
                response?.data?.message ||
                    "Product removed from wishlist successfully"
            );

            return true;
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to remove product from wishlist";

            setResult((prev) => ({
                ...prev,
                loading: false,
                error: errorMessage,
                success: false,
            }));

            toast.error(errorMessage);
            return false;
        }
    };

    const toggleWishlist = async (targetId = productId) => {
        const id = targetId || productId;
        if (!id) return false;

        if (isWishlisted) {
            return await removeFromWishlist(id);
        } else {
            return await addToWishlist(id);
        }
    };

    return {
        ...result,
        isWishlisted,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
    };
};

export default useWishlist;
