import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import HeroBanner from "../components/HeroBanner";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeroBanner />

      <section id="shop" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] text-muted uppercase">
              The collection
            </p>
            <h2 className="font-display mt-2 text-4xl md:text-5xl">Our products</h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-muted md:block">
            Pieces selected for silhouette, material, and the way they occupy a
            room.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="aspect-[3/4] bg-surface" />
                <div className="mt-4 h-4 w-1/2 bg-surface" />
                <div className="mt-2 h-3 w-1/4 bg-surface" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="border border-line py-24 text-center">
            <p className="font-display text-4xl">The atelier is quiet</p>
            <p className="mt-3 text-muted">No products available just yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <article
                key={product._id}
                className={index % 5 === 0 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <div className="group relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <button
                    type="button"
                    disabled={product.stock === 0}
                    onClick={() => addToCart(product)}
                    className={`absolute inset-x-4 bottom-4 py-3 text-xs tracking-[0.25em] uppercase lg:opacity-0 lg:transition lg:group-hover:opacity-100 ${
                      product.stock > 0
                        ? "bg-bg text-ink"
                        : "cursor-not-allowed bg-surface text-muted"
                    }`}
                  >
                    {product.stock > 0 ? "Add to bag" : "Out of stock"}
                  </button>
                </div>
                <p className="mt-4 text-[11px] tracking-[0.25em] text-muted uppercase">
                  {product.category}
                </p>
                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl">{product.name}</h3>
                  <span className="text-sm tracking-widest uppercase">
                    ${product.price}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted">
                  {product.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default HomePage;
