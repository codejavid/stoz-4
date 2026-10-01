import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const inputClass =
  "w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingProduct && !imageFile) {
      toast.error("Please select a product image");
      return;
    }

    // Send as multipart/form-data so multer can read the file
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append("image", imageFile);

    setSubmitting(true);
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, data);
        toast.success("Product updated successfully");
      } else {
        await api.post("/products", data);
        toast.success("Product created successfully");
      }

      fetchProducts();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setSubmitting(false);
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
        toast.success("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setImageFile(null);
    setImagePreview("");
    setFormData({
      name: "",
      price: "",
      description: "",
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
      category: product.category,
      stock: product.stock,
    });
    setImageFile(null);
    setImagePreview(product.image);
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      toast.success("Order status updated");
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-8 border-b border-gray-100 pb-6">
          <p className="text-xs font-medium tracking-widest text-blue-500 uppercase mb-1">
            Admin
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 bg-gray-50 p-1 rounded w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 text-sm font-medium rounded ${
              activeTab === "products"
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Products
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 text-sm font-medium rounded ${
              activeTab === "orders"
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Orders
          </button>
        </div>

        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Form Card */}
            <div className="border border-gray-100 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-4">
                {editingProduct ? "Update Product" : "Add New Product"}
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
                  <div className="flex items-center gap-3">
                    <input
                      key={editingProduct?._id || "new"}
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={`${inputClass} file:mr-3 file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-xs file:font-medium file:text-blue-600 file:rounded`}
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-11 w-11 shrink-0 rounded object-cover border border-gray-200"
                      />
                    )}
                  </div>
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
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 px-5 py-2 text-sm font-medium text-white rounded hover:bg-blue-700 disabled:opacity-60"
                  >
                    {submitting ? "Uploading..." : editingProduct ? "Update Product" : "Add Product"}
                  </button>
                  {editingProduct && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="border border-gray-200 px-5 py-2 text-sm font-medium text-gray-600 rounded hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Products Table */}
            <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-white">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{product.category}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">${product.price}</td>
                      <td className="px-4 py-3 text-gray-700">{product.stock}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => handelEdit(product)}
                          className="text-blue-600 text-xs font-medium mr-3 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product._id)}
                          className="text-gray-400 text-xs font-medium hover:text-red-500"
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
          <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">#{order._id.slice(-6)}</td>
                    <td className="px-4 py-3 text-gray-700">{order.user?.name || "Unknown"}</td>
                    <td className="px-4 py-3 text-gray-700">${order.totalPrice}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-600">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className="border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-700 rounded outline-none focus:border-blue-500"
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
    </div>
  );
};

export default AdminDashboard;
