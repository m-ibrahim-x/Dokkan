
import { useEffect, useState } from "react";
import { getAllProducts } from "../../products/api/productApi";

const useFeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getAllProducts({
                page: 1,
                limit: 100
            });

            const featuredProducts = response.data.products.filter(
                (product) => product.featured === true
            );
            setProducts(featuredProducts);
        } catch (err) {
            setError(
            err.response?.data?.message ||
            err.message ||
            "Failed to fetch featured products"
            );
        } finally {
            setLoading(false);
        }
        };

        fetchFeaturedProducts();
    }, []);

    return {
        products,
        loading,
        error,
    };
};

export default useFeaturedProducts;
