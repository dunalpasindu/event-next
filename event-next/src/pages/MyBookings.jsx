import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { events } from "../data/events"; // Import events data

function getAccommodationImage(accommodationId) {
  for (const event of events) {
    const accommodation = event.accommodations.find((acc) => acc.id === accommodationId);
    if (accommodation) {
      return accommodation.image;
    }
  }
  return "https://via.placeholder.com/150"; // Default placeholder image
}

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const [updatedCustomer, setUpdatedCustomer] = useState({});
  const [errors, setErrors] = useState({});
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false); // State for showing cancel confirmation popup
  const [cancelSuccessMessage, setCancelSuccessMessage] = useState(""); // State for cancel success message
  const [bookingToCancel, setBookingToCancel] = useState(null); // State for the booking to cancel

  const validateEditForm = () => {
    const newErrors = {};
    if (!updatedCustomer.name.trim()) newErrors.name = "Name is required";
    if (!updatedCustomer.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedCustomer.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!updatedCustomer.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(updatedCustomer.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!updatedCustomer.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!updatedCustomer.checkOut) {
      newErrors.checkOut = "Check-out date is required";
    } else if (new Date(updatedCustomer.checkOut) <= new Date(updatedCustomer.checkIn)) {
      newErrors.checkOut = "Check-out date must be after check-in date";
    }
    return newErrors;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/accommodations");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Sort bookings so newest (by creation date or _id) are at the top
        const sorted = Array.isArray(data)
          ? [...data].sort((a, b) => {
              // Prefer createdAt if available, else fallback to _id
              if (a.createdAt && b.createdAt) {
                return new Date(b.createdAt) - new Date(a.createdAt);
              }
              // Fallback: sort by _id (MongoDB ObjectId is time-based)
              if (a._id && b._id) {
                return b._id.localeCompare(a._id);
              }
              return 0;
            })
          : data;
        setBookings(sorted);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancelBooking = (bookingId) => {
    setBookingToCancel(bookingId);
    setShowCancelConfirmation(true);
  };

  const confirmCancelBooking = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/accommodations/${bookingToCancel}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((booking) => booking._id !== bookingToCancel));
        setCancelSuccessMessage("Booking canceled successfully.");
        setTimeout(() => setCancelSuccessMessage(""), 5000); // Clear message after 3 seconds
      } else {
        setCancelSuccessMessage("Failed to cancel booking. Please try again.");
        setTimeout(() => setCancelSuccessMessage(""), 3000); // Clear message after 3 seconds
      }
    } catch {
      setCancelSuccessMessage("Failed to cancel booking. Please try again.");
      setTimeout(() => setCancelSuccessMessage(""), 3000); // Clear message after 3 seconds
    } finally {
      setShowCancelConfirmation(false);
      setBookingToCancel(null);
    }
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
    setUpdatedCustomer({ ...booking.customer });
    setErrors({});
  };

  const handleUpdateBooking = async () => {
    const validationErrors = validateEditForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/accommodations/${editingBooking._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: updatedCustomer }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === editingBooking._id
              ? { ...booking, customer: updatedCustomer }
              : booking
          )
        );
        setEditingBooking(null);
        setCancelSuccessMessage("Booking updated successfully.");
        setTimeout(() => setCancelSuccessMessage(""), 5000); // Clear message after 3 seconds
      } else {
        setCancelSuccessMessage("Failed to update booking. Please try again.");
        setTimeout(() => setCancelSuccessMessage(""), 3000); // Clear message after 3 seconds
      }
    } catch {
      setCancelSuccessMessage("Failed to update booking. Please try again.");
      setTimeout(() => setCancelSuccessMessage(""), 3000); // Clear message after 3 seconds
    }
  };

  if (loading) {
    return <div className="p-8 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-4xl p-6 mx-auto mt-8 bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-blue-600">My Bookings</h1>
      {cancelSuccessMessage && (
        <div className="p-4 mb-4 text-green-800 bg-green-100 border border-green-300 rounded">
          {cancelSuccessMessage}
        </div>
      )}
      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="h-[500px] overflow-y-auto flex flex-col gap-6 pr-2">
          {bookings.map((booking, idx) => (
            <div
              key={booking._id || idx}
              className="relative flex flex-row items-center w-full p-4 shadow bg-gray-50 rounded-xl"
            >
              {/* Booking Image */}
              <div className="flex-shrink-0 w-24 h-24 mr-4">
                <img
                  src={getAccommodationImage(booking.accommodationId)}
                  alt={booking.accommodationName}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              {/* Booking Details */}
              <div className="flex-1 min-w-0">
                <div className="text-lg font-bold text-black">{booking.accommodationName}</div>
                <div className="mb-2 text-sm text-gray-500">{booking.eventName}</div>
                <div className="mb-2">
                  <div className="font-semibold text-gray-700">{booking.customer.name}</div>
                  <div className="text-sm text-gray-600">{booking.customer.email}</div>
                  <div className="text-sm text-gray-600">{booking.customer.phone}</div>
                </div>
              </div>
              {/* Booking Price */}
              <div className="flex flex-col items-end ml-4 min-w-[100px]">
                <div className="text-lg font-bold text-blue-600">${booking.price.toFixed(2)}</div>
                <div className="text-sm text-gray-500">Price</div>
                <div className="flex mt-2 space-x-2">
                  <button
                    className="flex items-center px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
                    onClick={() => handleEditBooking(booking)}
                    title="Edit Booking"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    className="flex items-center px-3 py-1 text-sm text-red-600 bg-red-100 rounded hover:bg-red-200"
                    onClick={() => handleCancelBooking(booking._id)}
                    title="Cancel Booking"
                  >
                    <FaTrashAlt className="mr-1" /> Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Confirm Cancellation</h2>
            <p className="mb-4">Are you sure you want to cancel this booking?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg"
                onClick={() => setShowCancelConfirmation(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                onClick={confirmCancelBooking}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Edit Booking</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateBooking();
              }}
            >
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your full name"
                  value={updatedCustomer.name}
                  onChange={(e) =>
                    setUpdatedCustomer({ ...updatedCustomer, name: e.target.value })
                  }
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your email address"
                  value={updatedCustomer.email}
                  onChange={(e) =>
                    setUpdatedCustomer({ ...updatedCustomer, email: e.target.value })
                  }
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Phone</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your 10-digit phone number"
                  value={updatedCustomer.phone}
                  onChange={(e) =>
                    setUpdatedCustomer({ ...updatedCustomer, phone: e.target.value })
                  }
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Check-In</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={updatedCustomer.checkIn ? new Date(updatedCustomer.checkIn).toISOString().split('T')[0] : ''}
                  onChange={(e) =>
                    setUpdatedCustomer({ ...updatedCustomer, checkIn: e.target.value })
                  }
                />
                {errors.checkIn && <p className="text-sm text-red-500">{errors.checkIn}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Check-Out</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={updatedCustomer.checkOut ? new Date(updatedCustomer.checkOut).toISOString().split('T')[0] : ''}
                  onChange={(e) =>
                    setUpdatedCustomer({ ...updatedCustomer, checkOut: e.target.value })
                  }
                />
                {errors.checkOut && <p className="text-sm text-red-500">{errors.checkOut}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Message</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Optional: Add any special requests or notes"
                  value={updatedCustomer.message}
                  onChange={(e) =>
                    setUpdatedCustomer({ ...updatedCustomer, message: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg"
                  onClick={() => setEditingBooking(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookings;