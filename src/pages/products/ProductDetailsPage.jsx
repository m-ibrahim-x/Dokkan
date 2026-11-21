import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

// Static mock data for UI display
const MOCK_PRODUCT = {
  id: "prod-001",
  name: "Apple Watch Series 10 - Nexis Edition",
  brand: "Apple",
  category: "Electronics",
  price: 399.0,
  originalPrice: 429.0,
  discountPercentage: 7,
  rating: 4.8,
  reviewCount: 128,
  stock: 24,
  inStock: true,
  description:
    "Experience the pinnacle of wearable technology with the Apple Watch Series 10 Nexis Edition. Engineered with an ultra-bright Always-On Retina display, advanced biometric health sensors, and all-day battery life, all encased in a precision-crafted aerospace-grade titanium frame.",
  images: [
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=80",
  ],
  reviews: [
    {
      id: "rev-1",
      userName: "Alexander Wright",
      userInitial: "AW",
      rating: 5,
      date: "November 14, 2026",
      comment:
        "The build quality is phenomenal. The titanium finish looks and feels premium, and battery life comfortably gets me through two full days of typical usage. Highly recommended!",
      verified: true,
    },
    {
      id: "rev-2",
      userName: "Nour El-Din",
      userInitial: "NE",
      rating: 5,
      date: "November 10, 2026",
      comment:
        "Fast shipping and authentic product. The display is noticeably brighter under direct sunlight compared to previous generations. Super smooth experience with Dokkan.",
      verified: true,
    },
    {
      id: "rev-3",
      userName: "Sarah Jenkins",
      userInitial: "SJ",
      rating: 4,
      date: "November 03, 2026",
      comment:
        "Great smartwatch overall. Health tracking sensors are exceptionally accurate during workouts. Only minor drawback is that charging cable could be a bit longer.",
      verified: true,
    },
    {
      id: "rev-4",
      userName: "Karim Mansour",
      userInitial: "KM",
      rating: 5,
      date: "October 28, 2026",
      comment:
        "Absolutely worth every penny. The Nexis Edition strap is soft on the wrist and doesn't cause any irritation. Best smartwatch I've owned so far.",
      verified: true,
    },
  ],
};

const ProductDetailsPage = () => {
  // Visual state for active thumbnail display
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-bg-main py-6 sm:py-8 md:py-10 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* =========================================================
            SECTION 1: BREADCRUMB NAVIGATION
        ========================================================= */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-text-secondary">
            <li>
              <Link
                to="/"
                className="transition-colors hover:text-text-primary"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} className="text-text-secondary/60" />
            </li>
            <li>
              <Link
                to="/products"
                className="transition-colors hover:text-text-primary"
              >
                Shop
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} className="text-text-secondary/60" />
            </li>
            <li className="font-semibold text-text-primary truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {MOCK_PRODUCT.name}
            </li>
          </ol>
        </nav>

        {/* =========================================================
            SECTION 2: MAIN PRODUCT INFORMATION (2-COLUMN LAYOUT)
        ========================================================= */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* -------------------------------------------------------
              LEFT COLUMN: PRODUCT IMAGES
          -------------------------------------------------------- */}
          <div className="space-y-4">
            {/* Main Display Image */}
            <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-3xl border border-border-main bg-card-bg p-3 sm:p-4 shadow-sm">
              <div className="relative size-full overflow-hidden rounded-2xl bg-input-bg">
                <img
                  src={MOCK_PRODUCT.images[selectedImageIndex]}
                  alt={MOCK_PRODUCT.name}
                  className="size-full object-cover transition-transform duration-500 hover:scale-105"
                />

                {/* Discount Badge */}
                {MOCK_PRODUCT.discountPercentage > 0 && (
                  <span className="absolute start-3 top-3 rounded-full bg-status-danger px-3 py-1 text-xs font-bold text-white shadow-sm">
                    -{MOCK_PRODUCT.discountPercentage}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {MOCK_PRODUCT.images.map((image, index) => {
                const isSelected = selectedImageIndex === index;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`View image ${index + 1}`}
                    className={`relative size-18 sm:size-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-brand-active shadow-md opacity-100 ring-2 ring-brand-active/20"
                        : "border-border-main bg-card-bg opacity-70 hover:opacity-100 hover:border-border-main"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="size-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------------
              RIGHT COLUMN: PRODUCT DETAILS & ACTIONS
          -------------------------------------------------------- */}
          <div className="flex flex-col gap-5 rounded-3xl border border-border-main bg-card-bg p-6 sm:p-8 shadow-sm">
            {/* 1. Brand and Category Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-input-bg px-3.5 py-1 text-xs font-semibold text-text-secondary">
                {MOCK_PRODUCT.brand}
              </span>
              <span className="rounded-full border border-border-main bg-card-bg px-3.5 py-1 text-xs font-semibold text-text-primary">
                {MOCK_PRODUCT.category}
              </span>
              {MOCK_PRODUCT.inStock ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-status-success/30 bg-status-success/10 px-3.5 py-1 text-xs font-semibold text-status-success">
                  <span className="size-1.5 rounded-full bg-status-success" />
                  In Stock ({MOCK_PRODUCT.stock} available)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-status-danger/30 bg-status-danger/10 px-3.5 py-1 text-xs font-semibold text-status-danger">
                  Out of Stock
                </span>
              )}
            </div>

            {/* 2. Product Name */}
            <h1 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl lg:text-4xl leading-tight">
              {MOCK_PRODUCT.name}
            </h1>

            {/* 3. Star Rating and Reviews Count */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= Math.round(MOCK_PRODUCT.rating)
                        ? "fill-status-warning text-status-warning"
                        : "fill-disabled text-disabled"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-text-primary">
                {MOCK_PRODUCT.rating}
              </span>
              <span className="text-xs text-text-secondary">
                ({MOCK_PRODUCT.reviewCount} customer reviews)
              </span>
            </div>

            {/* 4, 5, 6. Price, Original Price, Discount */}
            <div className="flex flex-wrap items-baseline gap-3 border-y border-border-main py-4">
              <span className="text-3xl font-extrabold text-text-primary">
                EGP {MOCK_PRODUCT.price.toFixed(2)}
              </span>
              {MOCK_PRODUCT.originalPrice > MOCK_PRODUCT.price && (
                <span className="text-base font-medium text-text-secondary line-through">
                  EGP {MOCK_PRODUCT.originalPrice.toFixed(2)}
                </span>
              )}
              {MOCK_PRODUCT.discountPercentage > 0 && (
                <span className="rounded-full bg-status-danger px-2.5 py-0.5 text-xs font-bold text-white">
                  -{MOCK_PRODUCT.discountPercentage}%
                </span>
              )}
            </div>

            {/* 7, 8, 9, 10. Quantity Selector, Add to Cart, Wishlist */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between rounded-xl border border-border-main bg-input-bg p-1 sm:w-36">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="flex size-9 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-card-bg cursor-pointer"
                >
                  <Minus size={15} />
                </button>
                <span className="px-3 text-sm font-bold text-text-primary">
                  1
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  className="flex size-9 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-card-bg cursor-pointer"
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-text-primary px-6 py-3.5 text-sm font-bold text-bg-main shadow-md transition-all duration-300 hover:bg-text-secondary cursor-pointer"
              >
                <ShoppingBag size={18} strokeWidth={2.2} />
                <span>Add to Cart</span>
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                aria-label="Add to wishlist"
                className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border-main bg-card-bg text-text-primary shadow-xs transition-all duration-300 hover:border-brand-active hover:text-status-danger cursor-pointer self-center sm:self-auto"
              >
                <Heart size={20} strokeWidth={2} />
              </button>
            </div>

            {/* 11. Product Description */}
            <div className="space-y-2 border-t border-border-main pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Product Description
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                {MOCK_PRODUCT.description}
              </p>
            </div>

            {/* Store Perks / Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-border-main pt-5">
              <div className="flex items-center gap-2.5 text-xs text-text-secondary">
                <Truck size={17} className="shrink-0 text-hero-accent dark:text-brand-active" />
                <span>Fast & Free Delivery</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-text-secondary">
                <ShieldCheck size={17} className="shrink-0 text-hero-accent dark:text-brand-active" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-text-secondary">
                <RotateCcw size={17} className="shrink-0 text-hero-accent dark:text-brand-active" />
                <span>30-Day Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 3: PRODUCT REVIEWS
        ========================================================= */}
        <section className="space-y-6 pt-4">
          {/* Section Header with Overview Card */}
          <div className="rounded-3xl border border-border-main bg-card-bg p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-main pb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                  Customer Reviews
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Real feedback from verified purchasers
                </p>
              </div>

              {/* Average Rating Summary */}
              <div className="flex items-center gap-3.5 rounded-2xl bg-input-bg px-4 py-3 sm:px-5">
                <span className="text-3xl font-black text-text-primary">
                  {MOCK_PRODUCT.rating}
                </span>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={15}
                        className={
                          star <= Math.round(MOCK_PRODUCT.rating)
                            ? "fill-status-warning text-status-warning"
                            : "fill-disabled text-disabled"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-text-secondary">
                    Based on {MOCK_PRODUCT.reviewCount} reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Individual Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-6">
              {MOCK_PRODUCT.reviews.map((rev) => (
                <article
                  key={rev.id}
                  className="flex flex-col justify-between rounded-2xl border border-border-main bg-bg-main/50 p-5 shadow-xs transition-all duration-300 hover:border-brand-active/50 hover:bg-bg-main/80"
                >
                  <div className="space-y-3">
                    {/* User and Date Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-9 items-center justify-center rounded-full bg-input-bg font-bold text-xs text-text-primary">
                          {rev.userInitial}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-text-primary">
                              {rev.userName}
                            </span>
                            {rev.verified && (
                              <CheckCircle2
                                size={14}
                                className="text-status-success"
                                title="Verified Purchase"
                              />
                            )}
                          </div>
                          <span className="text-[11px] text-text-secondary">
                            Verified Purchase
                          </span>
                        </div>
                      </div>

                      <time className="text-xs text-text-secondary">
                        {rev.date}
                      </time>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={13}
                          className={
                            star <= rev.rating
                              ? "fill-status-warning text-status-warning"
                              : "fill-disabled text-disabled"
                          }
                        />
                      ))}
                    </div>

                    {/* Review Comment */}
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {rev.comment}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
