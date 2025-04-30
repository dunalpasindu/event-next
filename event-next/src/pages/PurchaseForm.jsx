import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PurchaseForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventName, cart, total } = location.state || {};

  const [form, setForm] = React.useState({
    customerName: "",
    houseNo: "",
    addressLine1: "",
    addressLine2: "",
    email: "",
    telephone: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = React.useState({});

  if (!cart || !eventName) {
    navigate("/merchandise");
    return null;
  }

  // Validation helpers
  const validate = () => {
    const newErrors = {};
    if (!form.customerName) newErrors.customerName = "Required";
    if (!form.houseNo) newErrors.houseNo = "Required";
    if (!form.addressLine1) newErrors.addressLine1 = "Required";
    if (!form.email) newErrors.email = "Required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.telephone) newErrors.telephone = "Required";
    else if (!/^\d{10}$/.test(form.telephone)) newErrors.telephone = "Must be 10 digits";
    if (!form.paymentMethod) newErrors.paymentMethod = "Select a payment method";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    alert("Order submitted!\n" + JSON.stringify({ ...form, eventName, cart, total }, null, 2));
    navigate("/merchandise");
  };

  return (
    <div className="flex flex-col max-w-4xl gap-8 mx-auto mt-5 md:flex-row">
      {/* Bill UI */}
      <div className="flex justify-center w-full md:w-1/2">
        <div className="relative w-full max-w-xs p-0 bg-transparent border-none rounded-none shadow-none">
          <div className="overflow-hidden bg-white border shadow-lg border-gray rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 bg-white border border-black rounded-full">
                  <span role="img" aria-label="event" className="text-2xl">🎟️</span>
                </div>
                <div>
                  <div className="text-lg font-bold">{eventName}</div>
                  <div className="text-xs text-gray-500">Event</div>
                </div>
              </div>
              <div className="text-xs text-gray-700">{new Date().toLocaleDateString()}</div>
            </div>
            {/* Items */}
            <div className="px-6 py-4">
              <ol className="mb-2">
                {Object.values(cart).map((item, idx) => (
                  <li key={item.name} className="flex justify-between mb-1 text-sm">
                    <span>
                      {idx + 1}. {item.name} × {item.qty}
                    </span>
                    <span className="font-semibold">${item.total}</span>
                  </li>
                ))}
              </ol>
              <div className="flex justify-between pt-2 mt-2 text-xs border-t">
                <span>Grand Total:</span>
                <span className="text-lg font-bold text-green-600">${total}</span>
              </div>
            </div>
            {/* Barcode style */}
            <div className="flex flex-col items-center w-full px-0 pb-6">
              <img
                src="https://barcode.tec-it.com/barcode.ashx?data=EventNext-SACHIRA-MIHIDUL&code=Code128&translate-esc=true"
                alt="Barcode"
                className="object-contain w-full h-10 mb-2"
                style={{ maxWidth: "100%" }}
              />
              <div className="text-xs font-semibold tracking-widest text-gray-700">EventNext</div>
            </div>
          </div>
        </div>
      </div>
      {/* Form UI */}
      <div className="flex items-center w-full md:w-1/2 md:ml-[-45px]">
        <form
          onSubmit={handleSubmit}
          className="w-full p-4 space-y-2 bg-white border rounded-lg shadow-lg"
          style={{ minHeight: 0 }}
        >
          <h2 className="mb-2 text-xl font-bold">Customer Details</h2>
          <div>
            <label className="block font-medium">Customer Name</label>
            <input
              name="customerName"
              required
              placeholder="e.g. John Doe"
              className="w-full p-1.5 border rounded text-sm"
              value={form.customerName}
              onChange={handleChange}
            />
            {errors.customerName && <span className="text-xs text-red-500">{errors.customerName}</span>}
          </div>
          <div>
            <label className="block font-medium">House No.</label>
            <input
              name="houseNo"
              required
              placeholder="e.g. 221B"
              className="w-full p-1.5 border rounded text-sm"
              value={form.houseNo}
              onChange={handleChange}
            />
            {errors.houseNo && <span className="text-xs text-red-500">{errors.houseNo}</span>}
          </div>
          <div>
            <label className="block font-medium">Address Line 1</label>
            <input
              name="addressLine1"
              required
              placeholder="e.g. Baker Street"
              className="w-full p-1.5 border rounded text-sm"
              value={form.addressLine1}
              onChange={handleChange}
            />
            {errors.addressLine1 && <span className="text-xs text-red-500">{errors.addressLine1}</span>}
          </div>
          <div>
            <label className="block font-medium">Address Line 2</label>
            <input
              name="addressLine2"
              placeholder="e.g. London"
              className="w-full p-1.5 border rounded text-sm"
              value={form.addressLine2}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="e.g. john@example.com"
              className="w-full p-1.5 border rounded text-sm"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
          </div>
          <div>
            <label className="block font-medium">Telephone</label>
            <input
              name="telephone"
              type="tel"
              required
              placeholder="e.g. 0712345678"
              className="w-full p-1.5 border rounded text-sm"
              value={form.telephone}
              onChange={handleChange}
              maxLength={10}
            />
            {errors.telephone && <span className="text-xs text-red-500">{errors.telephone}</span>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Payment Method</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={form.paymentMethod === "Cash on Delivery"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Cash on Delivery
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Pay on Counter"
                  checked={form.paymentMethod === "Pay on Counter"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Pay on Counter
              </label>
            </div>
            {errors.paymentMethod && <span className="text-xs text-red-500">{errors.paymentMethod}</span>}
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 text-white bg-gray-600 rounded hover:bg-gray-950"
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default PurchaseForm;