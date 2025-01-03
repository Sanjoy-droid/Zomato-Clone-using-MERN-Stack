// App.jsx

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useCallback, useState, lazy, Suspense } from "react";

import AppState from "./context/GlobalContext/AppState";
import Alert from "./ComponentPages/Alerts";
import Home from "./ComponentPages/Home/Home";
import LoadingSpinner from "./components/LoadingSpinner";

const Delivery = lazy(() => import("./ComponentPages/Delivery/Delivery"));
const DineOut = lazy(() => import("./ComponentPages/Dining Out/DineOut"));
const Nightlife = lazy(() => import("./ComponentPages/Nightlife/Nightlife"));
const SignupModal = lazy(
  () => import("./ComponentPages/Login Signup/SignupModal"),
);
const LoginModal = lazy(
  () => import("./ComponentPages/Login Signup/LoginModal"),
);
const DeliveryProductDetail = lazy(
  () => import("./ComponentPages/Delivery/DeliveryProductDetail"),
);
const DiningDetail = lazy(
  () => import("./ComponentPages/Dining Out/DiningDetail"),
);
const NightlifeDetail = lazy(
  () => import("./ComponentPages/Nightlife/NightlifeDetail"),
);

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = useCallback((message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      console.log("Timeout executed");
      setAlert(null);
    }, 1500);
  }, []);

  return (
    <>
      <Router>
        <AppState>
          <Alert alert={alert} setAlert={setAlert} />

          <Suspense fallback={<LoadingSpinner />}>
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
          </Suspense>
        </AppState>
      </Router>
    </>
  );
}

export default App;
