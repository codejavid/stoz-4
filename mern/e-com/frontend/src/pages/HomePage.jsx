import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import HeroBanner from "../components/HeroBanner";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const { addToCart } = useCart();

  useEffect(() => {
    api
      .get("/products")
      .then(({ data }) => setProducts(data))
      .catch((err) => console.log("Error fetching products", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category).filter(Boolean))];
    return ["All", ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "All")
      result = result.filter((p) => p.category === activeCategory);
    if (search.trim())
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [products, activeCategory, search, sortBy]);

  return (
    <>
      <HeroBanner />

      <section id="shop" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium tracking-widest text-blue-500 uppercase">
              The collection
            </p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">Our products</h2>
          </div>
        </div>

        {/* Search + Sort */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
          </select>
        </div>

        {/* Category filters */}
        {!loading && categories.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse overflow-hidden rounded-xl">
                <div className="aspect-3/4 bg-gray-100" />
                <div className="p-4">
                  <div className="h-4 w-1/2 rounded bg-gray-100" />
                  <div className="mt-2 h-3 w-1/4 rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-gray-100 py-24 text-center">
            <p className="text-lg font-semibold text-gray-900">No products found</p>
            <p className="mt-2 text-sm text-gray-400">Try a different search or category.</p>
            <button
              type="button"
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-5 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <article
                key={product._id}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
              >
                <Link to={`/products/${product._id}`} className="block relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-3/4 w-full object-cover"
                  />
                  {product.stock === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                        Out of stock
                      </span>
                    </div>
                  )}
                </Link>
                <div className="p-4">
                  <p className="text-xs font-medium tracking-wider text-blue-500 uppercase">
                    {product.category}
                  </p>
                  <div className="mt-1 flex items-start justify-between gap-2">
                    <Link
                      to={`/products/${product._id}`}
                      className="font-semibold text-gray-900 hover:text-blue-600"
                    >
                      {product.name}
                    </Link>
                    <span className="shrink-0 text-sm font-semibold text-gray-900">
                      ${product.price}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">{product.description}</p>
                  <button
                    type="button"
                    disabled={product.stock === 0}
                    onClick={() => addToCart(product)}
                    className={`mt-3 w-full rounded-lg py-2.5 text-sm font-medium ${
                      product.stock > 0
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "cursor-not-allowed bg-gray-100 text-gray-400"
                    }`}
                  >
                    {product.stock > 0 ? "Add to bag" : "Out of stock"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default HomePage;
