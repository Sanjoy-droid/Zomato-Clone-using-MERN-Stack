import { Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
const Delivery = () => {
  const location = useLocation();

  const isDeliveryPage = location.pathname === "/order-online";

  return (
    <>
      <Navbar />
      {/* Different Sections Bar */}
      <div className="sections mt-14 ml-8 flex items-center space-x-12 text-xl ">
        {/* Delevery */}
        <Link to="/order-online">
          <div className="delivery flex items-center space-x-4 cursor-pointer">
            <FontAwesomeIcon icon={faTruck} style={{ fontSize: "1.5em" }} />

            <p className="text-gray-800">Delivery</p>
          </div>
        </Link>

        {/* Dining Out */}
        <Link to="/dine-out">
          <div className="dining-out flex items-center space-x-4 cursor-pointer">
            <FontAwesomeIcon icon={faUtensils} style={{ fontSize: "1.5em" }} />
            <p className="text-gray-800">Dining Out</p>
          </div>
        </Link>
        {/*Nightlife*/}
        <Link to="/nightlife">
          <div className="nightlife flex items-center space-x-4 cursor-pointer">
            <FontAwesomeIcon icon={faMoon} style={{ fontSize: "1.5em" }} />

            <p className="text-gray-800">Nightlife</p>
          </div>
        </Link>
      </div>
      <div className="line-1 border-b border-gray-400 mx-8 mt-8 "></div>
      {/* Filters */}
      <div className="filters flex mt-8 ml-4">
        {/* Rating */}
        <div className="Rating h-8 w-20 border-2 border-gray-400 ">
          <pre>
            <p className="font-sans">Rating 4.0+</p>
          </pre>
        </div>
        {/* Rating */}
        <div className="Rating h-16 w-20 border-2 border-gray-400 ">
          <pre>
            <p className="font-sans">Rating 4.0+</p>
          </pre>
        </div>
        {/* Rating */}
        <div className="Rating h-16 w-20 border-2 border-gray-400 ">
          <pre>
            <p className="font-sans">Rating 4.0+</p>
          </pre>
        </div>
        {/* Rating */}
        <div className="Rating h-16 w-20 border-2 border-gray-400 ">
          <pre>
            <p className="font-sans">Rating 4.0+</p>
          </pre>
        </div>
      </div>
    </>
  );
};

export default Delivery;
