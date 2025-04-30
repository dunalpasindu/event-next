import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Events List</h1>
      {error && <p className="text-red-500">{error}</p>}
      {events.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Organization Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone Number</th>
              <th className="border border-gray-300 px-4 py-2">Event Type</th>
              <th className="border border-gray-300 px-4 py-2">Number of Guests</th>
              <th className="border border-gray-300 px-4 py-2">Dietary Preferences</th>
              <th className="border border-gray-300 px-4 py-2">Additional Comments</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td className="border border-gray-300 px-4 py-2">{event.organizationName}</td>
                <td className="border border-gray-300 px-4 py-2">{event.email}</td>
                <td className="border border-gray-300 px-4 py-2">{event.phoneNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{event.eventType}</td>
                <td className="border border-gray-300 px-4 py-2">{event.numberOfGuests}</td>
                <td className="border border-gray-300 px-4 py-2">{event.dietaryPreferences}</td>
                <td className="border border-gray-300 px-4 py-2">{event.additionalComments}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleUpdate(event._id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default EventsList;