import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import EventRegister from './pages/EventRegister';
import Sponsor from './pages/Sponsor';
import Merchandise from './pages/Merchandise';
import Accommodation from './pages/Accommodation';

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
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