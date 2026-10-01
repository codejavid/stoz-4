import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Load cart on auth change
  useEffect(() => {
    if (user) {
      api.get("/cart").then(({ data }) => setCartItems(data)).catch(() => {});
    } else {
      try {
        const saved = localStorage.getItem("cart");
        setCartItems(saved ? JSON.parse(saved) : []);
      } catch {
        setCartItems([]);
      }
    }
  }, [user]);

  // Persist to localStorage when guest
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((open) => !open);

  const addToCart = async (product, quantity = 1) => {
    if (user) {
      const { data } = await api.post("/cart", {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
      setCartItems(data);
    } else {
      setCartItems((prev) => {
        const existing = prev.find((i) => i.product === product._id);
        if (existing) {
          return prev.map((i) =>
            i.product === product._id ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prev, { product: product._id, name: product.name, price: product.price, image: product.image, quantity }];
      });
    }
    setIsOpen(true);
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);

    if (user) {
      const { data } = await api.put(`/cart/${productId}`, { quantity });
      setCartItems(data);
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.product === productId ? { ...i, quantity } : i))
      );
    }
  };

  const removeFromCart = async (productId) => {
    if (user) {
      const { data } = await api.delete(`/cart/${productId}`);
      setCartItems(data);
    } else {
      setCartItems((prev) => prev.filter((i) => i.product !== productId));
    }
  };

  const clearCart = async () => {
    if (user) {
      await api.delete("/cart");
    }
    setCartItems([]);
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
