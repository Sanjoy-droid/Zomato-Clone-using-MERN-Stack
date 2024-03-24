import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";

import appContext from "../context/GlobalContext/appContext";
import Navbar from "../Navbar";
import Cards from "./Cards";
import Footer from "./Footer";
const Delivery = ({ showAlert }) => {
  const location = useLocation();

  const isDeliveryPage = location.pathname === "/order-online";

  const context = useContext(appContext);
  const { data, setData } = context;

  // Rating
  const [isRating, setIsRating] = useState(false);

  const handleRating = () => {
    setIsRating(!isRating);
  };

  // Pure Veg
  const [isVeg, setIsVeg] = useState(false);

  const handleVeg = () => {
    setIsVeg(!isVeg);
  };

  // Filter data based on rating and vegetarian options
  const filteredData = data.filter((item) => {
    // Check if the item passes the rating filter if isRating is true
    if (isRating && item.rating < 4.0) {
      return false; // Exclude items with rating less than 4.0
    }

    // Check if the item is vegetarian if isVeg is true
    if (isVeg && !item.veg) {
      return false; // Exclude non-vegetarian items
    }

    // Include the item if it passes all filters
    return true;
  });

  return (
    <>
      <Navbar showAlert={showAlert} />
      {/* Different Sections Bar */}
      <div className="sections mt-14 ml-8 flex items-center space-x-12 font-semibold text-lg ">
        {/* Delevery */}
        <Link to="/order-online">
          <div className="delivery flex items-center   space-x-2  cursor-pointer h-20 border-b-2 border-red-500">
            <img
              className={`w-12 h-12 p-2 rounded-full ${
                isDeliveryPage ? "bg-yellow-100" : ""
              }`}
              src="/del_logo.avif"
              alt=""
            />

            <p className="text-red-500">Delivery</p>
          </div>
        </Link>

        {/* Dining Out */}
        <Link to="/dine-out">
          <div className="dining-out flex items-center space-x-4 cursor-pointer">
            <img
              className="w-12 h-12 p-2 rounded-full grayscale"
              src="/dine1.avif"
              alt=""
            />
            <p className="text-gray-800">Dining Out</p>
          </div>
        </Link>
        {/*Nightlife*/}
        <Link to="/nightlife">
          <div className="nightlife flex items-center space-x-4 cursor-pointer">
            <img
              className="w-12 h-12 p-2 rounded-full grayscale"
              src="/night1.webp"
              alt=""
            />
            <p className="text-gray-800">Nightlife</p>
          </div>
        </Link>
      </div>
      <div className="line-1 border-b border-gray-400 mx-8  "></div>

      {/* Interaction */}

      <div className="filters flex items-center mt-8 ml-8  w-36 space-x-4">
        {/* Filters*/}
        <div className="filters border-2 border-gray-400 rounded-lg  cursor-pointer ">
          <pre>
            <p className="font-sans text-sm w-[5rem] p-1 text-gray-900 flex justify-center">
              {isRating && isVeg ? (
                <>
                  <p className="text-base flex justify-evenly items-center">
                    <span className=" bg-red-400 flex justify-center rounded-md w-6">
                      2
                    </span>
                    <span className=" ">Filters</span>
                  </p>
                </>
              ) : isRating || isVeg ? (
                <>
                  <p className="text-base flex justify-evenly items-center">
                    <span className=" bg-red-400 flex justify-center rounded-md w-6">
                      1
                    </span>
                    <span className=" ">Filters</span>
                  </p>
                </>
              ) : (
                "Filters"
              )}
            </p>
          </pre>
        </div>
        {/* Rating */}
        <div
          onClick={handleRating}
          className={`Rating border-2 border-gray-400 rounded-lg cursor-pointer ${
            isRating ? "bg-red-400 " : ""
          }`}
        >
          <pre>
            <p className="font-sans text-sm p-1 text-gray-900">
              {isRating ? (
                <>
                  <p className="text-base">
                    Rating 4.0+ <FontAwesomeIcon icon={faCircleXmark} />
                  </p>
                </>
              ) : (
                "Rating 4.0+"
              )}
            </p>
          </pre>
        </div>
        {/* Pure Veg*/}
        <div
          onClick={handleVeg}
          className={`pure-veg border-2 border-gray-400 rounded-lg  cursor-pointer ${
            isVeg ? "bg-red-400" : ""
          }`}
        >
          <pre>
            <p className="font-sans text-sm p-1 text-gray-900">
              {isVeg ? (
                <>
                  <p className="text-base">
                    Pure Veg <FontAwesomeIcon icon={faCircleXmark} />
                  </p>
                </>
              ) : (
                <>Pure Veg</>
              )}
            </p>
          </pre>
        </div>
        {/* Cuisines */}
        <div className="cuisines  border-2 border-gray-400 rounded-lg cursor-pointer ">
          <pre>
            <p className="font-sans text-sm p-1 text-gray-900">Cuisines </p>
          </pre>
        </div>
      </div>

      {/* Products */}
      <div className="container m-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
        {filteredData.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Delivery;
