import React from 'react';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-semibold">Management Your Events With Us!</h1>
      <button className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;