import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../components/LoadingSpinner";

import { Link, useLocation } from "react-router-dom";
import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  lazy,
  Suspense,
} from "react";

import appContext from "../../context/GlobalContext/appContext";
import FilterModal from "../Modals/FilterModal";

const Navbar = lazy(() => import("../Navbar"));
const Footer = lazy(() => import("../Footer"));
const Cards = lazy(() => import("../Cards"));

const Delivery = ({ showAlert }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const isDeliveryPage = location.pathname === "/order-online";

  const context = useContext(appContext);
  const { data, getData } = context;

  // Rating
  const [isRating, setIsRating] = useState(false);

  const handleRating = useCallback(() => {
    setIsRating((prev) => !prev);
  }, []);

  // Pure Veg
  const [isVeg, setIsVeg] = useState(false);

  const handleVeg = useCallback(() => {
    setIsVeg((prev) => !prev);
  }, []);

  // Filter data based on rating, sort by, and vegetarian options
  const [rating, setRating] = useState(null);
  const [sortBy, setSortBy] = useState("");

  const filteredData = useMemo(() => {
    return data
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
  }, [data, rating, sortBy, isVeg, isRating]);

  // Filter Modal

  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  // Get Actual Rating Value from filter

  const filterRatingValue = useCallback((element) => {
    setRating(element);
  }, []);

  // Get Actual Sortby Value from filter
  const filterSortByValue = useCallback((element) => {
    setSortBy(element);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await getData();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const [query, setQuery] = React.useState("");

  if (isLoading) return <LoadingSpinner />;

  return (
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
              <p className="text-red-500 text-sm sm:text-base">Delivery</p>
            </div>
          </Link>

          <Link to="/dine-out">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 p-2 rounded-full grayscale"
                src="/dine1.avif"
                alt=""
              />
              <p className="text-gray-800 text-sm sm:text-base">Dining Out</p>
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
      <div className="px-4 py-8 ">
        <div className="flex flex-wrap justify-center  gap-2 items-center w-full ">
          <button
            onClick={toggleFilter}
            className="min-w-[5rem] h-8 px-3 border-2 border-gray-400 rounded-lg text-sm"
          >
            {isRating || isVeg || rating || sortBy ? (
              <span className="flex items-center space-x-1">
                <span className="bg-red-400 w-6 rounded-md text-center">
                  {(isRating ? 1 : 0) +
                    (isVeg ? 1 : 0) +
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
            onClick={handleVeg}
            className={`px-3 h-8 border-2 border-gray-400 rounded-lg text-sm ${isVeg ? "bg-red-400" : ""}`}
          >
            <span className="flex items-center space-x-1">
              <span>Pure Veg</span>
              {isVeg && <FontAwesomeIcon icon={faCircleXmark} />}
            </span>
          </button>
        </div>

        <FilterModal
          showFilter={showFilter}
          toggleFilter={toggleFilter}
          filterRatingValue={filterRatingValue}
          filterSortByValue={filterSortByValue}
        />
      </div>

      {/* Products Grid */}
      <div className="flex-grow p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredData
            .filter(
              (item) =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase()),
            )
            .map((item) => (
              <Link
                className="block w-full transform transition-transform duration-300 hover:scale-[1.02]"
                key={item.id}
                to={`/order-online/delivery-detail/${item.id}`}
              >
                <Suspense fallback={<LoadingSpinner />}>
                  <Cards
                    title={item.title}
                    rating={item.rating}
                    description={item.description}
                    price={item.price}
                    time={item.time}
                    image={item.image}
                  />
                </Suspense>
              </Link>
            ))}
        </div>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Delivery;
