import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import Navbar from "../Navbar";
import NIghtlifeCards from "./Nightlife/NIghtlifeCards";
import nightlifeContext from "../context/GlobalContext/nightlifeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

const Nightlife = ({ showAlert }) => {
  const location = useLocation();

  const isDeliveryPage = location.pathname === "/nightlife";

  const context = useContext(nightlifeContext);
  const { nightlifes, setNightlifes } = context;

  // Rating
  const [isRating, setIsRating] = useState(false);
  const handleRating = () => {
    setIsRating(!isRating);
  };

  // Gold
  const [isGold, setIsGold] = useState(false);
  const handleGold = () => {
    setIsGold(!isGold);
  };

  const filteredData = nightlifes.filter((item) => {
    // Check if the item passes the rating filter if isRating is true
    if (isRating && item.rating < 4.0) {
      return false; // Exclude items with rating less than 4.0
    }

    // Check if the item passes the gold filter if gold is true
    if (isGold && !item.gold) {
      return false;
    }
    return true;
  });

  return (
    <>
      <Navbar showAlert={showAlert} />
      {/* Different Sections Bar */}
      <div className="sections mt-14 ml-8 flex items-center space-x-12 font-semibold text-lg ">
        {/* Delevery */}
        <Link to="/order-online">
          <div className="delivery flex items-center   space-x-2  cursor-pointer ">
            <img
              className="w-12 h-12 p-2 rounded-full grayscale"
              src="../del_logo.avif"
              alt=""
            />

            <p className="text-gray-800">Delivery</p>
          </div>
        </Link>

        {/* Dining Out */}
        <Link to="/dine-out">
          <div className="dining-out flex items-center space-x-4 cursor-pointer">
            <img
              className="w-12 h-12 p-2 rounded-full grayscale"
              src="../dine1.avif"
              alt=""
            />
            <p className="text-gray-800">Dining Out</p>
          </div>
        </Link>
        {/*Nightlife*/}
        <Link to="/nightlife">
          <div className="nightlife flex items-center space-x-4 cursor-pointer h-20 border-b-2 border-red-500">
            <img
              className={`w-12 h-12 p-2 rounded-full ${
                isDeliveryPage ? "bg-blue-100" : ""
              }`}
              src="../night1.webp"
              alt=""
            />
            <p className="text-red-500">Nightlife</p>
          </div>
        </Link>
      </div>
      <div className="line-1 border-b border-gray-400 mx-8  "></div>

      {/* Filters */}
      <div className="filters flex items-center pl-8  w-full h-16 bg-white  space-x-4 sticky top-0 z-10">
        {/* Filters*/}

        <div className="filters border-2 border-gray-400 rounded-lg  cursor-pointer w-[5rem] ">
          <pre>
            <p className="font-sans text-sm p-1 text-gray-900 flex justify-center">
              {isGold || isRating ? (
                <>
                  <p className="text-base flex justify-evenly items-center">
                    <span className="bg-red-400 flex justify-center rounded-md w-6">
                      {(isRating ? 1 : 0) + (isGold ? 1 : 0)}
                    </span>
                    <span>Filters</span>
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
          className={`Rating   border-2 border-gray-400 rounded-lg  cursor-pointer ${
            isRating ? "bg-red-400" : ""
          }`}
          onClick={handleRating}
        >
          <pre>
            <p className="font-sans text-sm p-1 text-gray-900">Rating 4.0+</p>
          </pre>
        </div>
        {/* Gold*/}
        <div
          className={`gold border-2 border-gray-400 rounded-lg  cursor-pointer w-20 ${
            isGold ? "bg-red-400" : ""
          }`}
          onClick={handleGold}
        >
          <pre className="flex justify-center items-center ">
            <FontAwesomeIcon className="text-yellow-600" icon={faCrown} />
            <p className="font-sans text-sm p-1 text-gray-900">Gold</p>
          </pre>
        </div>
      </div>

      {/* Nightlife Resturants */}

      <div className="container m-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
        {filteredData.map((item) => (
          <NIghtlifeCards key={item.id} item={item} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Nightlife;
