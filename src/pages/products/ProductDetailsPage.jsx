import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import useProductDetails from "../../services/products/hooks/useProductDetails";
import useAddToCart from "../../services/products/hooks/useAddToCarts";
import useWishlist from "../../services/wishlist/hooks/useWishlist";
import Loading from "../../shared/loading/loading";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { product, loading, error } = useProductDetails(id);
  const { addToCart, loading: addingToCart } = useAddToCart();
  const {
    isWishlisted,
    loading: wishlistLoading,
    toggleWishlist,
  } = useWishlist(product?._id || id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-bg-main py-12">
        <Loading />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-bg-main px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-status-danger/30 bg-card-bg p-8 text-center shadow-sm">
          <p className="text-base font-semibold text-status-danger">{error}</p>
          <Link
            to="/products"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-text-primary px-4 py-2 text-sm font-semibold text-bg-main transition-colors hover:bg-text-secondary"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-bg-main px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-border-main bg-card-bg p-8 text-center shadow-sm">
          <p className="text-base font-semibold text-text-secondary">Product not found</p>
          <Link
            to="/products"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-text-primary px-4 py-2 text-sm font-semibold text-bg-main transition-colors hover:bg-text-secondary"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  // Stock availability
  const isAvailable = product.stock > 0;

  // Simple quantity controls
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!product || !isAvailable || addingToCart) return;

    addToCart(product._id, quantity);
  };

  const handleToggleWishlist = () => {
    if (!product || !isAvailable || wishlistLoading) return;

    toggleWishlist(product._id || id);
  };
  const images = product.images || [];
  const currentImage = images[selectedImageIndex]?.url || images[selectedImageIndex];
  const brandName = typeof product.brand === "object" ? product.brand?.name : product.brand;
  const categoryName = typeof product.category === "object" ? product.category?.name : product.category;

  return (
    <main className="min-h-screen bg-bg-main py-8 transition-colors duration-300">
      <div className="mx-auto mb-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* Product Images */}
        <section className="space-y-4" aria-label="Product images">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border-main bg-card-bg p-3 shadow-sm">
            {currentImage ? (
              <img
                src={currentImage}
                alt={product.name}
                className="size-full rounded-2xl object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center rounded-2xl bg-input-bg text-sm text-text-secondary">
                No image available
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, index) => {
                const imgUrl = img?.url || img;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`View product image ${index + 1}`}
                    className={`size-20 shrink-0 overflow-hidden rounded-xl border-2 transition cursor-pointer ${
                      selectedImageIndex === index
                        ? "border-brand-active opacity-100"
                        : "border-border-main opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt=""
                      className="size-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Product Information */}
        <section className="flex flex-col gap-5 rounded-3xl border border-border-main bg-card-bg p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            {brandName && (
              <span className="rounded-full bg-input-bg px-3.5 py-1 text-xs font-semibold text-text-secondary">
                {brandName}
              </span>
            )}

            {categoryName && (
              <span className="rounded-full border border-border-main px-3.5 py-1 text-xs font-semibold text-text-primary">
                {categoryName}
              </span>
            )}

            <span
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                isAvailable
                  ? "bg-status-success/10 text-status-success"
                  : "bg-status-danger/10 text-status-danger"
              }`}
            >
              {isAvailable ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= Math.round(product.averageRating || 0)
                      ? "fill-status-warning text-status-warning"
                      : "fill-disabled text-disabled"
                  }
                />
              ))}
            </div>

            <span className="text-sm font-bold text-text-primary tabular-nums">
              {product.averageRating || 0}
            </span>

            <span className="text-xs text-text-secondary">
              ({product.numReviews || 0} reviews)
            </span>
          </div>

          {/* Pricing */}
          <div className="flex flex-wrap items-baseline gap-3 border-y border-border-main py-4">
            <span className="text-3xl font-extrabold text-text-primary tabular-nums">
              EGP {product.discountPrice ? Number(product.discountPrice).toFixed(2) : Number(product.price || 0).toFixed(2)}
            </span>

            {product.discountPrice && product.discountPrice < product.price && (
              <span className="text-base font-medium text-text-secondary line-through tabular-nums">
                EGP {Number(product.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Quantity, Add to Cart, and Wishlist Controls */}
          <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
            {/* Quantity Counter */}
            <div className="flex items-center justify-between rounded-xl border border-border-main bg-input-bg p-1 sm:w-36">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={!isAvailable || quantity <= 1}
                aria-label="Decrease quantity"
                className="flex size-9 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-card-bg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Minus size={15} />
              </button>

              <span className="px-3 text-sm font-bold text-text-primary tabular-nums">
                {quantity}
              </span>

              <button
                type="button"
                onClick={handleIncrease}
                disabled={!isAvailable || quantity >= product.stock}
                aria-label="Increase quantity"
                className="flex size-9 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-card-bg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus size={15} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!isAvailable || addingToCart}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-text-primary px-6 py-3.5 text-sm font-bold text-bg-main shadow-md transition-all duration-300 hover:bg-text-secondary disabled:cursor-not-allowed disabled:bg-disabled disabled:text-text-secondary cursor-pointer"
            >
              {addingToCart ? (
                <span>Adding to Cart...</span>
              ) : (
                <>
                  <ShoppingBag size={18} strokeWidth={2.2} />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              disabled={!isAvailable || wishlistLoading}
              onClick={handleToggleWishlist}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="flex size-12 shrink-0 items-center justify-center self-center rounded-xl border border-border-main bg-card-bg text-text-primary shadow-xs transition-all duration-300 hover:border-brand-active hover:text-status-danger cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto"
            >
              <Heart
                size={20}
                strokeWidth={2}
                className={isWishlisted ? "fill-status-danger text-status-danger" : ""}
              />
            </button>
          </div>

          {/* Description */}
          {product.description && (
            <div className="space-y-2 border-t border-border-main pt-4">
              <h2 className="text-sm font-bold text-text-primary">
                Product Description
              </h2>

              <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                {product.description}
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
