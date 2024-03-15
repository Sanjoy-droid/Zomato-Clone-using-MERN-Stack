import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import appContext from "../context/GlobalContext/appContext";
import Navbar from "../Navbar";
import Cards from "./Cards";
import Footer from "./Footer";
const Delivery = () => {
  const location = useLocation();

  const isDeliveryPage = location.pathname === "/order-online";

  const context = useContext(appContext);
  const { data, setData } = context;
  return (
    <>
      <Navbar />
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
      {/* Filters */}
      <div className="filters flex items-center mt-8 ml-8  w-36 space-x-4">
        {/* Filters*/}
        <div className="filters border-2 border-gray-400 rounded-lg  cursor-pointer ">
          <pre>
            <p className="font-sans text-sm p-1 text-gray-900">Filters</p>
          </pre>
        </div>
        {/* Rating */}
        <div className="Rating   border-2 border-gray-400 rounded-lg  cursor-pointer">
          <pre>
            <p className="font-sans text-sm p-1 text-gray-900">Rating 4.0+</p>
          </pre>
        </div>
        {/* Pure Veg*/}
        <div className="pure-veg border-2 border-gray-400 rounded-lg  cursor-pointer">
          <pre>
            <p className="font-sans text-sm p-1 text-gray-900">Pure Veg</p>
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
        {data.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Delivery;
