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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error for the field being updated
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits.';
    }
    if (!formData.numberOfGuests.trim()) {
      newErrors.numberOfGuests = 'Number of guests is required.';
    } else if (isNaN(formData.numberOfGuests) || formData.numberOfGuests <= 0) {
      newErrors.numberOfGuests = 'Number of guests must be a positive number.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('Form Data Submitted:', formData);
    // Add form submission logic here
  };

  return (
    <div className='max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
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
          {errors.organizationName && <p className="text-red-500 text-sm">{errors.organizationName}</p>}
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
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
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
            <option value="Seminar">Concert</option>
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
          {errors.numberOfGuests && <p className="text-red-500 text-sm">{errors.numberOfGuests}</p>}
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