import React, { useState } from "react";
import { events } from "../data/events";

function EventMerchandisePage() {
  const [selectedEventId, setSelectedEventId] = useState(events[0].id);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  function getSelectedEvent() {
    return events.find((event) => event.id === selectedEventId);
  }

  function handleQuantityChange(itemId, delta) {
    setQuantities((prevQuantities) => {
      const currentQty = prevQuantities[itemId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return { ...prevQuantities, [itemId]: newQty };
    });
  }

  function handleAddToCart(item) {
    const qty = quantities[item.id] || 0;
    if (qty === 0) return;

    setCart((prevCart) => {
      const newEntry = {
        name: item.name,
        qty: qty,
        price: item.price,
        total: item.price * qty
      };
      return { ...prevCart, [item.id]: newEntry };
    });

    setShowCart(true); // Slide in the cart
  }

  function handleRemoveFromCart(itemId) {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[itemId];
      return newCart;
    });
  }

  function handleClearCart() {
    setCart({});
    setQuantities({});
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="flex p-4">
        {/* Sidebar */}
        <aside className="w-1/4 p-4 mr-4 bg-white shadow rounded-xl">
          <h2 className="mb-4 text-xl font-semibold">Events</h2>
          <ul className="space-y-2">
            {events.map((event) => (
              <li
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className={`cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-100 ${
                  event.id === selectedEventId ? "bg-blue-200 font-bold" : ""
                }`}
              >
                {event.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <section className="flex-1">
          <h2 className="mb-6 text-2xl font-semibold">
            {getSelectedEvent().name} Merchandise
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getSelectedEvent().merchandise.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center p-4 bg-white shadow rounded-xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-contain h-32 mb-3"
                />
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="mb-2 text-gray-600">${item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="px-3 py-1 bg-red-100 rounded hover:bg-red-200"
                  >
                    −
                  </button>
                  <span className="text-lg">
                    {quantities[item.id] || 0}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="px-3 py-1 bg-green-100 rounded hover:bg-green-200"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="px-4 py-1 mt-4 font-semibold text-black transition-colors duration-200 border-2 border-black rounded-full"
                  style={{
                    background: "transparent",
                    boxShadow: "none"
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.boxShadow = "0 0 12px 2px #38bdf8, 0 0 24px 4px #38bdf8";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Slide-in Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-bold">🛒 Your Cart</h3>
          <button
            onClick={() => setShowCart(false)}
            className="text-xl text-gray-500 hover:text-red-600"
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex flex-col h-[calc(100%-64px)]">
          {Object.keys(cart).length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <ul className="flex-1 space-y-4 overflow-y-auto">
                {Object.entries(cart).map(([itemId, item]) => (
                  <li key={itemId} className="flex items-center justify-between pb-2 border-b">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        {item.qty} × ${item.price} ={" "}
                        <span className="font-semibold">${item.total}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(itemId)}
                      className="px-2 py-1 ml-2 text-xs text-white bg-red-500 rounded hover:bg-red-700"
                      title="Remove item"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              {/* Cart Actions and Total */}
              <div className="pt-4 mt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Total:</span>
                  <span className="text-lg font-bold">
                    $
                    {Object.values(cart)
                      .reduce((sum, item) => sum + item.total, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleClearCart}
                    className="flex-1 px-3 py-2 text-sm font-semibold bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => alert('Checkout not implemented')}
                    className="flex-1 px-3 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay background when cart is open */}
      {showCart && (
        <div
          onClick={() => setShowCart(false)}
          className="fixed inset-0 z-40 bg-black bg-opacity-30"
        ></div>
      )}
    </div>
  );
}

export default EventMerchandisePage;
