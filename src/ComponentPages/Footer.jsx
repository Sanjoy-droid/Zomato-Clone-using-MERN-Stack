import React from "react";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-100 h-[33vh]">
        <div className="line-1 border-b border-gray-400 mx-4 mt-4  "></div>

        {/* logo */}
        <div className="mt-10 flex justify-center  items-center">
          <img
            className="w-40 flex justify-center items-center"
            src="/logo.avif"
            alt=""
          />
        </div>
        {/* Privacy Policy */}
        <div className="mt-14">
          <p className="text-base text-gray-700 px-4">
            By continuing past this page, you agree to our Terms of Service,
            Cookie Policy, Privacy Policy and Content Policies. All trademarks
            are properties of their respective owners. 2008-2024 © Zomato™ Ltd.
            All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
