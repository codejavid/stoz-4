import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartDrawer = () => {
  const {
    cartItems,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") closeCart();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const goCheckout = () => {
    closeCart();
    navigate("/cart");
  };

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="Close cart"
        onClick={closeCart}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-line bg-bg">
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-2xl">Bag</h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-xs tracking-widest text-muted uppercase hover:text-ink"
          >
            Close
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-3xl">Empty for now</p>
              <p className="mt-3 text-muted">The drop is waiting downstairs.</p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-8 inline-block border-b border-accent pb-1 text-sm tracking-widest uppercase"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cartItems.map((item) => (
                <li key={item.product} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <p className="font-display text-lg leading-tight">
                        {item.name}
                      </p>
                      <p className="text-sm">${item.price}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        className="h-8 w-8 border border-line"
                        onClick={() =>
                          updateQuantity(item.product, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="h-8 w-8 border border-line"
                        onClick={() =>
                          updateQuantity(item.product, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product)}
                        className="ml-auto text-xs tracking-widest text-muted uppercase hover:text-ink"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <footer className="border-t border-line px-6 py-5">
            <div className="mb-4 flex justify-between font-display text-xl">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={goCheckout}
              className="w-full bg-accent py-3 text-sm tracking-widest text-accent-ink uppercase"
            >
              Checkout
            </button>
            <Link
              to="/"
              onClick={closeCart}
              className="mt-3 block text-center text-xs tracking-widest text-muted uppercase"
            >
              Continue shopping
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
