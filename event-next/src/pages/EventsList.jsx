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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200"
            >
              <p className="text-gray-600 mb-1">
              <strong>Company/ Organization:</strong> {event.organizationName}
              </p>
             
              <p className="text-gray-600 mb-1">
                <strong>Email:</strong> {event.email}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Phone:</strong> {event.phoneNumber}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Event Type:</strong> {event.eventType}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Guests:</strong> {event.numberOfGuests}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Dietary Preferences:</strong> {event.dietaryPreferences}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Comments:</strong> {event.additionalComments}
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleUpdate(event._id)}
                  className="text-blue-500 hover:text-blue-700 transition duration-200"
                  title="Update"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                  title="Delete"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No events found.</p>
      )}
    </div>
  );
}

export default EventsList;