import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <div className="navbar flex  items-center m-2">
        {/* Logo  */}
        <div className="logo cursor-pointer" onClick={handleClick}>
          <img
            className="w-36 h-8 ml-4"
            src="./nav-logo.avif"
            alt="zomato logo"
          />
        </div>
        {/* Search */}
        <div
          className="nav-search flex w-[39rem] h-12 ml-6 rounded-md
          border-2 border-solid  bg-white selection:bg-blue-500 selection:text-white"
        >
          <div className="search-icon w-[50px] flex items-center justify-center ">
            <FontAwesomeIcon
              className="pl-3"
              icon={faMagnifyingGlass}
              size="1x"
            />
          </div>

          <input
            className="w-full rounded-md outline-none px-2"
            placeholder="Search for restaurant, cuisine or a dish"
          />
        </div>
        {/* Buttons */}
        <div className="flex justify-center items-center space-x-4 ml-12 text-lg text-gray-800">
          {/* Login */}
          <button className="login transition-opacity duration-300 hover:opacity-50">
            Log in
          </button>
          {/* Sign Up*/}
          <button className="signup transition-opacity duration-300 hover:opacity-50">
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
