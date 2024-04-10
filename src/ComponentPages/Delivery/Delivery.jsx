import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import appContext from "../../context/GlobalContext/appContext";
import Navbar from "../Navbar";
import Cards from "../Cards";
import Footer from "../Footer";
import FilterModal from "../Modals/FilterModal";

const Delivery = ({ showAlert }) => {
  const location = useLocation();

  const isDeliveryPage = location.pathname === "/order-online";

  const context = useContext(appContext);
  const { data, getData } = context;

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

  // Filter data based on rating, sort by, and vegetarian options
  const [rating, setRating] = useState(null);
  const [sortBy, setSortBy] = useState("");

  const filteredData = data
    .filter((item) => {
      // Check if the item passes the rating filter
      if (rating && item.rating < rating) {
        return false; // Exclude items with rating less than selected rating
      }

      // Check if the item passes the vegetarian filter
      if (isVeg && !item.veg) {
        return false; // Exclude non-vegetarian items if the pure veg filter is enabled
      }

      // Check if the item passes the rating filter for 4.0+
      if (isRating && item.rating < 4.0) {
        return false; // Exclude items with rating less than 4.0
      }

      // Include the item if it passes all filters
      return true;
    })
    .sort((a, b) => {
      // Sorting logic based on sortBy value
      switch (sortBy) {
        case "Rating: High to Low":
          return b.rating - a.rating; // Sort by rating from high to low
        case "Delivery Time":
          return a.time - b.time;
        case "Cost: Low to High":
          return a.price - b.price;
        case "Cost: High to Low":
          return b.price - a.price;
        default:
          return 0; // Default sorting
      }
    });

  // Filter Modal

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

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar showAlert={showAlert} />
      {/* Different Sections Bar */}
      <div className="sections mt-14 ml-8 flex items-center space-x-12 font-semibold text-lg ">
        {/* Delivery */}
        <Link to="/order-online">
          <div className="delivery flex items-center space-x-2 cursor-pointer h-20 border-b-2 border-red-500">
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
        {/* Nightlife */}
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
      <div className="line-1 border-b border-gray-400 mx-8"></div>

      {/* Interaction */}

      <div className="filters flex items-center pl-8 w-full h-16 bg-white space-x-4 sticky top-0 z-10">
        {/* Filters */}
        <div
          className="filters border-2 border-gray-400 rounded-lg cursor-pointer"
          onClick={toggleFilter}
        >
          <span className="font-sans text-sm w-[5rem]  p-1 text-gray-900 flex justify-center items-center">
            {
              isRating || isVeg || rating || sortBy ? ( // Check if any condition is true
                <>
                  <span className="bg-red-400 flex justify-center rounded-md w-6">
                    {" "}
                    {(isRating ? 1 : 0) +
                      (isVeg ? 1 : 0) +
                      (rating ? 1 : 0) +
                      (sortBy ? 1 : 0)}
                  </span>
                  <span> Filters</span>
                </>
              ) : (
                <span>Filters</span>
              ) // If all conditions are false, don't apply red coloring
            }
          </span>

          <FilterModal
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
            className="sort-by border-2 border-gray-400 w-16 h-8 rounded-lg flex items-center justify-center bg-red-400 text-gray-900"
          >
            <span className="font-sans text-sm flex justify-center items-center">
              <>
                <span className="text-base">
                  {rating} <FontAwesomeIcon icon={faCircleXmark} />
                </span>
              </>
            </span>
          </button>
        )}

        {/* Rating */}
        <button
          onClick={handleRating}
          className={`border-2 border-gray-400 w-28 h-8 rounded-lg flex items-center justify-center ${
            isRating ? "bg-red-400 " : "text-gray-900"
          } `}
        >
          <span className="font-sans text-sm flex justify-center items-center">
            {isRating ? (
              <>
                <span className="text-base">Rating 4.0+</span>{" "}
                <FontAwesomeIcon icon={faCircleXmark} className="ml-1" />
              </>
            ) : (
              "Rating 4.0+"
            )}
          </span>
        </button>

        {/* Pure Veg */}
        <button
          onClick={handleVeg}
          className={`border-2 border-gray-400 w-28 h-8 rounded-lg flex items-center justify-center ${
            isVeg ? "bg-red-400 " : "text-gray-900"
          } `}
        >
          <span className="font-sans text-sm flex justify-center items-center">
            {isVeg ? (
              <>
                <span className="text-base">
                  Pure Veg <FontAwesomeIcon icon={faCircleXmark} />
                </span>
              </>
            ) : (
              <>Pure Veg</>
            )}
          </span>
        </button>
      </div>

      {/* Products */}
      <div className="container m-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
        {filteredData.map((item) => (
          <Link key={item.id} to={`/order-online/delivery-detail/${item.id}`}>
            <Cards item={item} />
          </Link>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Delivery;
