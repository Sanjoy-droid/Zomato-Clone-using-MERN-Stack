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

  const [query, setQuery] = React.useState("");
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Suspense fallback={<LoadingSpinner />}>
          <Navbar showAlert={showAlert} setQuery={setQuery} />
        </Suspense>

        {/* Sections Bar */}
        <div className="mt-4 px-4 sm:px-8 overflow-x-auto no-scrollbar">
          <div className="flex min-w-min space-x-6 sm:space-x-12 pb-2">
            <Link to="/order-online">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <img
                  className={`w-10 h-10 sm:w-12 sm:h-12 p-2 rounded-full ${isDeliveryPage ? "bg-yellow-100" : ""}`}
                  src="/del_logo.avif"
                  alt=""
                />
                <p className="text-gray-800 text-sm sm:text-base">Delivery</p>
              </div>
            </Link>

            <Link to="/dine-out">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <img
                  className="w-10 h-10 sm:w-12 sm:h-12 p-2 rounded-full grayscale"
                  src="/dine1.avif"
                  alt=""
                />
                <p className="text-red-500 text-sm sm:text-base">Dining Out</p>
              </div>
            </Link>

            <Link to="/nightlife">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <img
                  className="w-10 h-10 sm:w-12 sm:h-12 p-2 rounded-full grayscale"
                  src="/night1.webp"
                  alt=""
                />
                <p className="text-gray-800 text-sm sm:text-base">Nightlife</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="border-b border-gray-400 mx-4 sm:mx-8"></div>

        {/* Filters Section */}
        <div className="px-4 py-8">
          <div className="flex flex-wrap justify-center gap-2 items-center w-full">
            <button
              onClick={toggleFilter}
              className="min-w-[5rem] h-8 px-3 border-2 border-gray-400 rounded-lg text-sm"
            >
              {isRating || isOutdoor || isOpen || rating || sortBy ? (
                <span className="flex items-center space-x-1">
                  <span className="bg-red-400 w-6 rounded-md text-center">
                    {(isRating ? 1 : 0) +
                      (isOutdoor ? 1 : 0) +
                      (isOpen ? 1 : 0) +
                      (rating ? 1 : 0) +
                      (sortBy ? 1 : 0)}
                  </span>
                  <span>Filters</span>
                </span>
              ) : (
                "Filters"
              )}
            </button>

            {sortBy && (
              <button
                onClick={() => setSortBy("")}
                className="flex items-center space-x-1 px-3 h-8 border-2 border-gray-400 rounded-lg bg-red-400 text-sm"
              >
                <span>{sortBy}</span>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            )}

            {rating && (
              <button
                onClick={() => setRating(null)}
                className="flex items-center space-x-1 px-3 h-8 border-2 border-gray-400 rounded-lg bg-red-400 text-sm"
              >
                <span>{rating}</span>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            )}

            <button
              onClick={handleRating}
              className={`px-3 h-8 border-2 border-gray-400 rounded-lg text-sm ${isRating ? "bg-red-400" : ""}`}
            >
              <span className="flex items-center space-x-1">
                <span>Rating 4.0+</span>
                {isRating && <FontAwesomeIcon icon={faCircleXmark} />}
              </span>
            </button>

            <button
              onClick={handleOutdoor}
              className={`px-3 h-8 border-2 border-gray-400 rounded-lg text-sm ${isOutdoor ? "bg-red-400" : ""}`}
            >
              <span className="flex items-center space-x-1">
                <span>Outdoor Seating</span>
                {isOutdoor && <FontAwesomeIcon icon={faCircleXmark} />}
              </span>
            </button>

            <button
              onClick={handleOpen}
              className={`px-3 h-8 border-2 border-gray-400 rounded-lg text-sm ${isOpen ? "bg-red-400" : ""}`}
            >
              <span className="flex items-center space-x-1">
                <span>Open Now</span>
                {isOpen && <FontAwesomeIcon icon={faCircleXmark} />}
              </span>
            </button>
          </div>

          <DiningFilterModal
            showFilter={showFilter}
            toggleFilter={toggleFilter}
            filterRatingValue={filterRatingValue}
            filterSortByValue={filterSortByValue}
          />
        </div>

        {/* Restaurants Listing */}
        <div className="flex-grow p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredData
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(query.toLowerCase()) ||
                  item.address.toLowerCase().includes(query.toLowerCase()),
              )

              .map((item) => (
                <Link
                  className="block w-full transform transition-transform duration-300 hover:scale-[1.02]"
                  key={item.id}
                  to={`/dine-out/dine-detail/${item.id}`}
                >
                  <Suspense fallback={<LoadingSpinner />}>
                    <ResturantCards item={item} />
                  </Suspense>
                </Link>
              ))}
          </div>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default DineOut;
