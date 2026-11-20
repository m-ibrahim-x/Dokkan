
import { useEffect, useState } from "react";
import { getAllProducts } from "../../products/api/productApi";

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);

            const firstResponse = await getAllProducts({ page: 1, limit: 100 });
            const { products, totalPages } = firstResponse.data;

            let allProducts = [...products];

            for (let page = 2; page <= totalPages; page++) {
            const response = await getAllProducts({ page, limit: 100 });
            allProducts = [...allProducts, ...response.data.products];
            }

            const categoryMap = allProducts.reduce((acc, product) => {
            const category = product.category;

            if (category) {
                acc[category] = (acc[category] || 0) + 1;
            }

            return acc;
            }, {});

            const formattedCategories = Object.entries(categoryMap).map(([name, productCount]) => ({
            id: name,
            name,
            slug: name.toLowerCase().replace(/\s+/g, "-"),
            productCount,
            }));

            setCategories(formattedCategories);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to fetch categories");
        } finally {
            setLoading(false);
        }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};

export default useCategories;
