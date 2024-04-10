import { Link, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Navbar from "../Navbar";
import nightlifeContext from "../../context/GlobalContext/nightlifeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer";
import NightFilterModal from "./NightFilterModal";
import NightlifeCards from "./NightlifeCards";

const Nightlife = ({ showAlert }) => {
  const location = useLocation();

  const isDeliveryPage = location.pathname === "/nightlife";

  const context = useContext(nightlifeContext);
  const { nightlifes, getNightlife } = context;

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

  const [rating, setRating] = useState(null);
  const [sortBy, setSortBy] = useState("");

  // Filter resturants based on rating, open now, and outdoor seating options

  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  // Get Actual Rating Value from filter
  const filterRatingValue = (element) => {
    setRating(element);
  };

  // Get Actual Sortby Value from filter
  const filterSortByValue = (element) => {
    setSortBy(element);
  };

  const filteredData = nightlifes
    .filter((item) => {
      if (rating && item.rating < rating) {
        return false; // Exclude items with rating less than selected rating
      }
      // Check if the item passes the rating filter if isRating is true
      if (isRating && item.rating < 4.0) {
        return false; // Exclude items with rating less than 4.0
      }

      // Check if the item passes the gold filter if gold is true
      if (isGold && !item.gold) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Sorting logic based on sortBy value
      switch (sortBy) {
        case "Rating: High to Low":
          return b.rating - a.rating; // Sort by rating from high to low
        case "Distance":
          return a.distance - b.distance;
        case "Cost: Low to High":
          return a.price - b.price;
        case "Cost: High to Low":
          return b.price - a.price;
        default:
          return 0; // Default sorting
      }
    });

  useEffect(() => {
    getNightlife();
  }, []);

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
        <div
          onClick={() => {
            toggleFilter();
          }}
          className="filters border-2 border-gray-400 rounded-lg  cursor-pointer "
        >
          <pre>
            <p className="font-sans text-sm w-[5rem] p-1 text-gray-900 flex justify-center">
              {
                isRating || isGold || rating || sortBy ? ( // Check if any condition is true
                  <>
                    <span className="bg-red-400 flex justify-center rounded-md w-6">
                      {" "}
                      {(isRating ? 1 : 0) +
                        (isGold ? 1 : 0) +
                        (rating ? 1 : 0) +
                        (sortBy ? 1 : 0)}
                    </span>
                    <span> Filters</span>
                  </>
                ) : (
                  <span>Filters</span>
                ) // If all conditions are false, don't apply red coloring
              }
            </p>
          </pre>
          <NightFilterModal
            showFilter={showFilter}
            toggleFilter={toggleFilter}
            filterRatingValue={filterRatingValue}
            filterSortByValue={filterSortByValue}
          />
        </div>
        {/* Filter Custom Sort By */}
        {sortBy && (
          <button
            onClick={() => {
              setSortBy("");
            }}
            className="sort-by border-2 border-gray-400 w-48 h-8 rounded-lg flex items-center justify-center bg-red-400 text-gray-900"
          >
            <span className="font-sans text-sm flex justify-center items-center">
              <>
                <span className="text-base">
                  {sortBy} <FontAwesomeIcon icon={faCircleXmark} />
                </span>
              </>
            </span>
          </button>
        )}
        {/* Filter Custom Rating */}
        {rating && (
          <button
            onClick={() => {
              setRating(null);
            }}
            className="sort-by border-2 border-gray-400 w-52 h-8 rounded-lg flex items-center justify-center bg-red-400 text-gray-900"
          >
            <span className="font-sans text-sm flex justify-center items-center">
              <>
                <span className="text-base">
                  Custom Rating: {rating} +{" "}
                  <FontAwesomeIcon icon={faCircleXmark} />
                </span>
              </>
            </span>
          </button>
        )}

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
          <Link
            key={`link-${item.id}`}
            to={`/nightlife/nightlife-detail/${item.id}`}
          >
            <NightlifeCards key={`card-${item.id}`} item={item} />
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Nightlife;
