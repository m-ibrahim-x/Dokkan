import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Shirt, House, Dumbbell, ShoppingBag, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ProductCard from "../../../shared/ui/ProductCard";


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
              <SwiperSlide key={product._id || product.id} className="h-auto">
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
