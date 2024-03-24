import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const LoginModal = (props) => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
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
      <div>
        {/* Modal Overlay, Background of the Modal */}
        <div className="bg-[#f0ead2] h-[500vh] ">
          <>
            <div className="modal-overlay left-0 right-0 bottom-0 fixed top-0 cursor-default  bg-opacity-40"></div>
          </>

          {/* Sign Up Modal */}
          <div
            className="signup-modal w-[26rem] h-[30rem] fixed right-72 top-16 bg-white cursor-default rounded-xl "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex justify-between items-center  mt-6 mx-6 ">
              <h1 className="text-2xl text-black ">Login</h1>

              {/* Close Button */}
              <div
                className="close-btn text-black   cursor-pointer"
                onClick={() => navigate("/")}
              >
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </div>
            </div>

            {/* Login Form  */}

            <form onSubmit={handleSubmit} className="login">
              <div className="ml-8 text-gray-700">
                {/* Email */}
                <div className="mt-20 h-14 w-[22rem] rounded-lg  border-b border-2 outline-none">
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
                <div className="mt-8 h-14 w-[22rem] rounded-lg  border-b border-2 outline-none">
                  <input
                    className="bg-transparent h-full w-full pl-4 text-lg outline-none text-center"
                    type="password"
                    id="password"
                    name="password"
                    placeholder=" Enter Your Password"
                    autoComplete="current-password"
                    value={credentials.password}
                    onChange={onChange}
                  />
                </div>
              </div>

              {/* Login Button */}
              <button className="login w-[22rem] h-[2.6rem] bg-red-500 text-white font-medium flex justify-center items-center text-sm rounded-lg mx-8 mt-14 cursor-pointer hover:bg-red-600">
                Sign In
              </button>
            </form>
            <div className="mt-12 mx-20">
              New to Zomato?{" "}
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Create account
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
