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
      <div className="relative w-full h-[50vh] overflow-hidden">
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
      <div className="mt-8 mx-auto w-4/5 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">About Us</h2>
        <p className="text-gray-700 text-sm">
        Welcome to EventNext – your all-in-one platform for seamless event management. Whether you're organizing a corporate conference, a dream wedding, a fundraiser, or a vibrant community gathering, we’re here to simplify every step of the process.

At EventNext, we believe that creating memorable events shouldn't be complicated. That's why we've built a powerful yet easy-to-use platform that empowers event organizers of all sizes to plan, manage, and execute successful events from start to finish.

Our comprehensive suite of tools includes event registration, sponsor interest management, merchandise sales, and accommodation requests – all integrated into one centralized system. With EventNext, you can effortlessly track RSVPs, communicate with attendees, manage vendor relationships, and handle logistics, all in one place.

We’re passionate about helping our users focus on what really matters: creating meaningful, unforgettable experiences for their guests. Backed by modern technology and a dedicated support team, EventNext is more than just software – it’s your partner in planning.

Join thousands of successful event planners who trust EventNext to bring their visions to life. Let us help you turn your next event into something extraordinary.
        </p>
      </div>
    </div>
  );
}

export default Home;