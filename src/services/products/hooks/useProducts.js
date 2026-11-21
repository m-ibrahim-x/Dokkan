
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { searchProduct } from "../api/productApi";

const VALID_SORTS = [
    "price_asc",
    "price_desc",
    "rating",
    "popular",
    "oldest",
];

const useProducts = (filters = {}) => {
    const [products, setProducts] = useState([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    // Track whether the very first request has completed
    const isInitialMount = useRef(true);

    // Debounced Search
    const [debouncedSearch, setDebouncedSearch] = useState(
        (filters.search || "").trim()
    );

    useEffect(() => {
        const query = (filters.search || "").trim();

        // 700ms debounce while typing, 0ms when cleared
        const delay = query ? 700 : 0;

        const timer = setTimeout(() => {
        setDebouncedSearch(query);
        }, delay);

        return () => clearTimeout(timer);
    }, [filters.search]);

    // Price validation
    const rawMin = filters.minPrice;
    const rawMax = filters.maxPrice;

    const hasMin =
        rawMin !== "" &&
        rawMin !== null &&
        rawMin !== undefined &&
        !isNaN(Number(rawMin)) &&
        Number(rawMin) >= 0;

    const hasMax =
        rawMax !== "" &&
        rawMax !== null &&
        rawMax !== undefined &&
        !isNaN(Number(rawMax)) &&
        Number(rawMax) >= 0;

    const numMin = hasMin ? Number(rawMin) : null;
    const numMax = hasMax ? Number(rawMax) : null;

    const isPriceRangeInvalid =
        hasMin && hasMax && numMin > numMax;

    // Fetch Products
    useEffect(() => {
        if (isPriceRangeInvalid) {
        return;
        }

        const controller = new AbortController();
        let isCurrent = true;

        const fetchProducts = async () => {
        try {
            if (isInitialMount.current) {
            setInitialLoading(true);
            } else {
            setIsFetching(true);
            }

            setError(null);

            const params = {
            page: 1,
            limit: 100,
            };

            // Search parameter
            if (debouncedSearch) {
            params.search = debouncedSearch;
            }

            // Category parameter
            if (
            filters.category &&
            filters.category.toLowerCase() !== "all"
            ) {
            params.category = filters.category.toLowerCase();
            }

            // Price range parameters
            if (hasMin) {
            params.minPrice = numMin;
            }

            if (hasMax) {
            params.maxPrice = numMax;
            }

            // Sorting parameter
            if (
            filters.sort &&
            VALID_SORTS.includes(filters.sort)
            ) {
            params.sort = filters.sort;
            }

            const response = await searchProduct(params, {
            signal: controller.signal,
            });

            if (!isCurrent) return;

            const responseData = response.data;

            const fetchedProducts =
            responseData?.products ??
            (Array.isArray(responseData) ? responseData : []);

            setProducts(fetchedProducts);
        } catch (err) {
            // Ignore aborted requests
            if (
            axios.isCancel(err) ||
            err.name === "CanceledError" ||
            err.name === "AbortError"
            ) {
            return;
            }

            if (!isCurrent) return;

            setError(
            err.response?.data?.message ||
                err.message ||
                "Failed to fetch products"
            );
        } finally {
            if (isCurrent) {
            if (isInitialMount.current) {
                isInitialMount.current = false;
                setInitialLoading(false);
            }

            setIsFetching(false);
            }
        }
        };

        fetchProducts();

        return () => {
        isCurrent = false;
        controller.abort();
        };
    }, [
        debouncedSearch,
        filters.category,
        filters.minPrice,
        filters.maxPrice,
        filters.sort,
        isPriceRangeInvalid,
        hasMin,
        hasMax,
        numMin,
        numMax,
    ]);

    return {
        products,
        initialLoading: isPriceRangeInvalid ? false : initialLoading,
        loading: isPriceRangeInvalid ? false : initialLoading,
        isFetching: isPriceRangeInvalid ? false : isFetching,
        error: isPriceRangeInvalid
        ? "Minimum price cannot exceed maximum price"
        : error,
    };
};

export default useProducts;
