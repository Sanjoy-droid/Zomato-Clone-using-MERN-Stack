import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
const NightlifeCards = (props) => {
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

              <span className="absolute top-0 right-0 inline-block mt-44 mr-44 px-2 py-1 text-sm font-semibold tracking-wide text-yellow-600 bg-gray-600 bg-opacity-75 rounded whitespace-nowrap">
                <FontAwesomeIcon icon={faCrown} /> {"  "} Flat 15% OFF
              </span>
            </div>

            <div>
              {/* Resturant Name */}
              <div className="flex items-center justify-between  text-base ">
                <h1 className="title  ">{item.name}</h1>

                <p className="text-sm text-white bg-green-700 rounded-md w-10 h-5 flex justify-center items-center ">
                  {item.rating} <span>&#9733;</span>
                </p>
              </div>
              {/* Address */}
              <div className="flex items-center justify-between text-sm overflow-hidden    text-gray-700 h-6  ">
                <p className="address ">{item.address}</p>
                <p>
                  <span>&#8377;</span>
                  {item.price} for two
                </p>
              </div>
              {/* Situated */}
              <div className="flex items-center justify-between text-sm overflow-hidden text-gray-700 h-6">
                <p>{item.situated}</p>
                <p className="text-sm text-gray-600 ml-4">{item.distance} km</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NightlifeCards;
