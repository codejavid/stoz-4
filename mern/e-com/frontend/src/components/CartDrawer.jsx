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
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Bag</h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="mb-4 rounded-full bg-gray-50 p-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <p className="text-base font-semibold text-gray-900">Your bag is empty</p>
              <p className="mt-1 text-sm text-gray-400">Add some items to get started.</p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {cartItems.map((item) => (
                <li key={item.product} className="flex gap-4 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-16 rounded-lg object-cover bg-gray-50"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="text-sm font-medium text-gray-900 leading-tight">{item.name}</p>
                      <p className="shrink-0 text-sm font-semibold text-gray-900">${item.price}</p>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2">
                      <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
                        <button
                          type="button"
                          className="flex h-7 w-7 items-center justify-center text-gray-500 hover:bg-gray-50"
                          onClick={() => updateQuantity(item.product, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                        <button
                          type="button"
                          className="flex h-7 w-7 items-center justify-center text-gray-500 hover:bg-gray-50"
                          onClick={() => updateQuantity(item.product, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product)}
                        className="ml-auto text-xs text-gray-400 hover:text-red-500"
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
          <footer className="border-t border-gray-100 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-lg font-bold text-gray-900">${getTotalPrice().toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={goCheckout}
              className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Checkout
            </button>
            <Link
              to="/"
              onClick={closeCart}
              className="mt-3 block text-center text-sm text-gray-400 hover:text-gray-600"
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
