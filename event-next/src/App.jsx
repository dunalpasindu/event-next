import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import EventRegister from './pages/EventRegister';
import Sponsor from './pages/Sponsor';
import Merchandise from './pages/Merchandise';
import Accommodation from './pages/Accommodation';
import MySponsorList from './pages/MySponsorList';
import SponsorUpdate from './pages/SponsorUpdate';

import EventsList from './pages/EventsList';
import EventUpdate from './pages/EventUpdate';

import MyOrders from './pages/MyOrders';
import MyBookings from './pages/MyBookings';


function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event-register" element={<EventRegister />} />
            <Route path="/sponsor" element={<Sponsor />} />
            <Route path="/merchandise" element={<Merchandise />} />
            <Route path="/accommodation" element={<Accommodation />} />


            <Route path="/my-sponsor-list" element={<MySponsorList />} />
            <Route path="/sponsor-update/:id" element={<SponsorUpdate />} />

            <Route path="/events-list" element={<EventsList />} />
            <Route path="/event-update/:id" element={<EventUpdate />} />

           
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/my-bookings" element={<MyBookings />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;