import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

const buttonClasses =
  "w-full text-white bg-[#03C9D7] hover:bg-[#039BAB] focus:ring-4 focus:outline-none focus:ring-[#039BAB]/30 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

const buttonForGFT =
  "inline-flex w-full justify-center items-center rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm font-medium text-gray-500 hover:bg-gray-50 shadow-sm transition-all duration-200 hover:shadow hover:border-gray-400";

export default function SlidingAuth() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsSignUpMode(location.pathname === "/signup");
  }, [location.pathname]);

  const toggleSignUpMode = () => {
    if (isSignUpMode) {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div
      className={`relative w-full bg-white min-h-screen overflow-hidden
        before:content-[''] before:absolute before:w-[1500px] before:h-[1500px] lg:before:h-[2000px] 
        lg:before:w-[2000px] lg:before:top-[-10%] before:top-[initial] lg:before:right-[48%] 
        before:right-[initial] max-lg:before:left-[30%] max-sm:before:bottom-[72%] max-md:before:left-1/2 
        max-lg:before:bottom-[75%] before:z-[6] before:rounded-[50%]     
        lg:before:-translate-y-1/2 max-lg:before:-translate-x-1/2 before:bg-[#03C9D7] 
        before:transition-all before:duration-[2s] lg:before:duration-[1.8s] ${
        isSignUpMode
          ? `lg:before:translate-x-full before:-translate-x-1/2 
          before:translate-y-full lg:before:right-[25%] before:right-[initial] 
          sm:max-lg:before:bottom-[22%] max-sm:before:bottom-[20%] 
          max-md:before:left-1/2`
          : ""
      }`}
    >
      {/* Forms Container: SignUp left, SignIn right */}
      <div className="absolute w-full h-full top-0 left-0 flex items-center z-[5] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 w-full max-w-6xl mx-auto items-start">
          {/* LEFT: SignUp */}
          <div className="flex justify-start order-2 lg:order-1">
            <div className="w-full max-w-md">
              <SignUpForm
                buttonClasses={buttonClasses}
                buttonForGFT={buttonForGFT}
                onToggleSignIn={toggleSignUpMode}
              />
            </div>
          </div>
          {/* RIGHT: SignIn */}
          <div className="flex justify-end order-1 lg:order-2">
            <div className="w-full max-w-md">
              <SignInForm
                buttonClasses={buttonClasses}
                buttonForGFT={buttonForGFT}
                onToggleSignUp={toggleSignUpMode}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PANELS */}
      <div className="absolute h-full w-full top-0 left-0 grid grid-cols-1 max-lg:grid-rows-[1fr_2fr_1fr] lg:grid-cols-2">
        
        {/* LEFT PANEL */}
        <div
          className={`flex flex-row justify-around lg:flex-col items-center 
            max-lg:px-[6%] max-lg:py-8
            lg:items-end text-center z-[6]    
            pl-[10%] pr-[14%] pt-10 pb-6
            ${
              isSignUpMode
                ? "pointer-events-none"
                : "pointer-events-auto"
            }`}
        >
          <div
            className={`text-white transition-transform duration-[0.9s] 
              lg:duration-[1.1s] ease-[ease-in-out] delay-[0.8s] 
              lg:delay-[0.4s] max-md:px-4 ${
                isSignUpMode
                  ? "lg:translate-x-[-800px] max-lg:translate-y-[-300px]"
                  : ""
              }`}
          >
            <h3 className="font-semibold leading-none text-[1.2rem] lg:text-[1.5rem] text-gray-700">
              New here ?
            </h3>

            <p className="text-[0.75rem] lg:text-[0.95rem] py-2">
              Sign up and discover our platform
            </p>

            <button
              type="button"
              className="bg-transparent w-[110px] h-[35px] text-gray-700 
                text-[0.75rem] lg:w-[130px] lg:h-[41px] 
                lg:text-[0.85rem] font-semibold border-2 
                border-white rounded-full transition-colors 
                duration-300 hover:bg-white hover:text-gray-700"
              onClick={toggleSignUpMode}
            >
              Sign up
            </button>
          </div>

          <img
            src="/signin.svg"
            alt="login"
            className={`max-md:hidden max-lg:translate-y-[-30px] 
              w-[180px] lg:w-full transition-transform 
              duration-[0.9s] lg:duration-[1.1s] 
              ease-[ease-in-out] delay-[0.6s] ${
                isSignUpMode
                  ? "lg:translate-x-[-800px] max-lg:translate-y-[-300px]"
                  : ""
              }`}
          />
        </div>

        {/* RIGHT PANEL */}
        <div
          className={`flex flex-row lg:flex-col items-center 
            lg:items-end justify-around text-center z-[6] 
            max-lg:px-[6%] max-lg:py-8
            pl-[14%] pr-[10%] pt-10 pb-6 ${
              isSignUpMode
                ? "pointer-events-auto"
                : "pointer-events-none"
            }`}
        >
          <div
            className={`text-white transition-transform 
              duration-[0.9s] lg:duration-[1.1s] 
              ease-in-out delay-[0.8s] 
              max-md:px-4 ${
                isSignUpMode
                  ? ""
                  : "lg:translate-x-[800px] max-lg:translate-y-[300px]"
              }`}
          >
            <h3 className="font-semibold leading-none text-[1.2rem] lg:text-[1.5rem] text-gray-700">
              One of us ?
            </h3>

            <p className="py-2 text-[0.75rem] lg:text-[0.95rem]">
              Sign in to your account to have hassle free experience
            </p>

            <button
              type="button"
              className="text-gray-700 bg-transparent 
                w-[110px] h-[35px] text-[0.75rem] 
                lg:w-[130px] lg:h-[41px] 
                lg:text-[0.85rem] font-semibold 
                border-2 border-white rounded-full 
                transition-colors duration-300 
                hover:bg-white hover:text-gray-700"
              onClick={toggleSignUpMode}
            >
              Sign in
            </button>
          </div>

          <img
            src="/signup.svg"
            alt="register"
            className={`max-md:hidden w-[180px] lg:w-full 
              transition-transform duration-[0.9s] 
              lg:duration-[1.1s] ease-[ease-in-out] 
              delay-[0.6s] ${
                isSignUpMode
                  ? ""
                  : "lg:translate-x-[800px] max-lg:translate-y-[300px]"
              }`}
          />
        </div>
      </div>
    </div>
  );
}
