import React from "react";

const HomeCards = () => {
  return (
    <>
      <div className="flex justify-stretch items-center">
        {/* Order Online Card */}
        <div className="delivery-card w-[25rem] h-56 rounded-2xl cursor-pointer border border-black border-opacity-50 m-4 overflow-hidden ">
          <div>
            <div className="logo h-full">
              <img className="w-full h-[9rem]" src="./homecard1.avif" alt="" />
            </div>
            <div className="desc  flex-col items-center justify-center">
              <p className=" text-xl mt-2 ml-4">Order Online</p>
              <p className="ml-4 text-gray-500">
                Stay home and order to your doorstep
              </p>
            </div>
          </div>
        </div>
        {/* Dining Card */}
        <div className="dining-card w-[25rem] h-56 rounded-2xl cursor-pointer border border-black border-opacity-50 m-4 overflow-hidden ">
          <div>
            <div className="logo h-full">
              <img className="w-full h-[9rem]" src="./homecard2.avif" alt="" />
            </div>
            <div className="desc  flex-col items-center justify-center">
              <p className=" text-xl mt-2 ml-4">Dining</p>
              <p className="ml-4 text-gray-500">
                View the city's favourite dining venues
              </p>
            </div>
          </div>
        </div>
        {/* Nightlife Card */}
        <div className="delivery-card w-[25rem] h-56 rounded-2xl cursor-pointer border border-black border-opacity-50 m-4 overflow-hidden ">
          <div>
            <div className="logo h-full">
              <img className="w-full h-[9rem]" src="./homecard3.avif" alt="" />
            </div>
            <div className="desc  flex-col items-center justify-center">
              <p className=" text-xl mt-2 ml-4">Nightlife and Clubs</p>
              <p className="ml-4 text-gray-500">
                Explore the city's top nightlife outlets
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCards;
