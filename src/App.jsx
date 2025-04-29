import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import EventRegister from './pages/EventRegister';
import Sponsor from './pages/Sponsor';
import Merchandise from './pages/Merchandise';
import Accommodation from './pages/Accommodation';

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/event-register" element={<EventRegister />} />
            <Route path="/sponsor" element={<Sponsor />} />
            <Route path="/merchandise" element={<Merchandise />} />
            <Route path="/accommodation" element={<Accommodation />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;