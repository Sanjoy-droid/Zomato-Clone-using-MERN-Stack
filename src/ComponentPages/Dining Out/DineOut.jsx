import React, { lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faL } from "@fortawesome/free-solid-svg-icons";

import { useContext, useState, useEffect, useMemo } from "react";
import resturantContext from "../../context/GlobalContext/resturantContext";
import DiningFilterModal from "./DiningFilterModal";
import LoadingSpinner from "../../components/LoadingSpinner";

const Navbar = lazy(() => import("../Navbar"));
const ResturantCards = lazy(() => import("./ResturantCards"));
const Footer = lazy(() => import("../Footer"));

const DineOut = ({ showAlert }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const isDeliveryPage = location.pathname === "/dine-out";

  const context = useContext(resturantContext);
  const { resturant, getResturant } = context;

  // Rating
  const [isRating, setIsRating] = useState(false);
  const handleRating = () => {
    setIsRating(!isRating);
  };

  // Open Now
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Outdoor Seating
  const [isOutdoor, setIsOutdoor] = useState(false);
  const handleOutdoor = () => {
    setIsOutdoor(!isOutdoor);
  };

  const [rating, setRating] = useState(null);
  const [sortBy, setSortBy] = useState("");

  // Filter resturants based on rating, open now, and outdoor seating options
  const filteredData = useMemo(() => {
    return resturant
      .filter((item) => {
        if (rating && item.rating < rating) {
          return false; // Exclude items with rating less than selected rating
        }

        // Check if the item passes the rating filter if isRating is true
        if (isRating && item.rating < 4.0) {
          return false; // Exclude items with rating less than 4.0
        }

        // Check if the item passes the open now filter if isOpen is true
        if (isOpen && !item.openNow) {
          return false; // Exclude items that are not open now
        }

        // Check if the item passes the outdoor seating filter if isOutdoor is true
        if (isOutdoor && !item.outdoorSeating) {
          return false; // Exclude items that do not have outdoor seating
        }

        // Include the item if it passes all filters
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
  }, [isOutdoor, isRating, isOpen, sortBy, rating, resturant]);

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
    const fetchData = async () => {
      setIsLoading(true);
      await getResturant();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Navbar showAlert={showAlert} />
      </Suspense>
      {/* Different Sections Bar */}
      <div className="sections mt-14 ml-8 flex items-center space-x-12 font-semibold text-lg ">
        {/* Delevery */}
        <Link to="/order-online">
          <div className="delivery flex items-center   space-x-2  cursor-pointer ">
            <img
              className="w-12 h-12 p-2 rounded-full grayscale"
              src="/del_logo.avif"
              alt=""
            />

            <p className="text-gray-800">Delivery</p>
          </div>
        </Link>

        {/* Dining Out */}
        <Link to="/dine-out">
          <div className="dining-out flex items-center space-x-4 cursor-pointer h-20 border-b-2 border-red-500">
            <img
              className={`w-12 h-12 p-2 rounded-full ${
                isDeliveryPage ? "bg-blue-100" : ""
              }`}
              src="/dine1.avif"
              alt=""
            />
            <p className="text-red-500">Dining Out</p>
          </div>
        </Link>
        {/*Nightlife*/}
        <Link to="/nightlife">
          <div className="nightlife flex items-center space-x-4 cursor-pointer">
            <img
              className="w-12 h-12 p-2 rounded-full grayscale "
              src="/night1.webp"
              alt=""
            />
            <p className="text-gray-800">Nightlife</p>
          </div>
        </Link>
      </div>
      <div className="line-1 border-b border-gray-400 mx-8  "></div>

      {/* Filters */}
      <div className="filters flex items-center pl-8  w-full h-16 bg-white  space-x-4 sticky top-0 z-10">
        {/* Filters*/}
        <div
          onClick={() => {
            toggleFilter();
          }}
          className="filters border-2 border-gray-400 rounded-lg  cursor-pointer "
        >
          <pre>
            <span className="font-sans text-sm w-[5rem] p-1 text-gray-900 flex justify-center">
              {
                isRating || isOutdoor || isOpen || rating || sortBy ? ( // Check if any condition is true
                  <>
                    <span className="bg-red-400 flex justify-center rounded-md w-6">
                      {" "}
                      {(isRating ? 1 : 0) +
                        (isOutdoor ? 1 : 0) +
                        (isOpen ? 1 : 0) +
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
          </pre>
          <DiningFilterModal
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
        {/* Rating */}
        <div
          onClick={handleRating}
          className={`Rating border-2 border-gray-400 rounded-lg cursor-pointer ${
            isRating ? "bg-red-400 " : ""
          }`}
        >
          <pre>
            <span className="font-sans text-sm p-1 text-gray-900">
              {isRating ? (
                <>
                  <p className="text-base">
                    Rating 4.0+ <FontAwesomeIcon icon={faCircleXmark} />
                  </p>
                </>
              ) : (
                "Rating 4.0+"
              )}
            </span>
          </pre>
        </div>
        {/* Outdoor Seating*/}
        <div
          onClick={handleOutdoor}
          className={`outdoor border-2 border-gray-400 rounded-lg  cursor-pointer ${
            isOutdoor ? "bg-red-400" : ""
          }`}
        >
          <pre>
            <span className="font-sans text-sm p-1 text-gray-900">
              {isOutdoor ? (
                <>
                  <p className="text-base">
                    Outdoor Seating <FontAwesomeIcon icon={faCircleXmark} />
                  </p>
                </>
              ) : (
                "Outdoor Seating"
              )}
            </span>
          </pre>
        </div>
        {/* Open Now */}
        <div
          onClick={handleOpen}
          className={`Open border-2 border-gray-400 rounded-lg cursor-pointer ${
            isOpen ? "bg-red-400 " : ""
          }`}
        >
          <pre>
            <span className="font-sans text-sm p-1 text-gray-900">
              {isOpen ? (
                <>
                  <span className="text-base">
                    Open Now <FontAwesomeIcon icon={faCircleXmark} />
                  </span>
                </>
              ) : (
                "Open Now"
              )}
            </span>
          </pre>
        </div>
      </div>

      {/* Resturants Listing */}
      <div
        className="

container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-4




        "
      >
        {filteredData.map((item) => (
          <Link
            className="w-full transform transition-transform duration-300 hover:scale-[1.02]"
            key={item.id}
            to={`/dine-out/dine-detail/${item.id}`}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <ResturantCards item={item} />
            </Suspense>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default DineOut;
