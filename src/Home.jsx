import Delivery from "./Delivery";
import HomeCards from "./HomeCards";
const Home = () => {
  return (
    <>
      <div className="relative">
        {/* Background Image */}
        <img
          className="w-full h-96 object-cover"
          src="/81f3ff974d82520780078ba1cfbd453a1583259680.avif"
          alt=""
        />

        {/* Navigation */}
        <div className="absolute top-4 right-4 flex justify-end items-end">
          <ul className="flex gap-4 text-xl mr-8 text-white">
            <li className=" cursor-pointer">Login</li>
            <li className=" cursor-pointer">Sign up</li>
          </ul>
        </div>

        {/* Centered Container for Logo and Description */}
        <div className="absolute top-[30%] left-1/2 w-[40rem] transform -translate-x-1/2 -translate-y-1/2  ">
          {/* Zomato Logo */}
          <img
            src="/8313a97515fcb0447d2d77c276532a511583262271.avif"
            alt=""
            className="w-80 h-16 mx-auto "
          />

          {/* Description */}
          <h1 className="text-3xl text-white my-8 mx-14 ">
            Discover the best food & drinks in City
          </h1>
        </div>
        {/* Oreder Online */}
        <HomeCards />
      </div>
    </>
  );
};

export default Home;
