import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { useCart } from "../context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-5 pt-28 pb-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 animate-pulse">
          <div className="aspect-3/4 w-full rounded-2xl bg-gray-100" />
          <div className="space-y-4 pt-4">
            <div className="h-4 w-24 rounded bg-gray-100" />
            <div className="h-8 w-3/4 rounded bg-gray-100" />
            <div className="h-6 w-20 rounded bg-gray-100" />
            <div className="h-20 w-full rounded bg-gray-100" />
            <div className="h-11 w-full rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to bag`);
  };

  return (
    <div className="mx-auto max-w-5xl px-5 pt-28 pb-16 md:px-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-3/4 w-full object-cover"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <span className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-500">
                Out of stock
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col pt-2">
          <p className="text-xs font-medium tracking-widest text-blue-500 uppercase">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-3 text-2xl font-bold text-gray-900">${product.price}</p>

          <p className="mt-5 text-sm leading-relaxed text-gray-500">{product.description}</p>

          <div className="mt-6 flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                product.stock > 0
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <button
            type="button"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            className={`mt-8 w-full rounded-lg py-3 text-sm font-semibold ${
              product.stock > 0
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "cursor-not-allowed bg-gray-100 text-gray-400"
            }`}
          >
            {product.stock > 0 ? "Add to bag" : "Out of stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
