import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

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

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setProcessing(true);

    const orderData = {
      orderItems: cartItems,
      totalPrice: getTotalPrice(),
      shippingAddress: {
        address: "123 main st",
        city: "chennai",
        postalCode: "1010101",
        country: "india",
      },
    };

    try {
      await api.post("/orders", orderData);
      clearCart();
      navigate("/");
    } catch (err) {
      console.log("Error", err);
    } finally {
      setProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-32 pb-24 text-center">
        <p className="text-xs tracking-[0.3em] text-muted uppercase">Bag</p>
        <h1 className="font-display mt-4 text-5xl">Your cart is empty</h1>
        <p className="mt-4 text-muted">
          Looks like you haven't added any items yet.
        </p>
        <Link
          to="/"
          className="mt-10 inline-block bg-accent px-6 py-3 text-xs tracking-[0.28em] text-accent-ink uppercase"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pt-28 pb-20 md:px-8">
      <p className="text-xs tracking-[0.3em] text-muted uppercase">Checkout</p>
      <h1 className="font-display mt-2 mb-12 text-5xl">Shopping cart</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.product}
              className="flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-32 w-24 object-cover"
              />
              <div className="flex-1">
                <h2 className="font-display text-2xl">{item.name}</h2>
                <p className="mt-1 text-sm tracking-widest uppercase">
                  ${item.price}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="h-9 w-9 border border-line"
                  onClick={() => updateQuantity(item.product, item.quantity - 1)}
                >
                  −
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  type="button"
                  className="h-9 w-9 border border-line"
                  onClick={() => updateQuantity(item.product, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.product)}
                  className="ml-4 text-xs tracking-widest text-muted uppercase"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit border border-line bg-surface p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">Order summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between text-muted">
              <span>Items ({cartItems.length})</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 font-display text-xl text-ink">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            disabled={processing}
            className={`mt-6 w-full py-3 text-xs tracking-[0.28em] uppercase ${
              processing
                ? "bg-line text-muted"
                : "bg-accent text-accent-ink"
            }`}
          >
            {processing ? "Processing..." : "Proceed to checkout"}
          </button>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
