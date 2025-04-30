import React, { useState, useEffect } from "react";
import { events } from "../data/events";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function EventMerchandisePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read editOrder from navigation state
  const editOrder = location.state?.editOrder;

  const [selectedEventId, setSelectedEventId] = useState(events[0].id);
  const [purchaseEventId, setPurchaseEventId] = useState(events[0].id);
  const [purchaseItemId, setPurchaseItemId] = useState(events[0].merchandise[0]?.id || "");
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    houseNo: "",
    addressLine: "",
    addressLine2: "",
    paymentMethod: "cash",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(
    getPurchaseEvent()?.merchandise.find((item) => item.id === purchaseItemId)?.price || 0
  );

  // Prefill form if editing
  useEffect(() => {
    if (editOrder) {
      setSelectedEventId(editOrder.eventId);
      setPurchaseEventId(editOrder.eventId);
      setPurchaseItemId(editOrder.itemId);
      setQuantity(editOrder.quantity);
      setCustomer({
        ...editOrder.customer,
        paymentMethod: editOrder.paymentMethod || "cash",
      });
    }
    // eslint-disable-next-line
  }, [editOrder]);

  function getSelectedEvent() {
    return events.find((event) => event.id === selectedEventId);
  }

  function getPurchaseEvent() {
    return events.find((event) => event.id === purchaseEventId);
  }

  function validate(customer) {
    const newErrors = {};
    if (!customer.name.trim()) newErrors.name = "Name is required";
    if (!customer.email.trim()) newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(customer.email))
      newErrors.email = "Invalid email address";
    if (!customer.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(customer.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!customer.houseNo.trim()) newErrors.houseNo = "House No is required";
    if (!customer.addressLine.trim()) newErrors.addressLine = "Address Line is required";
    if (!customer.addressLine2.trim()) newErrors.addressLine2 = "Address Line 2 is required";
    if (!customer.paymentMethod) newErrors.paymentMethod = "Payment Method is required";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(customer);
    setErrors(validationErrors);
    setSubmitted(true);
    if (Object.keys(validationErrors).length === 0) {
      // Prepare order data
      const eventObj = getPurchaseEvent();
      const itemObj = eventObj?.merchandise.find((item) => item.id === purchaseItemId);
      const orderData = {
        eventId: eventObj.id,
        eventName: eventObj.name,
        itemId: itemObj.id,
        itemName: itemObj.name,
        quantity,
        totalPrice,
        customer,
        paymentMethod: customer.paymentMethod,
      };

      // If editing, update existing order
      if (editOrder && editOrder._id) {
        fetch(`http://localhost:3000/api/orders/${editOrder._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        })
          .then((res) => res.json())
          .then(() => {
            alert('Order updated!');
            setCustomer({
              name: "",
              email: "",
              phone: "",
              houseNo: "",
              addressLine: "",
              addressLine2: "",
              paymentMethod: "cash",
            });
            setSubmitted(false);
            setErrors({});
            navigate("/my-orders");
          })
          .catch(() => alert('Failed to update order!'));
      } else {
        // Otherwise, create new order
        fetch('http://localhost:3000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        })
          .then((res) => res.json())
          .then(() => {
            alert('Order submitted!');
            setCustomer({
              name: "",
              email: "",
              phone: "",
              houseNo: "",
              addressLine: "",
              addressLine2: "",
              paymentMethod: "cash",
            });
            setSubmitted(false);
            setErrors({});
          })
          .catch(() => alert('Failed to submit order!'));
      }
    }
  }

  const isFormValid = Object.keys(validate(customer)).length === 0;

  // Update item dropdown when event changes
  useEffect(() => {
    // Only auto-select if not editing
    if (!editOrder) {
      const event = getPurchaseEvent();
      if (event && event.merchandise.length > 0) {
        setPurchaseItemId(event.merchandise[0].id);
      } else {
        setPurchaseItemId("");
      }
    }
    // eslint-disable-next-line
  }, [purchaseEventId]);

  React.useEffect(() => {
    const item = getPurchaseEvent()?.merchandise.find((item) => item.id === purchaseItemId);
    setTotalPrice(item ? item.price * quantity : 0);
  }, [purchaseItemId, quantity, purchaseEventId]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Top right View Orders icon */}
      <button
        className="absolute top-0 z-20 flex items-center px-2 py-2 text-white transition bg-blue-500 rounded-lg shadow right-8 hover:bg-blue-600"
        onClick={() => navigate("/my-orders")}
        title="View My Orders"
      >
        <FaClipboardList className="mr-2" />
        My Orders
      </button>
      <div className="flex p-4">
        {/* Sidebar */}
        <aside className="flex flex-col w-1/4 mr-4 space-y-4">
          {/* Event Selection Box */}
          <div className="p-4 mb-3 bg-white shadow rounded-xl min-h-[288px] flex flex-col justify-start">
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
          </div>
          {/* Purchase Item Box */}
          <div className="p-4 bg-gray-100 rounded-lg shadow mt-25">  
            <h3 className="mb-3 text-lg font-semibold">Purchase Item</h3>
            <form>
              <label className="block mb-2 text-sm font-medium">
                Select Event
                <select
                  className="block w-full p-2 mt-1 mb-3 border rounded"
                  value={purchaseEventId}
                  onChange={(e) => setPurchaseEventId(e.target.value)}
                >
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2 text-sm font-medium">
                Select Item
                <select
                  className="block w-full p-2 mt-1 mb-3 border rounded"
                  value={purchaseItemId}
                  onChange={(e) => setPurchaseItemId(e.target.value)}
                  disabled={!getPurchaseEvent() || getPurchaseEvent().merchandise.length === 0}
                >
                  {getPurchaseEvent() &&
                    getPurchaseEvent().merchandise.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </label>
              {/* Quantity Radio Buttons */}
              <div className="flex items-center mb-3">
                <span className="block text-sm font-medium mr-9 min-w-[77px]">Quantity</span>
                <div className="flex space-x-4">
                  {[1, 2, 3].map((num) => (
                    <label key={num} className="flex items-center">
                      <input
                        type="radio"
                        name="quantity"
                        value={num}
                        checked={quantity === num}
                        onChange={() => setQuantity(num)}
                        className="mr-1"
                      />
                      {num}
                    </label>
                  ))}
                </div>
              </div>
              {/* Total Price */}
              <div className="flex items-center mb-1">
                <span className="block text-sm font-medium mr-9 min-w-[77px]">Total Price</span>
                <div className="font-semibold">${totalPrice.toFixed(2)}</div>
              </div>
            </form>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex flex-col flex-1">
          <h2 className="mb-0 text-2xl font-semibold">
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
              </div>
            ))}
            {/* Customer Details Form as a long rectangle under the cards */}
            <div className="col-span-1 mt-0 mb-0 sm:col-span-2 lg:col-span-3">
              <div className="w-full px-6 pt-4 pb-4 bg-gray-100 shadow rounded-xl">
                <h3 className="mb-2 text-lg font-semibold">Customer Details</h3>
                <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit} noValidate>
                  {/* First Column */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Name
                      <input
                        type="text"
                        className={`block w-full p-2 mt-1 border rounded ${errors.name && submitted ? "border-red-500" : ""}`}
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      />
                      {errors.name && submitted && (
                        <span className="text-xs text-red-500">{errors.name}</span>
                      )}
                    </label>
                    <label className="block mb-2 text-sm font-medium">
                      Email Address
                      <input
                        type="email"
                        className={`block w-full p-2 mt-1 border rounded ${errors.email && submitted ? "border-red-500" : ""}`}
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      />
                      {errors.email && submitted && (
                        <span className="text-xs text-red-500">{errors.email}</span>
                      )}
                    </label>
                    <label className="block mb-2 text-sm font-medium">
                      Telephone
                      <input
                        type="tel"
                        className={`block w-full p-2 mt-1 border rounded ${errors.phone && submitted ? "border-red-500" : ""}`}
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      />
                      {errors.phone && submitted && (
                        <span className="text-xs text-red-500">{errors.phone}</span>
                      )}
                    </label>
                  </div>
                  {/* Second Column */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      House No
                      <input
                        type="text"
                        className={`block w-full p-2 mt-1 border rounded ${errors.houseNo && submitted ? "border-red-500" : ""}`}
                        value={customer.houseNo || ""}
                        onChange={(e) => setCustomer({ ...customer, houseNo: e.target.value })}
                      />
                      {errors.houseNo && submitted && (
                        <span className="text-xs text-red-500">{errors.houseNo}</span>
                      )}
                    </label>
                    <label className="block mb-2 text-sm font-medium">
                      Address Line
                      <input
                        type="text"
                        className={`block w-full p-2 mt-1 border rounded ${errors.addressLine && submitted ? "border-red-500" : ""}`}
                        value={customer.addressLine || ""}
                        onChange={(e) => setCustomer({ ...customer, addressLine: e.target.value })}
                      />
                      {errors.addressLine && submitted && (
                        <span className="text-xs text-red-500">{errors.addressLine}</span>
                      )}
                    </label>
                    <label className="block mb-2 text-sm font-medium">
                      Address Line 2
                      <input
                        type="text"
                        className={`block w-full p-2 mt-1 border rounded ${errors.addressLine2 && submitted ? "border-red-500" : ""}`}
                        value={customer.addressLine2 || ""}
                        onChange={(e) => setCustomer({ ...customer, addressLine2: e.target.value })}
                      />
                      {errors.addressLine2 && submitted && (
                        <span className="text-xs text-red-500">{errors.addressLine2}</span>
                      )}
                    </label>
                  </div>
                  {/* Payment Method and Submit Button - Centered under columns */}
                  <div className="flex flex-col items-center mt-2 md:col-span-2">
                    <div className="flex items-center space-x-4">
                      <span className="block text-sm font-medium">Payment Method</span>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={customer.paymentMethod === "cash"}
                          onChange={() => setCustomer({ ...customer, paymentMethod: "cash" })}
                          className="mr-2"
                        />
                        Cash on Delivery
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="counter"
                          checked={customer.paymentMethod === "counter"}
                          onChange={() => setCustomer({ ...customer, paymentMethod: "counter" })}
                          className="mr-2"
                        />
                        Pay on Counter
                      </label>
                      <button
                        type="submit"
                        className={`ml-4 px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-700 transition`}
                      >
                        Submit Order
                      </button>
                    </div>
                    {errors.paymentMethod && submitted && (
                      <span className="mt-2 text-xs text-red-500">{errors.paymentMethod}</span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EventMerchandisePage;