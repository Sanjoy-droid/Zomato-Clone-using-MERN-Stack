// App.jsx

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";

import Home from "./ComponentPages/Home/Home";
import Delivery from "./ComponentPages/Delivery/Delivery";
import DineOut from "./ComponentPages/Dining Out/DineOut";
import AppState from "./context/GlobalContext/AppState";
import Nightlife from "./ComponentPages/Nightlife/Nightlife";
import SignupModal from "./ComponentPages/Login Signup/SignupModal";
import LoginModal from "./ComponentPages/Login Signup/LoginModal";
import Alert from "./ComponentPages/Alerts";
import DeliveryProductDetail from "./ComponentPages/Delivery/DeliveryProductDetail";
import DiningDetail from "./ComponentPages/Dining Out/DiningDetail";
import NightlifeDetail from "./ComponentPages/Nightlife/NightlifeDetail";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      console.log("Timeout executed");
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <Router>
        <AppState>
          <Alert alert={alert} setAlert={setAlert} />

          {/* <RenderNavbar showAlert={showAlert} /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              exact
              path="/order-online"
              element={<Delivery showAlert={showAlert} />}
            />
            <Route
              exact
              path="/dine-out"
              element={<DineOut showAlert={showAlert} />}
            />
            <Route
              exact
              path="/nightlife"
              element={<Nightlife showAlert={showAlert} />}
            />
            <Route
              exact
              path="/login"
              element={<LoginModal showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<SignupModal showAlert={showAlert} />}
            />
            <Route
              exact
              path="/order-online/delivery-detail/:id"
              element={<DeliveryProductDetail />}
            />
            <Route
              exact
              path="/dine-out/dine-detail/:id"
              element={<DiningDetail />}
            />
            <Route
              exact
              path="/nightlife/nightlife-detail/:id"
              element={<NightlifeDetail />}
            />
          </Routes>
        </AppState>
      </Router>
    </>
  );
}

export default App;
