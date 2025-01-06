import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import LoadingSpinner from "../../components/LoadingSpinner";

const HomeCards = React.lazy(() => import("./HomeCards"));

const Home = () => {
  return (
    <>
      <div className="relative">
        {/* Background Image */}
        <img
          className="w-full h-[28rem] sm:h-80 md:h-80 lg:h-96 object-cover"
          src="/81f3ff974d82520780078ba1cfbd453a1583259680.avif"
          alt=""
        />

        {/* Navigation */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
          <ul className="flex gap-2 sm:gap-4 text-base sm:text-lg md:text-xl mr-2 sm:mr-8 text-white">
            {!localStorage.getItem("token") && (
              <>
                <Link to="/login">
                  <li className="cursor-pointer transition-opacity duration-300 hover:opacity-50">
                    Login
                  </li>
                </Link>
                <Link to="/signup">
                  <li className="cursor-pointer transition-opacity duration-300 hover:opacity-50">
                    Sign up
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>

        {/* Centered Logo and Description */}
        <div className="absolute top-[30%] left-1/2 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40rem] transform -translate-x-1/2 -translate-y-1/2 px-4 sm:px-0">
          <img
            src="/8313a97515fcb0447d2d77c276532a511583262271.avif"
            alt=""
            className="w-48 sm:w-64 md:w-80 h-12 sm:h-14 md:h-16 mx-auto"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl text-white text-center my-4 sm:my-6 md:my-8">
            Discover the best food & drinks in City
          </h1>
        </div>

        {/* Order Online Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <HomeCards />
        </Suspense>
      </div>

      <Footer />
    </>
  );
};

export default Home;
