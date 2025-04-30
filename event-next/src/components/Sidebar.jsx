import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-max p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">EventNext</h2>
      <ul className="space-y-6">
      <li>
          <Link
            to="/"
            className="block bg-gray-800 hover:bg-blue-600 transition-colors p-3 rounded-lg text-center"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/event-register"
            className="block bg-gray-800 hover:bg-blue-600 transition-colors p-3 rounded-lg text-center"
          >
            Event Registration
          </Link>
        </li>
        <li>
          <Link
            to="/sponsor"
            className="block bg-gray-800 hover:bg-blue-600 transition-colors p-3 rounded-lg text-center"
          >
            Sponsor Interest
          </Link>
        </li>
        <li>
          <Link
            to="/merchandise"
            className="block bg-gray-800 hover:bg-blue-600 transition-colors p-3 rounded-lg text-center"
          >
            Merchandise
          </Link>
        </li>
        <li>
          <Link
            to="/accommodation"
            className="block bg-gray-800 hover:bg-blue-600 transition-colors p-3 rounded-lg text-center"
          >
            Accommodation
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;