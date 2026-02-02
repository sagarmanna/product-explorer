import { useMemo, useState } from "react";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import CartDrawer from "../components/CartDrawer";
import { useProducts } from "../hooks/useProducts";

export default function Home() {
  const { products, categories, loading, error, refetch } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();

    return products.filter((p) => {
      const matchSearch = q ? p.title.toLowerCase().includes(q) : true;
      const matchCategory = category === "all" ? true : p.category === category;
      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        totalShown={filteredProducts.length}
        totalAll={products.length}
        onOpenCart={() => setCartOpen(true)}
      />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {loading && <Loader />}

      {!loading && error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="centerBox">No products found. Try another search.</div>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <ProductGrid products={filteredProducts} />
      )}
    </>
  );
}
