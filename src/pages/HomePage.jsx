
import HeroSection from "../services/home/components/heroSection";
import HowSection from "../services/home/components/howSection";
import ProductsSection from "../services/home/components/productsSection";
import useFeaturedProducts from "../services/home/hooks/useFeaturedProducts";
import useCategories from "../services/home/hooks/useCategories";
import Loading from "../shared/loading/loading";

const HomePage = () => {
  const { products, loading: productsLoading, error: productsError } = useFeaturedProducts();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  if (productsLoading || categoriesLoading) return <Loading />;
  if (productsError || categoriesError) return <div>Error: {productsError || categoriesError}</div>;

  return (
    <div className="space-y-12">
      <HeroSection />
      <ProductsSection products={products} categories={categories} />
      <HowSection />
    </div>
  );
};

export default HomePage;
