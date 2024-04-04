import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
const NightSortbyModal = ({ showSortby, getSortbyValue }) => {
  const [selectedItem, setSelectedItem] = useState("");

  // Function to toggle the selection of an item
  const toggleSelection = (item) => {
    setSelectedItem(item);
    // Pass selected sort by value to parent component
    getSortbyValue(item);
  };

  // Rendering the sort by modal
  return (
    <>
      {showSortby && (
        <div
          className="bg-white p-4 rounded-lg absolute right-32 top-10"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          <ul className="list-none space-y-4">
            {/* Sort by options */}
            <li
              className={`flex items-center py-2 px-4 hover:bg-gray-100 ${
                selectedItem === "Distance" ? "text-red-500" : ""
              }`}
              onClick={() => toggleSelection("Distance")}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`mr-2 ${
                  selectedItem === "Distance" ? "text-red-500" : ""
                }`}
              />
              <span>Distance</span>
            </li>
            <li
              className={`flex items-center py-2 px-4 hover:bg-gray-100 ${
                selectedItem === "Rating: High to Low" ? "text-red-500" : ""
              }`}
              onClick={() => toggleSelection("Rating: High to Low")}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`mr-2 ${
                  selectedItem === "Rating: High to Low" ? "text-red-500" : ""
                }`}
              />
              <span>Rating: High to Low</span>
            </li>

            <li
              className={`flex items-center py-2 px-4 hover:bg-gray-100 ${
                selectedItem === "Cost: Low to High" ? "text-red-500" : ""
              }`}
              onClick={() => toggleSelection("Cost: Low to High")}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`mr-2 ${
                  selectedItem === "Cost: Low to High" ? "text-red-500" : ""
                }`}
              />
              <span>Cost: Low to High</span>
            </li>
            <li
              className={`flex items-center py-2 px-4 hover:bg-gray-100 ${
                selectedItem === "Cost: High to Low" ? "text-red-500" : ""
              }`}
              onClick={() => toggleSelection("Cost: High to Low")}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`mr-2 ${
                  selectedItem === "Cost: High to Low" ? "text-red-500" : ""
                }`}
              />
              <span>Cost: High to Low</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NightSortbyModal;
