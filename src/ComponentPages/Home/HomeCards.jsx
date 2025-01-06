import React from "react";
import { Link } from "react-router-dom";

const HomeCards = () => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 p-4">
      {/* Order Online Card */}
      <div className="w-full sm:w-[18rem] md:w-[20rem] h-60 rounded-2xl cursor-pointer border border-black border-opacity-50 overflow-hidden transform transition-transform hover:scale-105">
        <Link to="/order-online">
          <div>
            <img
              className="w-full h-36 object-cover"
              src="./homecard1.avif"
              alt="Order Online"
            />
            <div className="p-4">
              <p className="text-lg md:text-xl font-semibold ">Order Online</p>
              <p className="text-sm md:text-base text-gray-500 ">
                Stay home and order to your doorstep
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Dining Card */}
      <div className="w-full sm:w-[18rem] md:w-[20rem] h-60 rounded-2xl cursor-pointer border border-black border-opacity-50 overflow-hidden transform transition-transform hover:scale-105">
        <Link to="/dine-out">
          <div>
            <img
              className="w-full h-36 object-cover"
              src="./homecard2.avif"
              alt="Dining"
            />
            <div className="p-4">
              <p className="text-lg md:text-xl font-semibold">Dining</p>
              <p className="text-sm md:text-base text-gray-500">
                View the city's favourite dining venues
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Nightlife Card */}
      <div className="w-full sm:w-[18rem] md:w-[20rem] h-60 rounded-2xl cursor-pointer border border-black border-opacity-50 overflow-hidden transform transition-transform hover:scale-105">
        <Link to="/nightlife">
          <div>
            <img
              className="w-full h-36 object-cover"
              src="./homecard3.avif"
              alt="Nightlife"
            />
            <div className="p-4">
              <p className="text-lg md:text-xl font-semibold">
                Nightlife and Clubs
              </p>
              <p className="text-sm md:text-base text-gray-500">
                Explore the city's top nightlife outlets
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeCards;
