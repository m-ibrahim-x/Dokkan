import { Heart, ShoppingBag, Star } from "lucide-react";

export const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  className = "",
}) => {
  if (!product) return null;

  const {
    name = "",
    category = "",
    images = [],
    price = 0,
    discountPrice = 0,
    averageRating = 0,
    numReviews = 0,
    stock = 0,
    onViewDetails
  } = product;

  const image = images?.[0]?.url;
  const hasDiscount = discountPrice > 0 && discountPrice < price;
  const discount = hasDiscount ? Math.round(((price - discountPrice) / price) * 100) : 0;
  const inStock = stock > 0;
  const finalPrice = hasDiscount ? discountPrice : price;
  const categoryName = typeof category === "object" && category !== null ? category.name : category;

  return (
    <article
    onClick={() => onViewDetails?.(product)}
    onKeyDown={(e) => {
      if(e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onViewDetails?.(product);
      }
    }}
    role="link"
    className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-border-main bg-card-bg p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`.trim()}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-input-bg">
        {image && (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {categoryName && (
          <span className="absolute start-2 top-2 rounded-full bg-card-bg/95 px-3 py-1 text-xs font-semibold text-text-primary backdrop-blur-sm">
            {categoryName}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute start-2 top-9 rounded-full bg-status-danger px-3 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist?.(product);
          }}
          aria-label={`Add ${name} to wishlist`}
          className="absolute end-2 top-2 flex size-9 items-center justify-center rounded-full bg-card-bg text-text-primary shadow-md transition-all duration-300 hover:bg-text-primary hover:text-bg-main"
        >
          <Heart
            size={18}
            strokeWidth={2}
            className={isWishlisted ? "fill-status-danger text-status-danger" : ""}
          />
        </button>

        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/45">
            <span className="rounded-full bg-card-bg px-4 py-2 text-sm font-semibold text-status-danger">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3
          className="min-h-12 line-clamp-2 text-sm font-semibold leading-6 text-text-primary"
          title={name}
        >
          {name}
        </h3>

        <div className="mt-1 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={14}
                className={
                  index < Math.round(averageRating || 0)
                    ? "fill-status-warning text-status-warning"
                    : "fill-disabled text-disabled"
                }
              />
            ))}
          </div>
          <span className="text-xs text-text-secondary">({numReviews || 0})</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border-main pt-3">
          <span className="text-base font-bold text-text-primary">
            EGP {Number(finalPrice).toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-text-secondary line-through">
              EGP {Number(price).toFixed(2)}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={!inStock}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product);
          }}
          aria-label={`Add ${name} to cart`}
          className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-text-primary px-3 py-2 text-sm font-semibold text-bg-main transition-all duration-300 hover:bg-text-secondary disabled:cursor-not-allowed disabled:bg-disabled disabled:text-text-secondary"
        >
          <ShoppingBag size={17} strokeWidth={2} />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
