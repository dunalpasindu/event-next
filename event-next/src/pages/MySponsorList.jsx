import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function MySponsorList() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch sponsor data from the backend
    const fetchSponsors = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sponsors'); // Backend API endpoint
        const data = await response.json();
        setSponsors(data); // Set the fetched data to state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sponsor data:', error);
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  // Handle delete sponsor
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/sponsors/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSponsors(sponsors.filter((sponsor) => sponsor._id !== id)); // Remove the deleted sponsor from the state
      } else {
        console.error('Failed to delete sponsor');
      }
    } catch (error) {
      console.error('Error deleting sponsor:', error);
    }
  };

  // Handle update sponsor (navigate to update form or handle inline)
  const handleUpdate = (id) => {
    navigate(`/sponsor-update/${id}`); // Navigate to the SponsorUpdate page with the sponsor ID
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">My Sponsor List</h1>
      {sponsors.length === 0 ? (
        <p>No sponsors found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Organization Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Phone Number</th>
              <th className="border border-gray-300 p-2">Budget Range</th>
              <th className="border border-gray-300 p-2">Event</th>
              <th className="border border-gray-300 p-2">Message</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map((sponsor) => (
              <tr key={sponsor._id}>
                <td className="border border-gray-300 p-2">{sponsor.organizationName}</td>
                <td className="border border-gray-300 p-2">{sponsor.email}</td>
                <td className="border border-gray-300 p-2">{sponsor.phoneNumber}</td>
                <td className="border border-gray-300 p-2">{sponsor.budgetRange}</td>
                <td className="border border-gray-300 p-2">{sponsor.event}</td>
                <td className="border border-gray-300 p-2">{sponsor.message}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleUpdate(sponsor._id)}
                    className="bg-yellow-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-yellow-600 transition mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(sponsor._id)}
                    className="bg-red-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MySponsorList;