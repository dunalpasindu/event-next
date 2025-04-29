import React, { useState, useEffect } from 'react';

const images = [
  '/src/assets/1.jpg',
  '/src/assets/2.jpg',
  '/src/assets/3.jpg',
  '/src/assets/4.jpg',
  '/src/assets/5.jpg',
  '/src/assets/6.jpg',
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div className="relative w-full h-[60vh] overflow-hidden">
        {/* Text in the middle of the image */}
        <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white bg-black bg-opacity-50 z-10">
          Manage Your Event with EventNext!
        </h1>
        {/* Slideshow Container */}
        <div
          className="absolute top-0 left-0 w-full h-full flex transition-transform duration-1000"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <div className="mt-8 mx-auto w-3/4 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">About Us</h2>
        <p className="text-gray-700 text-lg">
          Welcome to EventNext, your one-stop solution for managing events seamlessly. 
          Whether you're planning a corporate event, a wedding, or a community gathering, 
          our platform provides all the tools you need to make your event a success. 
          From event registration to sponsor management, merchandise sales, and accommodation requests, 
          we've got you covered. Let us help you create unforgettable experiences!
        </p>
      </div>
    </div>
  );
}

export default Home;