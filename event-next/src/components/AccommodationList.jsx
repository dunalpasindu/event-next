import React, { useState, useEffect } from "react";
import { events } from "../data/events";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AccommodationList() {
  const navigate = useNavigate();
  const [selectedEventId, setSelectedEventId] = useState(events[0].id);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);

  const getSelectedEvent = () => {
    return events.find((event) => event.id === selectedEventId);
  };

  const validate = () => {
    const newErrors = {};
    if (!customer.name.trim()) newErrors.name = "Name is required";
    if (!customer.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email))
      newErrors.email = "Invalid email address";
    if (!customer.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(customer.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!customer.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!customer.checkOut) newErrors.checkOut = "Check-out date is required";
    else if (new Date(customer.checkOut) <= new Date(customer.checkIn))
      newErrors.checkOut = "Check-out date must be after check-in date";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSubmitted(true);
    if (Object.keys(validationErrors).length === 0) {
      const bookingData = {
        eventId: selectedEventId,
        eventName: getSelectedEvent().name,
        accommodationId: selectedAccommodation.id,
        accommodationName: selectedAccommodation.name,
        price: selectedAccommodation.price,
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          checkIn: customer.checkIn,
          checkOut: customer.checkOut,
          message: customer.message,
        },
      };

      try {
        const response = await fetch("http://localhost:3000/api/accommodations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });

        if (response.ok) {
          setSuccessMessage("Your booking was successful! Thank you for choosing us.");
          setTimeout(() => setSuccessMessage(""), 5000); // Clear message after 3 seconds
          setCustomer({ name: "", email: "", phone: "", checkIn: "", checkOut: "", message: "" });
          setSubmitted(false);
          setErrors({});
          setSelectedAccommodation(null);
        } else {
          setSuccessMessage("Failed to book accommodation. Please try again.");
          setTimeout(() => setSuccessMessage(""), 5000); // Clear message after 3 seconds
        }
      } catch (error) {
        console.error("Error booking accommodation:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const applyFilters = () => {
    const filteredAccommodations = getSelectedEvent().accommodations.filter((acc) => {
      const matchesSearchQuery = acc.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMinPrice = minPrice === "" || acc.price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === "" || acc.price <= parseFloat(maxPrice);
      return matchesSearchQuery && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredAccommodations(filteredAccommodations);
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, minPrice, maxPrice, selectedEventId]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Top right My Bookings button */}
      <button
        className="absolute top-0 z-20 flex items-center px-2 py-2 text-white transition bg-blue-500 rounded-lg shadow right-8 hover:bg-blue-600"
        onClick={() => navigate("/my-bookings")}
        title="View My Bookings"
      >
        <FaClipboardList className="mr-2" />
        My Bookings
      </button>

      <div className="flex p-4">
        {/* Sidebar */}
        <aside className="flex flex-col w-1/5 mr-4 space-y-4">
          {/* Event Selection Box */}
          <div className="p-4 mb-3 bg-gray-200 shadow rounded-xl min-h-[288px] flex flex-col justify-start">
            <h2 className="mb-4 text-xl font-semibold">Events</h2>
            <ul className="space-y-2">
              {events.map((event) => (
                <li
                  key={event.id}
                  onClick={() => setSelectedEventId(event.id)}
                  className={`cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-300 transition-all duration-200 ease-in-out transform hover:scale-105 ${
                    event.id === selectedEventId ? "bg-blue-400 font-bold" : ""
                  }`}
                >
                  {event.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Filter Panel */}
          <div className="p-4 bg-gray-300 shadow rounded-xl">
            <h2 className="mb-4 text-xl font-semibold">Filters</h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Search by Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter name"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Price Range</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  className="w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Min"
                  min="0"
                  max="5000"
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  className="w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Max"
                  min="0"
                  max="5000"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <button
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 ease-in-out transform hover:scale-105"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex flex-col flex-1 overflow-y-auto h-[calc(100vh-100px)]">
          <h2 className="mb-0 text-2xl font-semibold">
            {getSelectedEvent().name} Accommodations
          </h2>
          {successMessage && (
            <div className="p-4 mb-4 text-green-800 bg-green-100 border border-green-300 rounded">
              {successMessage}
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAccommodations.map((acc) => (
              <div
                key={acc.id}
                className="flex flex-col items-center p-6 bg-white shadow rounded-xl cursor-pointer hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
                onClick={() => setSelectedAccommodation(acc)}
              >
                <img
                  src={acc.image}
                  alt={acc.name}
                  className="object-cover w-full h-[300px] mb-4 rounded-lg"
                />
                <h3 className="text-lg font-medium">{acc.name}</h3>
                <p className="mb-2 text-gray-600">${acc.price}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Booking Modal */}
      {selectedAccommodation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Book {selectedAccommodation.name}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your full name"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your email address"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Phone</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your 10-digit phone number"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Check-In</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={customer.checkIn}
                  onChange={(e) => setCustomer({ ...customer, checkIn: e.target.value })}
                />
                {errors.checkIn && <p className="text-sm text-red-500">{errors.checkIn}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Check-Out</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={customer.checkOut}
                  onChange={(e) => setCustomer({ ...customer, checkOut: e.target.value })}
                />
                {errors.checkOut && <p className="text-sm text-red-500">{errors.checkOut}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Message</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Optional: Add any special requests or notes"
                  value={customer.message}
                  onChange={(e) => setCustomer({ ...customer, message: e.target.value })}
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg"
                  onClick={() => setSelectedAccommodation(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccommodationList;