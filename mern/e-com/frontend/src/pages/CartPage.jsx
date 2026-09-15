import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import api from "../services/api";

const CartPage = () => {

  const {cartItems} = useCart();
  const {user} = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added any items yet</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {cartItems.map((item) => (
          <div key={item.product} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center">
              <img 
                src={item.image || 'https://via.placeholder.com/100x100?text=Product'} 
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-blue-600 font-bold">${item.price}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <label className="text-gray-600">Qty:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => console.log("update")}
                    min="1"
                    className="w-16 px-2 py-1 border rounded text-center"
                  />
                </div>
                <button
                  onClick={() => console.log("Remove")}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Items ({cartItems.length})</span>
              <span>${123}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600">${123}</span>
              </div>
            </div>
          </div>
          <button
            // onClick={handleCheckout}
            disabled={processing}
            className={`w-full py-2 rounded mt-4 transition ${
              processing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {processing ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CartPage