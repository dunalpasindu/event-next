import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for Update and Delete

function MySponsorList() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sponsors');
        const data = await response.json();
        setSponsors(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sponsor data:', error);
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/sponsors/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSponsors(sponsors.filter((sponsor) => sponsor._id !== id));
      } else {
        console.error('Failed to delete sponsor');
      }
    } catch (error) {
      console.error('Error deleting sponsor:', error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/sponsor-update/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">My Sponsor List</h1>
      {sponsors.length === 0 ? (
        <p className="text-gray-600">No sponsors found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-200">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="border border-gray-200 p-3">Organization Name</th>
                <th className="border border-gray-200 p-3">Email</th>
                <th className="border border-gray-200 p-3">Phone Number</th>
                <th className="border border-gray-200 p-3">Budget Range</th>
                <th className="border border-gray-200 p-3">Event</th>
                <th className="border border-gray-200 p-3">Message</th>
                <th className="border border-gray-200 p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sponsors.map((sponsor, index) => (
                <tr
                  key={sponsor._id}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="border border-gray-200 p-3">{sponsor.organizationName}</td>
                  <td className="border border-gray-200 p-3">{sponsor.email}</td>
                  <td className="border border-gray-200 p-3">{sponsor.phoneNumber}</td>
                  <td className="border border-gray-200 p-3">{sponsor.budgetRange}</td>
                  <td className="border border-gray-200 p-3">{sponsor.event}</td>
                  <td className="border border-gray-200 p-3">{sponsor.message}</td>
                  <td className="border border-gray-200 p-3 text-center">
                    <button
                      onClick={() => handleUpdate(sponsor._id)}
                      className="text-blue-600 hover:text-blue-800 transition mx-2"
                      title="Update"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(sponsor._id)}
                      className="text-red-600 hover:text-red-800 transition mx-2"
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
      )}
    </div>
  );
}

export default MySponsorList;