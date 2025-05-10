import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

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
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const navigate = useNavigate(); // For navigation

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true); // Set loading state
    try {
      const response = await fetch('http://localhost:3000/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setFormData({
          organizationName: '',
          email: '',
          phoneNumber: '',
          eventType: 'Workshop',
          numberOfGuests: '',
          dietaryPreferences: 'No Preference',
          additionalComments: '',
        });
        setErrors({});
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.message });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred while submitting the form.' });
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  const handleReset = () => {
    setFormData({
      organizationName: '',
      email: '',
      phoneNumber: '',
      eventType: 'Workshop',
      numberOfGuests: '',
      dietaryPreferences: 'No Preference',
      additionalComments: '',
    });
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className='max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg relative'>
      {/* My Events List Button */}
      <button
        onClick={() => navigate('/events-list')}
        className="absolute top-6 right-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        My Events List
      </button>

      <h1 className="text-2xl font-bold">Event Registration Form</h1>
      {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
      {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset>
          <legend className="text-lg font-medium">Organization Details</legend>
          <div>
            <label className="block font-medium">Organization / Company Name</label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              className="border rounded w-full p-2"
              placeholder="Enter your organization name"
              required
              aria-required="true"
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
              placeholder="Enter your email"
              required
              aria-required="true"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-lg font-medium">Event Details</legend>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border rounded w-full p-2"
              placeholder="Enter your phone number"
              required
              aria-required="true"
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
              placeholder="Enter number of guests"
              required
              aria-required="true"
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
              placeholder="Enter any additional comments"
            />
          </div>
        </fieldset>

        <div className="flex space-x-4">
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventRegister;