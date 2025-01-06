import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ setQuery, showAlert }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    showAlert("Logged Out Successfully", "success");
    navigate("/");
  };

  return (
    <>
      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav className="p-4 bg-white shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} size="lg" />
            </button>

            {/* Centered Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex  justify-center items-center w-20 mx-12">
              <img
                className="w-60 h-6 sm:w-60 sm:h-8 cursor-pointer"
                src="/nav-logo.avif"
                alt="zomato logo"
                onClick={handleClick}
              />
            </div>

            {/* Desktop Auth Button - Always visible */}
            <div className="hidden sm:block">
              {localStorage.getItem("token") ? (
                <button
                  className="px-4 py-2 bg-rose-700 text-white text-sm font-medium rounded-xl hover:bg-rose-800 transition"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              ) : null}
            </div>
          </div>

          {/* Search Bar */}

          <div className="mt-4 w-full mx-auto px-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-gray-400 group-hover:text-rose-500 transition-colors"
                />
              </div>
              <input
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                className="w-full pl-12 pr-4 py-3 border-2 rounded-lg outline-none focus:border-rose-500 hover:border-gray-400 transition-colors shadow-sm text-base"
                placeholder="Search for restaurant, cuisine or a dish"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Animated Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-4">
          <div className="pb-4 border-b">
            <h2
              className="text-xl font-semibold cursor-pointer hover:bg-gray-400 rounded-xl w-8 h-8 flex justify-center items-center"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              {isMenuOpen ? <FontAwesomeIcon icon={faXmark} size="lg" /> : ""}
            </h2>
          </div>

          {!localStorage.getItem("token") ? (
            <div className="space-y-8 ">
              <Link to="/login">
                <button className="w-full px-4 py-2 bg-rose-700 text-white text-sm font-medium rounded-xl hover:bg-rose-800 transition">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-full px-4 py-2 bg-rose-700 text-white text-sm font-medium rounded-xl hover:bg-rose-800 transition mt-6">
                  Sign up
                </button>
              </Link>
            </div>
          ) : (
            <button
              className="w-full px-4 py-2 bg-rose-700 text-white text-sm font-medium rounded-xl hover:bg-rose-800 transition"
              onClick={handleLogout}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(Navbar);
