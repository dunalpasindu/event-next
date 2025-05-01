import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons

function EventsList() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          setError('Failed to fetch events');
        }
      } catch (err) {
        setError('An error occurred while fetching events');
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/events/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEvents(events.filter((event) => event._id !== id));
      } else {
        setError('Failed to delete the event');
      }
    } catch (err) {
      setError('An error occurred while deleting the event');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/event-update/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Events List</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {events.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Organization Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Phone Number</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Event Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Number of Guests</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Dietary Preferences</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Additional Comments</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr
                  key={event._id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="border border-gray-300 px-4 py-2">{event.organizationName}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.phoneNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.eventType}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.numberOfGuests}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.dietaryPreferences}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.additionalComments}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleUpdate(event._id)}
                      className="text-blue-500 hover:text-blue-700 transition duration-200 mr-4"
                      title="Update"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="text-red-500 hover:text-red-700 transition duration-200"
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No events found.</p>
      )}
    </div>
  );
}

export default EventsList;