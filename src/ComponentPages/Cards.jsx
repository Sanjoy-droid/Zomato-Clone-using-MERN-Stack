// Cards.jsx
import React from "react";

const Cards = (props) => {
  const { item } = props;
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
                src={item.image}
                alt={item.title}
                className="h-56 w-80 object-cover rounded-2xl"
              />
              <span className="absolute top-0 right-0 inline-block mt-44 mr-56 px-2 py-1 text-sm font-semibold tracking-wide text-white bg-blue-600 rounded whitespace-nowrap">
                50% OFF
              </span>
            </div>

            <div>
              {/* Title  */}
              <div className="flex items-center justify-between text-base">
                <h1 className="title  ">{item.title}</h1>

                <p className="text-sm text-white bg-green-700 rounded-md w-10 h-5 flex justify-center items-center ">
                  {item.rating} <span>&#9733;</span>
                </p>
              </div>
              {/* Description */}
              <div className="flex items-center justify-between text-sm overflow-hidden    text-gray-700 h-6  ">
                <p className="desc ">{item.description}</p>
                <p>
                  <span>&#8377;</span>
                  {item.price} for one
                </p>
              </div>
              <p className="text-sm text-gray-600 ml-[16rem]">
                {item.time} min
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
