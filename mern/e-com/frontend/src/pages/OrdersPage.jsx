import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const statusColors = {
  Pending: "bg-yellow-50 text-yellow-600",
  Processing: "bg-blue-50 text-blue-600",
  Shipped: "bg-purple-50 text-purple-600",
  Delivered: "bg-green-50 text-green-600",
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders/myorders")
      .then(({ data }) => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-5 pt-28 pb-16">
        <div className="mb-8">
          <p className="text-xs font-medium tracking-widest text-blue-500 uppercase">Account</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">My Orders</h1>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse rounded-xl border border-gray-100 p-5">
              <div className="flex justify-between">
                <div className="h-4 w-32 rounded bg-gray-100" />
                <div className="h-4 w-20 rounded bg-gray-100" />
              </div>
              <div className="mt-3 h-3 w-48 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-md px-5 pt-40 pb-24 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="1"/>
            <path d="M9 12h6M9 16h4"/>
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-900">No orders yet</h1>
        <p className="mt-2 text-sm text-gray-400">When you place an order, it will appear here.</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 pt-28 pb-16 md:px-8">
      <div className="mb-8">
        <p className="text-xs font-medium tracking-widest text-blue-500 uppercase">Account</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">My Orders</h1>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order._id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-gray-400">
                  Order #{order._id.slice(-8).toUpperCase()}
                </p>
                <p className="mt-0.5 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    statusColors[order.status] ?? "bg-gray-50 text-gray-500"
                  }`}
                >
                  {order.status}
                </span>
                <span className="text-sm font-bold text-gray-900">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-50 pt-4">
              <div className="flex flex-wrap gap-3">
                {order.orderItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5">
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <span className="text-xs text-gray-400">× {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {order.shippingAddress?.address && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
