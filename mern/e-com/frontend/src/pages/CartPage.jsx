import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    setProcessing(true);

    const orderData = {
      orderItems: cartItems,
      totalPrice: getTotalPrice(),
      shippingAddress: shipping,
    };

    try {
      await api.post("/orders", orderData);
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to place order. Please try again.");
      console.log("Error", err);
    } finally {
      setProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-md px-5 pt-40 pb-24 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-gray-400">
          Looks like you haven't added any items yet.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 pb-20 md:px-8">
      <div className="mb-8">
        <p className="text-xs font-medium tracking-widest text-blue-500 uppercase">Checkout</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">Shopping cart</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.product}
              className="flex gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-20 rounded-lg object-cover bg-gray-50"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-2">
                  <h2 className="font-semibold text-gray-900">{item.name}</h2>
                  <span className="shrink-0 font-semibold text-gray-900">${item.price}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-50"
                      onClick={() => updateQuantity(item.product, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-50"
                      onClick={() => updateQuantity(item.product, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product)}
                    className="text-xs text-gray-400 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <h2 className="text-base font-semibold text-gray-900">Order summary</h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Items ({cartItems.length})</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-3 text-base font-bold text-gray-900">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          {!showForm ? (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-5 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Proceed to checkout
            </button>
          ) : (
            <form onSubmit={handleCheckout} className="mt-5 space-y-3">
              <p className="text-sm font-semibold text-gray-900">Shipping address</p>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Street address</label>
                <input
                  type="text"
                  name="address"
                  value={shipping.address}
                  onChange={handleShippingChange}
                  placeholder="123 Main St"
                  className={inputClass}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shipping.city}
                    onChange={handleShippingChange}
                    placeholder="Chennai"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Postal code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shipping.postalCode}
                    onChange={handleShippingChange}
                    placeholder="600001"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Country</label>
                <input
                  type="text"
                  name="country"
                  value={shipping.country}
                  onChange={handleShippingChange}
                  placeholder="India"
                  className={inputClass}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={processing}
                className={`mt-2 w-full rounded-lg py-3 text-sm font-semibold ${
                  processing
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {processing ? "Placing order..." : "Place order"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full text-center text-sm text-gray-400 hover:text-gray-600"
              >
                Back to cart
              </button>
            </form>
          )}

          {!showForm && (
            <Link to="/" className="mt-3 block text-center text-sm text-gray-400 hover:text-gray-600">
              Continue shopping
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
