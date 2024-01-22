// App.jsx

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import Home from "./Home";
import JumboTron from "./JumboTron";
import Delivery from "./ComponentPages/Delivery";
import Test from "./ComponentPages/Test";
import DineOut from "./ComponentPages/DineOut";
import Nightlife from "./ComponentPages/Nightlife";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/order-online" element={<Delivery />} />
          <Route exact path="/dine-out" element={<DineOut />} />
          <Route exact path="/nightlife" element={<Nightlife />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
