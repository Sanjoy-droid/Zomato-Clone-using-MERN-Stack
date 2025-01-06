import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  useState,
  useContext,
  useEffect,
  useMemo,
  lazy,
  Suspense,
} from "react";
import nightlifeContext from "../../context/GlobalContext/nightlifeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import NightFilterModal from "./NightFilterModal";
import LoadingSpinner from "../../components/LoadingSpinner";

const Navbar = lazy(() => import("../Navbar"));
const Footer = lazy(() => import("../Footer"));
const NightlifeCards = lazy(() => import("./NightlifeCards"));

const Nightlife = ({ showAlert }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isDeliveryPage = location.pathname === "/nightlife";

  const context = useContext(nightlifeContext);
  const { nightlifes, getNightlife } = context;

  const [isRating, setIsRating] = useState(false);
  const [isGold, setIsGold] = useState(false);
  const [rating, setRating] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const handleRating = () => setIsRating(!isRating);
  const handleGold = () => setIsGold(!isGold);
  const toggleFilter = () => setShowFilter(!showFilter);
  const filterRatingValue = (element) => setRating(element);
  const filterSortByValue = (element) => setSortBy(element);

  const filteredData = useMemo(() => {
    return nightlifes
      .filter((item) => {
        if (rating && item.rating < rating) return false;
        if (isRating && item.rating < 4.0) return false;
        if (isGold && !item.gold) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "Rating: High to Low":
            return b.rating - a.rating;
          case "Distance":
            return a.distance - b.distance;
          case "Cost: Low to High":
            return a.price - b.price;
          case "Cost: High to Low":
            return b.price - a.price;
          default:
            return 0;
        }
      });
  }, [isGold, isRating, sortBy, rating, nightlifes]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getNightlife();
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
                  className="w-10 h-10 sm:w-12 sm:h-12 p-2 rounded-full grayscale"
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
                <p className="text-gray-800 text-sm sm:text-base">Dining Out</p>
              </div>
            </Link>

            <Link to="/nightlife">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <img
                  className={`w-10 h-10 sm:w-12 sm:h-12 p-2 rounded-full ${isDeliveryPage ? "bg-blue-100" : ""}`}
                  src="/night1.webp"
                  alt=""
                />
                <p className="text-red-500 text-sm sm:text-base">Nightlife</p>
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
              {isRating || isGold || rating || sortBy ? (
                <span className="flex items-center space-x-1">
                  <span className="bg-red-400 w-6 rounded-md text-center">
                    {(isRating ? 1 : 0) +
                      (isGold ? 1 : 0) +
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
                <span>{rating}+</span>
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
              onClick={handleGold}
              className={`px-3 h-8 border-2 border-gray-400 rounded-lg text-sm ${isGold ? "bg-red-400" : ""}`}
            >
              <span className="flex items-center space-x-1">
                <FontAwesomeIcon className="text-yellow-600" icon={faCrown} />
                <span>Gold</span>
                {isGold && <FontAwesomeIcon icon={faCircleXmark} />}
              </span>
            </button>
          </div>

          <NightFilterModal
            showFilter={showFilter}
            toggleFilter={toggleFilter}
            filterRatingValue={filterRatingValue}
            filterSortByValue={filterSortByValue}
          />
        </div>

        {/* Nightlife Listing */}
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
                  to={`/nightlife/nightlife-detail/${item.id}`}
                >
                  <Suspense fallback={<LoadingSpinner />}>
                    <NightlifeCards item={item} />
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

export default Nightlife;
