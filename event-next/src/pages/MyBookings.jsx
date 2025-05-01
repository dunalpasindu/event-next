import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const [updatedCustomer, setUpdatedCustomer] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/accommodations");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/accommodations/${bookingId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
      } else {
        alert("Failed to cancel booking.");
      }
    } catch {
      alert("Failed to cancel booking.");
    }
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
    setUpdatedCustomer({ ...booking.customer });
  };

  const handleUpdateBooking = async () => {
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
      } else {
        alert("Failed to update booking.");
      }
    } catch {
      alert("Failed to update booking.");
    }
  };

  if (loading) {
    return <div className="p-8 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-4xl p-6 mx-auto mt-8 bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-blue-600">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="h-[500px] overflow-y-auto flex flex-col gap-6 pr-2">
          {bookings.map((booking, idx) => (
            <div
              key={booking._id || idx}
              className="relative flex flex-row items-center w-full p-4 shadow bg-gray-50 rounded-xl"
            >
              {/* Booking Details */}
              <div className="flex-1 min-w-0">
                <div className="text-lg font-bold text-black">{booking.accommodationName}</div>
                <div className="mb-2 text-sm text-gray-500">{booking.eventName}</div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Check-in: </span>
                  <span>{new Date(booking.customer.checkIn).toLocaleDateString()}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Check-out: </span>
                  <span>{new Date(booking.customer.checkOut).toLocaleDateString()}</span>
                </div>
                <div className="mb-2">
                  <div className="font-semibold text-gray-700">{booking.customer.name}</div>
                  <div className="text-sm text-gray-600">{booking.customer.phone}</div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-col items-end ml-4 min-w-[100px]">
                <button
                  className="flex items-center px-3 py-1 mb-2 text-sm text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
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
          ))}
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
                  value={updatedCustomer.name}
                  onChange={(e) =>
                    setUpdatedCustomer({ ...updatedCustomer, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={updatedCustomer.email}
                  onChange={(e) =>
                    setUpdatedCustomer({ ...updatedCustomer, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Phone</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={updatedCustomer.phone}
                  onChange={(e) =>
                    setUpdatedCustomer({ ...updatedCustomer, phone: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Check-In</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={updatedCustomer.checkIn}
                  onChange={(e) =>
                    setUpdatedCustomer({ ...updatedCustomer, checkIn: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Check-Out</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={updatedCustomer.checkOut}
                  onChange={(e) =>
                    setUpdatedCustomer({ ...updatedCustomer, checkOut: e.target.value })
                  }
                />
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