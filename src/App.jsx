// App.jsx

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Delivery from "./ComponentPages/Delivery";
import DineOut from "./ComponentPages/DineOut";
import AppState from "./context/GlobalContext/AppState";
import Nightlife from "./ComponentPages/Nightlife";
import SignupModal from "./ComponentPages/Login Signup/SignupModal";
import LoginModal from "./ComponentPages/Login Signup/LoginModal";

function App() {
  return (
    <>
      <AppState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/order-online" element={<Delivery />} />
            <Route exact path="/dine-out" element={<DineOut />} />
            <Route exact path="/nightlife" element={<Nightlife />} />

            {/* Login */}
            <Route exact path="/login" element={<LoginModal />} />
            {/* Signup */}
            <Route exact path="/signup" element={<SignupModal />} />
          </Routes>
        </Router>
      </AppState>
    </>
  );
}

export default App;
