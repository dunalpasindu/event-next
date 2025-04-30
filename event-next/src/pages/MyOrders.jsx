import React, { useEffect, useState } from "react";
import { events } from "../data/events";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function getItemImage(eventName, itemName) {
  const event = events.find((e) => e.name === eventName);
  if (!event) return "";
  const item = event.merchandise.find((m) => m.name === itemName);
  return item ? item.image : "";
}

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch orders from backend API
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Cancel order handler
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      } else {
        alert("Failed to cancel order.");
      }
    } catch {
      alert("Failed to cancel order.");
    }
  };

  // Edit order handler
  const handleEditOrder = (order) => {
    navigate("/merchandise", { state: { editOrder: order } });
  };

  if (loading) {
    return <div className="p-8 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-4xl p-6 mx-auto mt-8 bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-blue-600">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="h-[500px] overflow-y-auto flex flex-col gap-6 pr-2">
          {orders.map((order, idx) => (
            <div
              key={order._id || idx}
              className="relative flex flex-row items-center w-full p-4 shadow bg-gray-50 rounded-xl"
            >
              {/* Item Image */}
              <img
                src={getItemImage(order.eventName, order.itemName)}
                alt={order.itemName}
                className="object-contain mr-6 border rounded-lg w-28 h-28"
              />
              {/* Item and Event Name, Quantity, Address */}
              <div className="flex-1 min-w-0">
                <div className="text-lg font-bold text-black">{order.itemName}</div>
                <div className="mb-2 text-sm text-gray-500">{order.eventName}</div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Quantity: </span>
                  <span>{order.quantity}</span>
                </div>
                <div className="mb-2">
                  <div className="font-semibold text-gray-700">{order.customer?.name}</div>
                  <div className="text-sm text-gray-600">
                    {order.customer?.houseNo}, {order.customer?.addressLine}
                    {order.customer?.addressLine2 && `, ${order.customer?.addressLine2}`}
                  </div>
                  <div className="text-sm text-gray-600">{order.customer?.phone}</div>
                </div>
                {/* Edit and Cancel Buttons */}
                <div className="flex justify-center gap-8 mt-4">
                  <button
                    className="flex items-center px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
                    onClick={() => handleEditOrder(order)}
                    title="Edit Order"
                  >
                    <FaEdit className="mr-1" /> Edit Order
                  </button>
                  <button
                    className="flex items-center px-3 py-1 text-sm text-red-600 bg-red-100 rounded hover:bg-red-200"
                    onClick={() => handleCancelOrder(order._id)}
                    title="Cancel Order"
                  >
                    <FaTrashAlt className="mr-1" /> Cancel Order
                  </button>
                </div>
              </div>
              {/* Price and Payment */}
              <div className="flex flex-col items-end ml-4 min-w-[100px]">
                <div className="mb-2 text-xl font-bold text-blue-700">
                  ${order.totalPrice?.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {order.paymentMethod}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;