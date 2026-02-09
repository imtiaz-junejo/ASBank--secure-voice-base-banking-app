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
      className={`auth-layout-root relative w-full bg-white overflow-hidden
        max-lg:before:opacity-0 max-lg:before:pointer-events-none max-lg:before:invisible
        before:content-[''] before:absolute before:w-[1500px] before:h-[1500px] lg:before:h-[2000px] 
        lg:before:w-[2000px] lg:before:top-[-10%] before:top-[initial] lg:before:right-[48%] 
        before:right-[initial] max-lg:before:left-[30%] max-sm:before:bottom-[72%] max-md:before:left-1/2 
        max-lg:before:bottom-[75%] before:z-[6] before:rounded-[50%]     
        lg:before:-translate-y-1/2 max-lg:before:-translate-x-1/2 before:bg-[#03C9D7] 
        before:transition-all before:duration-[2s] lg:before:duration-[1.8s] ${
        isSignUpMode
          ? `lg:before:translate-x-full before:-translate-x-1/2 
          before:translate-y-full lg:before:right-[52%] before:right-[initial] 
          sm:max-lg:before:bottom-[22%] max-sm:before:bottom-[20%] 
          max-md:before:left-1/2`
          : ""
      }`}
    >
      {/* MOBILE: single form + teal banner - no page scroll, content fits or scrolls inside */}
      <div className="relative z-[5] flex flex-col h-full lg:hidden overflow-hidden">
        {!isSignUpMode ? (
          <>
            {/* Teal top banner - fixed height */}
            <div className="bg-[#03C9D7] text-white px-6 pt-8 pb-10 rounded-b-[2rem] flex flex-col items-center justify-center text-center shrink-0">
              <h3 className="font-semibold text-lg">New here?</h3>
              <p className="text-sm opacity-95 mt-1">Sign up and discover our platform</p>
              <button
                type="button"
                className="mt-3 w-[130px] h-10 text-[#03C9D7] bg-white font-semibold rounded-full border-2 border-white hover:bg-[#03C9D7] hover:text-white transition-colors text-sm"
                onClick={toggleSignUpMode}
              >
                Sign up
              </button>
            </div>
            {/* Sign In form - scrolls only here if needed */}
            <div className="flex-1 min-h-0 px-4 -mt-4 pb-4 overflow-y-auto">
              <div className="max-w-md mx-auto py-2">
                <SignInForm
                  buttonClasses={buttonClasses}
                  buttonForGFT={buttonForGFT}
                  onToggleSignUp={toggleSignUpMode}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Sign Up form - scrolls only here if needed */}
            <div className="flex-1 min-h-0 px-4 pt-4 pb-2 overflow-y-auto">
              <div className="max-w-md mx-auto py-2">
                <SignUpForm
                  buttonClasses={buttonClasses}
                  buttonForGFT={buttonForGFT}
                  onToggleSignIn={toggleSignUpMode}
                />
              </div>
            </div>
            {/* Teal bottom banner - fixed height */}
            <div className="bg-[#03C9D7] text-white px-6 py-8 rounded-t-[2rem] flex flex-col items-center justify-center text-center shrink-0">
              <h3 className="font-semibold text-lg">One of us?</h3>
              <p className="text-sm opacity-95 mt-1">Sign in to your account to have hassle free experience</p>
              <button
                type="button"
                className="mt-3 w-[130px] h-10 text-[#03C9D7] bg-white font-semibold rounded-full border-2 border-white hover:bg-[#03C9D7] hover:text-white transition-colors text-sm"
                onClick={toggleSignUpMode}
              >
                Sign in
              </button>
            </div>
          </>
        )}
      </div>

      {/* DESKTOP: one form at a time - SignUp left (only on /signup), SignIn right (only on /login) */}
      <div className="absolute inset-0 hidden lg:flex items-center justify-center z-[5] px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="relative w-full max-w-6xl h-full max-h-full mx-auto grid grid-cols-2 gap-6 lg:gap-10 items-start overflow-y-auto py-6">
          <div className="flex justify-start">
            <div className="w-full max-w-md">
              {isSignUpMode && (
                <SignUpForm
                  buttonClasses={buttonClasses}
                  buttonForGFT={buttonForGFT}
                  onToggleSignIn={toggleSignUpMode}
                />
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-full max-w-md">
              {!isSignUpMode && (
                <SignInForm
                  buttonClasses={buttonClasses}
                  buttonForGFT={buttonForGFT}
                  onToggleSignUp={toggleSignUpMode}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP PANELS - clickable Sign up / Sign in */}
      <div className="absolute h-full w-full top-0 left-0 hidden lg:grid grid-cols-2">
        
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
