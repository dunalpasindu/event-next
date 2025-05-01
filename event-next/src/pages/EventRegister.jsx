import React, { useState } from 'react';

function EventRegister() {
  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    phoneNumber: '',
    eventType: 'Workshop',
    numberOfGuests: '',
    dietaryPreferences: 'No Preference',
    additionalComments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add form submission logic here
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Event Registration Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Organization / Company Name</label>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Select Event Type</label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="border rounded w-full p-2"
          >
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Meetup">Meetup</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Number of Guests</label>
          <input
            type="number"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Dietary Preferences</label>
          <select
            name="dietaryPreferences"
            value={formData.dietaryPreferences}
            onChange={handleChange}
            className="border rounded w-full p-2"
          >
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Halal">Halal</option>
            <option value="No Preference">No Preference</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Additional Comments</label>
          <textarea
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EventRegister;