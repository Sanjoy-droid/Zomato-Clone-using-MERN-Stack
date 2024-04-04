import React, { useState } from "react";

const DiningRatingModal = ({ showRating, toggleRating, getRatingValue }) => {
  const [checkedRating, setCheckedRating] = useState(null); // State to manage the checked rating

  // Function to handle checkbox click
  const handleCheckbox = (rating) => {
    // If the clicked rating is already checked, uncheck it
    if (checkedRating === rating) {
      setCheckedRating("");
    } else {
      // Otherwise, check it and uncheck the previously checked rating
      setCheckedRating(rating);
      getRatingValue(rating);
    }
  };

  if (!showRating) return null;
  return (
    <>
      <div className="absolute top-20 left-24 ">
        <div className="ml-20">Selected Rating: {checkedRating}</div>
        <div
          className="p-2 rounded-lg absolute top-16"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-2 w-80 ml-4  border-black "></div>

          <div className="flex justify-evenly">
            <ul className="flex items-center space-x-8">
              <li className="flex items-center mx-2">
                <input
                  type="checkbox"
                  checked={checkedRating === "Any"}
                  onChange={() => handleCheckbox("Any")}
                />
                <span className="ml-2">Any</span>
              </li>
              <li className="flex items-center mx-2">
                <input
                  type="checkbox"
                  checked={checkedRating === "3.5"}
                  onChange={() => handleCheckbox("3.5")}
                />
                <span className="ml-2">3.5</span>
              </li>
              <li className="flex items-center mx-2">
                <input
                  type="checkbox"
                  checked={checkedRating === "4.0"}
                  onChange={() => handleCheckbox("4.0")}
                />
                <span className="ml-2">4.0</span>
              </li>
              <li className="flex items-center mx-2">
                <input
                  type="checkbox"
                  checked={checkedRating === "4.5"}
                  onChange={() => handleCheckbox("4.5")}
                />
                <span className="ml-2">4.5</span>
              </li>
              <li className="flex items-center mx-2">
                <input
                  type="checkbox"
                  checked={checkedRating === "5.0"}
                  onChange={() => handleCheckbox("5.0")}
                />
                <span className="ml-2">5.0</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiningRatingModal;
