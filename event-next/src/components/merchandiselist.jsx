import React, { useState, useEffect } from "react";
import { events } from "../data/events";
import { FaClipboardList, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function EventMerchandisePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read editOrder from navigation state
  const editOrder = location.state?.editOrder;

  const [selectedEventId, setSelectedEventId] = useState(events[0].id);
  const [purchaseEventId, setPurchaseEventId] = useState(""); // Empty initial value
  const [purchaseItemId, setPurchaseItemId] = useState(""); // Empty initial value
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
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  // Prefill form if editing
  useEffect(() => {
    if (editOrder) {
      // First set the event ID to ensure item options are available
      setSelectedEventId(editOrder.eventId);
      setPurchaseEventId(editOrder.eventId);
      
      // Then, ensure we wait for the next render cycle before setting the item
      setTimeout(() => {
        setPurchaseItemId(editOrder.itemId);
        setQuantity(editOrder.quantity || 1);
      }, 0);
      
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
    
    // Check if an item is selected first - applies to both new orders and updates
    if (!purchaseItemId || purchaseItemId === "") {
      showAlert('Please Choose an Item to Submit The Order', "error");
      return;
    }
    
    const validationErrors = validate(customer);
    setErrors(validationErrors);
    setSubmitted(true);
    if (Object.keys(validationErrors).length === 0) {
      // Prepare order data
      const eventObj = getPurchaseEvent();
      if (!eventObj) {
        showAlert('Please select a valid event', "error");
        return;
      }
      
      const itemObj = eventObj.merchandise.find((item) => item.id === purchaseItemId);
      if (!itemObj) {
        showAlert('Please select a valid item', "error");
        return;
      }
      
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
            showAlert('Order updated!', "success");
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
            setTimeout(() => navigate("/my-orders"), 2000); // Optional: auto-navigate after 1s
          })
          .catch(() => showAlert('Failed to update order!', "error"));
      } else {
        // Otherwise, create new order
        fetch('http://localhost:3000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        })
          .then((res) => res.json())
          .then(() => {
            showAlert('Order submitted!', "success");
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
          .catch(() => showAlert('Failed to submit order!', "error"));
      }
    }
  }

  const isFormValid = Object.keys(validate(customer)).length === 0;

  // Update item dropdown when event changes
  useEffect(() => {
    if (purchaseEventId) {
      const event = getPurchaseEvent();
      // Event exists and has merchandise
      if (event && event.merchandise.length > 0) {
        // During initial edit, keep the selected item
        if (editOrder && editOrder.eventId === purchaseEventId && editOrder.itemId) {
          // Check if the item still exists in the event's merchandise
          const itemExists = event.merchandise.some(item => item.id === editOrder.itemId);
          if (itemExists) {
            setPurchaseItemId(editOrder.itemId);
          } else {
            // If item no longer exists in the event, select the first one
            setPurchaseItemId(event.merchandise[0].id);
          }
        } 
        // If not editing or changing event during edit, select first item
        else if (!editOrder || (editOrder && editOrder.eventId !== purchaseEventId)) {
          setPurchaseItemId(event.merchandise[0].id);
        }
      } else {
        setPurchaseItemId("");
      }
    } else {
      // No event selected (placeholder selected)
      setPurchaseItemId("");
      if (!editOrder || purchaseEventId === "") {
        setQuantity(1);
      }
    }
    // eslint-disable-next-line
  }, [purchaseEventId]);

  // Update total price when item or quantity changes
  React.useEffect(() => {
    if (purchaseItemId && purchaseEventId) {
      const event = getPurchaseEvent();
      if (event) {
        const item = event.merchandise.find((item) => item.id === purchaseItemId);
        if (item) {
          setTotalPrice(item.price * quantity);
          return;
        }
      }
    }
    // In any other case (no event, no item, etc.), set price to 0
    setTotalPrice(0);
  }, [purchaseItemId, quantity, purchaseEventId]);

  function showAlert(message, type = "success") {
    setAlert({ show: true, message, type });
  }

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
                  onClick={() => {
                    setSelectedEventId(event.id);
                  }}
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
            <h3 className="mb-0 text-lg font-semibold">Purchase Item</h3>
            <form>
              <label className="block mb-2 text-sm font-medium">
                Select Event
                <select
                  className="block w-full p-2 mt-1 mb-3 border rounded"
                  value={purchaseEventId}
                  onChange={(e) => {
                    const newEventId = e.target.value;
                    setPurchaseEventId(newEventId);
                    // Also update the selected event in the sidebar to match
                    if (newEventId) {
                      setSelectedEventId(newEventId);
                    }
                  }}
                >
                  <option value="">-- Select an Event --</option>
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
                  disabled={!purchaseEventId}
                >
                  <option value="">-- Select an Item --</option>
                  {purchaseEventId && getPurchaseEvent()?.merchandise.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              {/* Quantity Radio Buttons */}
              <div className="flex items-center mb-3">
                <span className="block text-sm font-medium mr-9 min-w-[77px]">Quantity</span>
                {!purchaseItemId || purchaseItemId === "" ? (
                  <div className="italic text-gray-500">-- Select Item First --</div>
                ) : (
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
                )}
              </div>

              {/* Total Price */}
              <div className="flex items-center mb-1">
                <span className="block text-sm font-medium mr-9 min-w-[77px]">Total Price</span>
                {!purchaseItemId || purchaseItemId === "" ? (
                  <div className="italic text-gray-500">-- Select Item To See Total Price --</div>
                ) : (
                  <div className="font-semibold">${totalPrice.toFixed(2)}</div>
                )}
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
                        placeholder="e.g. John Doe"
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
                        placeholder="e.g. john@example.com"
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
                        placeholder="e.g. 0776543210"
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
                        placeholder="e.g. 123"
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
                        placeholder="e.g. Main Street"
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
                        placeholder="e.g. Near City Mall"
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
                        {editOrder ? "Update Order" : "Submit Order"}
                      </button>
                      
                      {/* Cancel Edit button - only show when editing */}
                      {editOrder && (
                        <button
                          type="button"
                          className="flex items-center px-4 py-2 ml-2 font-semibold text-white transition bg-gray-500 rounded hover:bg-gray-700"
                          onClick={() => navigate("/my-orders")}
                        >
                          <FaTimes className="mr-1" /> Cancel Edit
                        </button>
                      )}
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
      {alert.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-sm p-6 text-center bg-white rounded-lg shadow-lg">
            <h2 className={`text-lg font-semibold mb-2 ${alert.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {alert.type === "success" ? "Success" : "Error"}
            </h2>
            <p className="mb-4">{alert.message}</p>
            {/* Only show OK button if NOT "Order updated!" */}
            {alert.message !== "Order updated!" && (
              <button
                className={`px-4 py-2 rounded text-white ${alert.type === "success" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
                onClick={() => {
                  setAlert({ show: false, message: "", type: "success" });
                }}
              >
                OK
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventMerchandisePage;