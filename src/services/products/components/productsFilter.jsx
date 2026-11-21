
import { X } from "lucide-react";

const CATEGORIES = [
    { id: "all", label: "All" },
    { id: "electronics", label: "Electronics" },
    { id: "fashion", label: "Fashion" },
    { id: "phones", label: "Phones" },
];

const ProductsFilter = ({ filters, setFilters }) => {
    // Clear all filters simultaneously
    const handleClearAll = () => {
        setFilters({
            search: "",
            category: "all",
            minPrice: "",
            maxPrice: "",
            sort: "",
        });
    };

    // Remove only category filter while preserving other filters
    const handleRemoveCategory = () => {
        setFilters((prev) => ({
            ...prev,
            category: "all",
        }));
    };

    const hasActiveCategory =
        filters.category && filters.category !== "all";

    const activeCategoryLabel =
        CATEGORIES.find((c) => c.id === filters.category)?.label ||
        filters.category;

    const isPriceRangeInvalid =
        filters.minPrice !== "" &&
        filters.maxPrice !== "" &&
        Number(filters.minPrice) > Number(filters.maxPrice);

    return (
        <div className="w-full rounded-2xl border border-border-main bg-card-bg p-5 shadow-sm sm:rounded-3xl sm:p-6">

            {/* Active Category Filter Pill & Clear All */}
            {hasActiveCategory && (
                <div className="mb-5 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                        <span>{activeCategoryLabel.toLowerCase()}</span>

                        <button
                            type="button"
                            onClick={handleRemoveCategory}
                            aria-label="Remove category filter"
                            className="inline-flex size-3.5 items-center justify-center rounded-full hover:bg-blue-200/50 dark:hover:bg-blue-900/50"
                        >
                            <X className="size-3" />
                        </button>
                    </span>

                    <button
                        type="button"
                        onClick={handleClearAll}
                        className="text-xs font-semibold text-red-500 transition-colors hover:text-red-600 dark:text-red-400"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* Category Section */}
            <div>
                <h3 className="mb-3 text-sm font-bold text-text-primary sm:text-base">
                    Category
                </h3>

                <div className="space-y-2.5 text-sm text-text-secondary">
                    {CATEGORIES.map((cat) => {
                        const isChecked = filters.category === cat.id;

                        return (
                            <label
                                key={cat.id}
                                className="flex cursor-pointer items-center gap-3 transition-colors hover:text-text-primary"
                            >
                                <input
                                    type="radio"
                                    name="category"
                                    value={cat.id}
                                    checked={isChecked}
                                    onChange={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            category: cat.id,
                                        }))
                                    }
                                    className="size-4 shrink-0 accent-blue-600 cursor-pointer"
                                />

                                <span
                                    className={
                                        isChecked
                                            ? "font-semibold text-text-primary"
                                            : ""
                                    }
                                >
                                    {cat.label}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Price Range Section */}
            <div className="mt-6">
                <h3 className="mb-3 text-sm font-bold text-text-primary sm:text-base">
                    Price Range
                </h3>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    <input
                        type="number"
                        min="0"
                        placeholder="Min"
                        value={filters.minPrice}
                        onKeyDown={(e) => {
                            if (e.key === "-" || e.key === "e") {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const val = e.target.value;

                            if (val === "" || Number(val) >= 0) {
                                setFilters((prev) => ({
                                    ...prev,
                                    minPrice: val,
                                }));
                            }
                        }}
                        className="w-full rounded-xl border border-border-main bg-input-bg px-3 py-2 text-xs text-text-primary placeholder:text-text-secondary transition-all focus:border-brand-active focus:outline-none focus:ring-1 focus:ring-brand-active sm:text-sm"
                    />

                    <input
                        type="number"
                        min="0"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onKeyDown={(e) => {
                            if (e.key === "-" || e.key === "e") {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const val = e.target.value;

                            if (val === "" || Number(val) >= 0) {
                                setFilters((prev) => ({
                                    ...prev,
                                    maxPrice: val,
                                }));
                            }
                        }}
                        className="w-full rounded-xl border border-border-main bg-input-bg px-3 py-2 text-xs text-text-primary placeholder:text-text-secondary transition-all focus:border-brand-active focus:outline-none focus:ring-1 focus:ring-brand-active sm:text-sm"
                    />
                </div>

                {isPriceRangeInvalid && (
                    <p className="mt-2 text-xs text-status-danger">
                        Minimum price cannot exceed maximum price.
                    </p>
                )}
            </div>

            {/* Sort By Section */}
            <div className="mt-6">
                <h3 className="mb-3 text-sm font-bold text-text-primary sm:text-base">
                    Sort By
                </h3>

                <select
                    value={filters.sort}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            sort: e.target.value,
                        }))
                    }
                    className="w-full cursor-pointer rounded-xl border border-border-main bg-input-bg px-3 py-2.5 text-xs text-text-primary transition-all focus:border-brand-active focus:outline-none focus:ring-1 focus:ring-brand-active sm:text-sm"
                >
                    <option value="">Default</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="popular">Most Popular</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            {/* Clear All Filters Button */}
            <button
                type="button"
                onClick={handleClearAll}
                className="mt-6 w-full rounded-xl border border-border-main bg-card-bg py-2.5 px-4 text-xs font-semibold text-text-primary shadow-xs transition-all hover:border-brand-active hover:bg-input-bg sm:text-sm"
            >
                Clear All Filters
            </button>
        </div>
    );
};

export default ProductsFilter;
