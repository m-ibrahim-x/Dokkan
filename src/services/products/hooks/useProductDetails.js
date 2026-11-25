
import { useState, useEffect } from "react";
import { getSingleProduct } from "../api/productApi";

const useProductDetails = (productId) => {
    const [result, setResult] = useState({
        product: null,
        loading: Boolean(productId),
        error: null,
        productId: null,
    });

    useEffect(() => {
        if (!productId) return;

        const controller = new AbortController();

        const fetchProductDetails = async () => {
            try {
                const productData = await getSingleProduct(
                    productId,
                    controller.signal
                );

                setResult({
                    product: productData,
                    loading: false,
                    error: null,
                    productId,
                });
            } catch (err) {
                if (
                    err.name !== "CanceledError" &&
                    err.name !== "AbortError"
                ) {
                    setResult({
                        product: null,
                        loading: false,
                        error: err.message,
                        productId,
                    });
                }
            }
        };

        fetchProductDetails();

        return () => controller.abort();
    }, [productId]);

    const isCurrentProduct = result.productId === productId;

    return {
        product: isCurrentProduct ? result.product : null,
        loading: productId ? !isCurrentProduct || result.loading : false,
        error: isCurrentProduct ? result.error : null,
    };
};

export default useProductDetails;
