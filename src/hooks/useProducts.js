import { useEffect, useState } from "react";

/**
 * Fetches products and categories from FakeStore API.
 * Includes loading + error handling and a refetch function (Retry).
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError("");

      const [pRes, cRes] = await Promise.all([
        fetch("https://fakestoreapi.com/products"),
        fetch("https://fakestoreapi.com/products/categories"),
      ]);

      if (!pRes.ok) throw new Error("Failed to fetch products.");
      if (!cRes.ok) throw new Error("Failed to fetch categories.");

      const productsData = await pRes.json();
      const categoriesData = await cRes.json();

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { products, categories, loading, error, refetch: fetchAll };
}
