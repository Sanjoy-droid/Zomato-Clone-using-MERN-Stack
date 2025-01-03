// Cards.jsx
import React, { useRef, useEffect, useState } from "react";

const Cards = (props) => {
  const { title, rating, description, price, time, image } = props;
  return (
    <>
      <div
        className="card w-80 h-80  rounded-2xl cursor-pointer  border-2 border-transparent
hover:border-2 hover:border-solid hover:border-gray-200 text-black"
      >
        <div className="content  bg-white p-2 rounded-2xl flex flex-col justify-between h-full w-full">
          <div>
            <div className="relative">
              {/* Card Image */}
              <img
                src={image}
                alt={title}
                className="h-56 w-80 object-cover rounded-2xl"
              />
              <span className="absolute top-0 right-0 inline-block mt-44 mr-56 px-2 py-1 text-sm font-semibold tracking-wide text-white bg-blue-600 rounded whitespace-nowrap">
                50% OFF
              </span>
            </div>

            <div>
              {/* Title  */}
              <div className="flex items-center justify-between text-base">
                <h1 className="title  ">{title}</h1>

                <p className="text-sm text-white bg-green-700 rounded-md w-10 h-5 flex justify-center items-center ">
                  {rating} <span>&#9733;</span>
                </p>
              </div>
              {/* Description */}
              <div className="flex items-center justify-between text-sm overflow-hidden    text-gray-700 h-6  ">
                <p className="desc ">{description}</p>
                <p>
                  <span>&#8377;</span>
                  {price} for one
                </p>
              </div>
              <p className="text-sm text-gray-600 ml-[16rem]">{time} min</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MemoizedCards = React.memo(Cards);

export default MemoizedCards;
