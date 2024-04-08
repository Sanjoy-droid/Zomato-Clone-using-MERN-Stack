import { useState } from "react";
import AppContext from "./appContext";
import ResturantContext from "./ResturantContext";
import NightlifeContext from "./nightlifeContext";
const AppState = (props) => {
  const host = import.meta.env.VITE_URL;

  const resturants = [];
  const [resturant, setResturant] = useState(resturants);

  // Get all Resturant Posts
  const getResturant = async () => {
    // API Call
    const response = await fetch(`${host}/api/posts/fetchresturantposts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setResturant(json);
  };

  const nightlife = [];
  const [nightlifes, setNightlifes] = useState(nightlife);
  // Get all Nightlife Posts
  const getNightlife = async () => {
    // API Call
    const response = await fetch(`${host}/api/posts/fetchnightlifeposts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setNightlifes(json);
  };

  const dataInitial = [];
  const [data, setData] = useState(dataInitial);
  // Get all Delivery Posts
  const getData = async () => {
    // API Call
    const response = await fetch(`${host}/api/posts/fetchdeliveryposts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setData(json);
  };

  return (
    <AppContext.Provider value={{ data, setData, getData }}>
      <ResturantContext.Provider
        value={{ resturant, setResturant, getResturant }}
      >
        <NightlifeContext.Provider
          value={{ nightlifes, setNightlifes, getNightlife }}
        >
          {props.children}
        </NightlifeContext.Provider>
      </ResturantContext.Provider>
    </AppContext.Provider>
  );
};

export default AppState;
