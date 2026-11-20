
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Shirt, House, Dumbbell, Heart, ShoppingBag, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";


const categoryIcons = {
  electronics: Cpu,
  fashion: Shirt,
  "home & living": House,
  sports: Dumbbell,
};

const CategoryCard = ({ category }) => {
  const Icon = categoryIcons[category.name.toLowerCase()] || ShoppingBag;

  return (
    <Link to={`/products?category=${category.slug}`} className="group flex min-h-40 flex-col items-center justify-center gap-3 rounded-2xl border border-border-main bg-card-bg p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-active hover:shadow-lg">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-active-bg text-text-primary transition-all duration-300 group-hover:bg-text-primary group-hover:text-bg-main">
        <Icon size={25} strokeWidth={2} />
      </div>

      <div>
        <h3 className="font-semibold text-text-primary transition-colors group-hover:text-brand-hover">{category.name}</h3>
        <p className="mt-1 text-xs text-text-secondary">{category.productCount} products</p>
      </div>
    </Link>
  );
};


const ProductCard = ({ product }) => {
  const { name, category, images, price, discountPrice, averageRating, numReviews, stock } = product;

  const image = images?.[0]?.url;
  const hasDiscount = discountPrice > 0 && discountPrice < price;
  const discount = hasDiscount ? Math.round(((price - discountPrice) / price) * 100) : 0;
  const inStock = stock > 0;
  const finalPrice = hasDiscount ? discountPrice : price;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border-main bg-card-bg p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-input-bg">
        {image && (
          <img src={image} alt={name} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
        )}

        <span className="absolute start-2 top-2 rounded-full bg-card-bg/95 px-3 py-1 text-xs font-semibold text-text-primary backdrop-blur-sm">{category}</span>

        {discount > 0 && (
          <span className="absolute start-2 top-9 rounded-full bg-status-danger px-3 py-1 text-xs font-semibold text-white">-{discount}%</span>
        )}

        <button type="button" aria-label={`Add ${name} to wishlist`} className="absolute end-2 top-2 flex size-9 items-center justify-center rounded-full bg-card-bg text-text-primary shadow-md transition-all duration-300 hover:bg-text-primary hover:text-bg-main">
          <Heart size={18} strokeWidth={2} />
        </button>

        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/45">
            <span className="rounded-full bg-card-bg px-4 py-2 text-sm font-semibold text-status-danger">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="min-h-12 line-clamp-2 text-sm font-semibold leading-6 text-text-primary" title={name}>{name}</h3>

        <div className="mt-1 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={14} className={index < Math.round(averageRating || 0) ? "fill-status-warning text-status-warning" : "fill-disabled text-disabled"} />
            ))}
          </div>
          <span className="text-xs text-text-secondary">({numReviews || 0})</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border-main pt-3">
          <span className="text-base font-bold text-text-primary">EGP {finalPrice.toFixed(2)}</span>
          {hasDiscount && <span className="text-xs text-text-secondary line-through">EGP {price.toFixed(2)}</span>}
        </div>

        <button type="button" disabled={!inStock} aria-label={`Add ${name} to cart`} className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-text-primary px-3 py-2 text-sm font-semibold text-bg-main transition-all duration-300 hover:bg-text-secondary disabled:cursor-not-allowed disabled:bg-disabled disabled:text-text-secondary">
          <ShoppingBag size={17} strokeWidth={2} />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
};

const ProductsSection = ({ products = [] , categories = [] }) => {
  return (
    <section className="bg-main py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:space-y-20 lg:px-8">

        {/* ==========================================
            CATEGORIES SECTION
        ========================================== */}

        <div>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">Shop by Category</h2>
              <p className="mt-2 text-sm text-text-secondary sm:text-base">Browse our wide range of categories</p>
            </div>

            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary transition-colors hover:text-brand-hover">
              View All
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => <CategoryCard key={category.id} category={category} />)}
          </div>
        </div>

        {/* ==========================================
            FEATURED PRODUCTS SECTION
        ========================================== */}
        <div>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-border-main bg-card-bg px-3 py-1.5 text-xs font-semibold text-text-primary">
                <Star size={13} />
                Curated Selection
              </span>

              <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                Featured{" "}
                <span className="bg-gradient-to-r from-hero-accent via-hero-accent-soft to-text-primary bg-clip-text text-transparent">Products</span>
              </h2>
            </div>

            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary transition-colors hover:text-brand-hover">
              View All
              <ArrowRight size={17} />
            </Link>
          </div>

          <Swiper
            modules={[Autoplay]}
            loop={products.length > 4}
            speed={5000}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="[&_.swiper-wrapper]:!ease-linear"
          >
            {products.map((product) => (
              <SwiperSlide key={product._id} className="h-auto">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
