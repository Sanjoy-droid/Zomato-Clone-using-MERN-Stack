import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged In Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "Error!!!");
    }
  };
  return (
    <>
      {/* Modal Overlay, Background of the Modal */}
      <div className="bg-[#f0ead2] h-[500vh] ">
        <>
          <div className="modal-overlay left-0 right-0 bottom-0 fixed top-0 cursor-default  bg-opacity-40"></div>
        </>

        {/* Sign Up Modal */}
        <div
          className="signup-modal w-[26rem] h-[30rem] fixed right-72 top-16 bg-white cursor-default rounded-xl "
          // onClick={(e) => {
          //   e.stopPropagation();
          // }}
        >
          <div className="flex justify-between items-center  mt-6 mx-6 ">
            <h1 className="text-2xl text-black ">Sign up</h1>

            {/* Close Button */}
            <div
              className="close-btn text-black   cursor-pointer"
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </div>
          </div>

          {/* Sign Up Form  */}

          <form onSubmit={handleSubmit}>
            <div className="signup ">
              <div className="ml-8 text-gray-700">
                {/* Name */}
                <div className="mt-14 h-14 w-[22rem] rounded-lg  border-b border-2 outline-none">
                  <input
                    className="bg-transparent h-full w-full pl-4 text-lg outline-none text-center"
                    type="name"
                    id="name"
                    name="name"
                    placeholder="Fullname"
                    autoComplete="current-username"
                    value={credentials.name}
                    onChange={onChange}
                  />
                </div>
                {/* Email */}
                <div className="mt-4 h-14 w-[22rem] rounded-lg  border-b border-2 outline-none">
                  <input
                    className="bg-transparent h-full w-full pl-4 text-lg outline-none text-center"
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" Enter Your Email"
                    autoComplete="current-email"
                    value={credentials.email}
                    onChange={onChange}
                  />
                </div>
                {/* Password */}
                <div className="mt-4 h-14 w-[22rem] rounded-lg  border-b border-2 outline-none">
                  <input
                    className="bg-transparent h-full w-full pl-4 text-lg outline-none text-center"
                    type="password"
                    id="password"
                    name="password"
                    placeholder=" Enter Your Password"
                    value={credentials.password}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            {/* Login Button */}
            <button className="login w-[22rem] h-[2.6rem] bg-red-500 text-white font-medium flex justify-center items-center text-sm rounded-lg mx-8 mt-8 cursor-pointer hover:bg-red-600">
              Create Account
            </button>
          </form>
          <div className="mt-12 mx-20">
            Already have an account?{" "}
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
