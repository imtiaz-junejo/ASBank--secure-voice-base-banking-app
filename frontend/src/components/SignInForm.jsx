import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AudioRecorder from "./AudioRecorder";
import { login } from "../services/api";

const SignInForm = ({ buttonClasses, buttonForGFT, onToggleSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRecordingComplete = (blob) => {
    setAudioBlob(blob);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!audioBlob) {
      setError("Please record your voice phrase");
      return;
    }

    setLoading(true);

    try {
      const response = await login(email, password, audioBlob);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white lg:bg-gray-100 rounded-2xl shadow-lg border border-gray-200 my-0 lg:my-4 mx-auto">
      <div className="px-5 py-4 lg:px-8 lg:py-6 space-y-3 lg:space-y-5">
        {/* Header */}
        <div className="text-center space-y-0.5 mb-2 lg:mb-4">
          <h1 className="text-xl lg:text-2xl font-bold text-[#03C9D7]">Welcome Back</h1>
          <p className="text-sm text-gray-500 mb-10">Sign in to your account</p>
        </div>

        {/* Form */}
        <form className="space-y-2.5 lg:space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 pl-11 pr-3 rounded-lg border border-gray-300 bg-[#d5f2ec] focus:ring-1 focus:ring-gray-200 focus:border-[#03C9D7] outline-none transition-all text-sm"
              placeholder="Email address"
              disabled={loading}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 pl-11 pr-3 rounded-lg border border-gray-300 bg-[#d5f2ec] focus:ring-1 focus:ring-gray-200 focus:border-[#03C9D7] outline-none transition-all text-sm"
              placeholder="Password"
              disabled={loading}
              required
            />
          </div>

          {/* Voice */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Voice phrase
            </label>
            <p className="text-xs text-gray-500 italic mb-3">
              Say the same phrase you used during signup
            </p>
            <AudioRecorder
              onRecordingComplete={handleRecordingComplete}
              disabled={loading}
            />
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-500">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4"
              />
              Remember me
            </label>

            <a href="#" className="text-[#039BAB] hover:underline">
              Forgot password?
            </a>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          <button type="submit" className={buttonClasses} disabled={loading || !audioBlob}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        {/* <div className="relative py-0.5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs lg:text-sm">
            <span className="px-2 bg-white lg:bg-gray-100 text-gray-500">Or continue with</span>
          </div>
        </div> */}

        {/* Social */}
        {/* <div className="grid grid-cols-3 gap-2 lg:gap-3">
          <button type="button" className={buttonForGFT}>
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
          </button>
          <button type="button" className={buttonForGFT}>
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </button>
          <button type="button" className={buttonForGFT}>
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
            </svg>
          </button>
        </div> */}

        <p className="text-xs lg:text-sm text-center text-gray-600 mt-2 border-t border-gray-100 pt-2 lg:pt-3">
          Don’t have an account?{" "}
          <button type="button" onClick={onToggleSignUp} className="text-[#039BAB] font-medium hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
