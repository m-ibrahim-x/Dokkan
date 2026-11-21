
import { useState } from "react";
import { Search } from "lucide-react";
import ProductsFilter from "../../services/products/components/productsFilter";
import useProducts from "../../services/products/hooks/useProducts";
import ProductCard from "../../shared/ui/ProductCard";
import Loading from "../../shared/loading/loading";

const INITIAL_FILTERS = {
    search: "",
    category: "all",
    minPrice: "",
    maxPrice: "",
    sort: "",
};

const ProductsPage = () => {
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    const {
        products = [],
        initialLoading,
        isFetching,
        error,
    } = useProducts(filters);

    // Initial Page Load ONLY
    if (initialLoading) {
        return <Loading />;
    }

    const hasActiveFilters =
        Boolean(filters.search) ||
        filters.category !== "all" ||
        filters.minPrice !== "" ||
        filters.maxPrice !== "" ||
        Boolean(filters.sort);

    return (
        <main className="min-h-screen bg-bg-main py-8 sm:py-10 md:py-12 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">

                {/* SEARCH BAR */}
                <div className="relative w-full">
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-text-secondary">
                        <Search className="size-5" />
                    </div>

                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                search: e.target.value,
                            }))
                        }
                        placeholder="Search products..."
                        className="w-full rounded-2xl border border-border-main bg-card-bg py-3.5 pe-4 ps-11 text-sm text-text-primary placeholder:text-text-secondary shadow-xs transition-all focus:border-brand-active focus:outline-none focus:ring-1 focus:ring-brand-active sm:text-base"
                    />
                </div>

                {/* MAIN CONTENT: SIDEBAR + PRODUCTS GRID */}
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4 lg:gap-8">

                    {/* FILTER SIDEBAR */}
                    <aside className="w-full lg:col-span-1 lg:sticky lg:top-24">
                        <ProductsFilter
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </aside>

                    {/* PRODUCTS GRID */}
                    <section className="w-full lg:col-span-3">

                        {/* ERROR NOTIFICATION */}
                        {error && (
                            <div className="mb-4 rounded-2xl border border-status-danger/30 bg-status-danger/10 p-4 text-center text-sm font-medium text-status-danger">
                                {error}
                            </div>
                        )}

                        {/* LOADING WHEN FETCHING AND NO PRODUCTS ARE AVAILABLE */}
                        {isFetching && products.length === 0 ? (
                            <div className="flex min-h-[300px] items-center justify-center">
                                <Loading />
                            </div>
                        ) : products.length > 0 ? (
                            <div
                                className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 transition-opacity duration-200 ${
                                    isFetching
                                        ? "opacity-60 pointer-events-none"
                                        : "opacity-100"
                                }`}
                            >
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id || product._id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-border-main bg-card-bg p-8 text-center text-text-secondary">
                                <p className="text-base font-medium">
                                    No products found.
                                </p>

                                {hasActiveFilters && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFilters(INITIAL_FILTERS)
                                        }
                                        className="mt-3 text-sm font-semibold text-hero-accent hover:underline dark:text-brand-active"
                                    >
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
};

export default ProductsPage;
