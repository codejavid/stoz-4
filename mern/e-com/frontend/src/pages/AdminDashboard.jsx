import { useEffect, useState } from "react";
import api from "../services/api";

const inputClass =
  "border border-line bg-transparent px-3 py-3 outline-none focus:border-accent";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData);
        alert("Product updated sucessfully");
      } else {
        await api.post("/products", formData);
        alert("Product created sucessfully");
      }

      fetchProducts();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure")) {
      try {
        await api.delete(`/products/${productId}`);
        alert("Product deleted sucessfully");
        fetchProducts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
      stock: "",
    });
  };

  const handelEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      stock: product.stock,
    });
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      alert("Order status updated");
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pt-28 pb-16 md:px-8">
      <p className="text-xs tracking-[0.3em] text-muted uppercase">Atelier</p>
      <h1 className="font-display mt-2 mb-10 text-5xl">Admin dashboard</h1>

      <div className="mb-8 flex gap-6 border-b border-line">
        <button
          type="button"
          onClick={() => setActiveTab("products")}
          className={`pb-3 text-xs tracking-widest uppercase ${
            activeTab === "products"
              ? "border-b-2 border-accent text-ink"
              : "text-muted"
          }`}
        >
          Manage products
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          className={`pb-3 text-xs tracking-widest uppercase ${
            activeTab === "orders"
              ? "border-b-2 border-accent text-ink"
              : "text-muted"
          }`}
        >
          Manage orders
        </button>
      </div>

      {activeTab === "products" && (
        <div className="border border-line bg-surface p-6">
          <h2 className="font-display text-2xl">
            {editingProduct ? "Update product" : "Add new product"}
          </h2>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Product name"
                className={inputClass}
                required
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price"
                className={inputClass}
                required
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Category"
                className={inputClass}
                required
              />
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="Stock"
                className={inputClass}
                required
              />
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                className={inputClass}
                required
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className={inputClass}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-accent px-6 py-3 text-xs tracking-[0.28em] text-accent-ink uppercase"
            >
              {editingProduct ? "Update product" : "Add product"}
            </button>
          </form>

          <div className="mt-10 overflow-x-auto border border-line">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-line text-xs tracking-widest text-muted uppercase">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-line">
                    <td className="px-4 py-4">
                      <div className="font-display text-lg">{product.name}</div>
                      <div className="text-xs tracking-widest text-muted uppercase">
                        {product.category}
                      </div>
                    </td>
                    <td className="px-4 py-4">${product.price}</td>
                    <td className="px-4 py-4">{product.stock}</td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => handelEdit(product)}
                        className="mr-3 text-xs tracking-widest uppercase"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product._id)}
                        className="text-xs tracking-widest text-muted uppercase"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="overflow-x-auto border border-line bg-surface">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line text-xs tracking-widest text-muted uppercase">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-line">
                  <td className="px-4 py-4">{order._id.slice(-6)}</td>
                  <td className="px-4 py-4">{order.user?.name || "Unknown"}</td>
                  <td className="px-4 py-4">${order.totalPrice}</td>
                  <td className="px-4 py-4">
                    <span className="text-xs tracking-widest uppercase">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <select
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className="border border-line bg-bg px-2 py-1 text-sm"
                      value={order.status}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
