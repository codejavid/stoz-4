import Cart from "../models/Cart.js";

// GET /api/cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  res.json(cart ? cart.items : []);
};

// POST /api/cart  — add or update item
export const addToCart = async (req, res) => {
  const { product, name, price, image, quantity = 1 } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const existing = cart.items.find((i) => i.product.toString() === product);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ product, name, price, image, quantity });
  }

  await cart.save();
  res.json(cart.items);
};

// PUT /api/cart/:productId  — set quantity
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  if (quantity <= 0) {
    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
  } else {
    const item = cart.items.find((i) => i.product.toString() === req.params.productId);
    if (item) item.quantity = quantity;
  }

  await cart.save();
  res.json(cart.items);
};

// DELETE /api/cart/:productId
export const removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
  await cart.save();
  res.json(cart.items);
};

// DELETE /api/cart
export const clearCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  res.json([]);
};
