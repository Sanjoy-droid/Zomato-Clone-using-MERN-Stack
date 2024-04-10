import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SortbyModal from "./SortbyModal";
import RatingModal from "./RatingModal";

const FilterModal = ({
  showFilter,
  toggleFilter,
  filterRatingValue,
  filterSortByValue,
}) => {
  //   Sortby Modal
  const [showSortby, setShowSortby] = useState(true);
  const toggleSortby = () => {
    setShowSortby(!showSortby);
    setShowRating(!showRating);
  };

  // Rating Modal
  const [showRating, setShowRating] = useState(false);
  const toggleRating = () => {
    setShowRating(!showRating);
    setShowSortby(!showSortby);
  };

  // Implementation to get value from SortbyModal
  const [sortbyValue, setSortbyValue] = useState("");
  const getSortbyValue = (element) => {
    setSortbyValue(element);
  };

  // Implementation to get value from FilterModal
  const [ratingValue, setRatingValue] = useState(null);
  const getRatingValue = (element) => {
    setRatingValue(element);
  };

  return (
    showFilter && (
      <>
        {/* Modal overlay to cover the entire screen */}
        <div
          onClick={toggleFilter}
          className="modal-overlay left-0 right-0 bottom-0 top-0 fixed  cursor-pointer bg-black bg-opacity-40"
        ></div>

        {/* Modal content */}
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-50 w-[30rem] h-[20rem] cursor-default"
        >
          {/* header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <FontAwesomeIcon
              className="cursor-pointer"
              onClick={toggleFilter}
              icon={faXmark}
              size="xl"
            />
          </div>
          {/* Sort by */}
          <ul className="space-y-4">
            {/* Custom Filter */}
            <li
              onClick={toggleSortby}
              className={`flex items-center rounded-md w-20 h-10 justify-center ${
                showSortby ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              <p className="text-lg"> Sort by </p>
              <SortbyModal
                showSortby={showSortby}
                getSortbyValue={getSortbyValue}
              />
            </li>

            {/* FIlter By Rating */}
            <li
              onClick={toggleRating}
              className={`flex items-center rounded-md w-20 h-10 justify-center ${
                showRating ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              <p className="text-lg ">
                {"    "}
                Rating
              </p>
              <RatingModal
                showRating={showRating}
                toggleRating={toggleRating}
                getRatingValue={getRatingValue}
              />
            </li>
          </ul>
          <button
            className="mt-28 ml-[22rem] bg-red-500 hover:bg-red-400 text-white rounded-lg h-10 w-20"
            onClick={() => {
              filterRatingValue(ratingValue);
              filterSortByValue(sortbyValue);
              setSortbyValue("");
              setRatingValue(null);
              toggleFilter();
            }}
          >
            Apply
          </button>
        </div>
      </>
    )
  );
};

export default FilterModal;
