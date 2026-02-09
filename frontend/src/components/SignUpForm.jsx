import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AudioRecorder from "./AudioRecorder";
import { signup } from "../services/api";

const SignUpForm = ({ buttonClasses, buttonForGFT, onToggleSignIn }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRecordingComplete = (blob) => {
    setAudioBlob(blob);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!fullName || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setError("Accept terms first");
      return;
    }

    if (!audioBlob) {
      setError("Record your voice phrase");
      return;
    }

    setLoading(true);

    try {
      await signup(fullName, email, password, audioBlob);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-100 rounded-2xl shadow-xl border border-gray-200 my-4 mx-auto">
      <div className="px-8 py-6 space-y-5">
        <div className="text-center space-y-1 mb-4">
          <h1 className="text-2xl font-bold text-[#03C9D7]">Create Account</h1>
          <p className="text-sm text-gray-500">Sign up to get started</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-10 pl-11 pr-3 rounded-lg border border-gray-300 bg-[#d5f2ec] focus:ring-1 focus:ring-gray-200 focus:border-[#03C9D7] outline-none transition-all text-sm"
              required
              disabled={loading}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 pl-11 pr-3 rounded-lg border border-gray-300 bg-[#d5f2ec] focus:ring-1 focus:ring-gray-200 focus:border-[#03C9D7] outline-none transition-all text-sm"
              required
              disabled={loading}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 pl-11 pr-3 rounded-lg border border-gray-300 bg-[#d5f2ec] focus:ring-1 focus:ring-gray-200 focus:border-[#03C9D7] outline-none transition-all text-sm"
              required
              disabled={loading}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-10 pl-11 pr-3 rounded-lg border border-gray-300 bg-[#d5f2ec] focus:ring-1 focus:ring-gray-200 focus:border-[#03C9D7] outline-none transition-all text-sm"
              required
              disabled={loading}
            />
          </div>

          {/* Voice */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Voice phrase
            </label>
            <p className="text-xs text-gray-500 italic">
              Say something like: &quot;My voice is my password&quot;
            </p>
            <AudioRecorder 
              onRecordingComplete={handleRecordingComplete}
              disabled={loading}
            />
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input 
                type="checkbox" 
                checked={agreeTerms} 
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded bg-gray-50"
                required
                disabled={loading}
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
                I agree to the{" "}
                <a href="#" className="text-[#039BAB] hover:underline font-medium">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#039BAB] hover:underline font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          {error && <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</div>}
          {success && <div className="text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg">Account created!</div>}

          <button type="submit" className={buttonClasses} disabled={loading || !audioBlob || !agreeTerms}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-100 text-gray-500">Or sign up with</span>
          </div>
        </div> */}

        {/* Social */}
        {/* <div className="grid grid-cols-3 gap-3">
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

        <p className="text-sm text-center text-gray-600 mt-3 border-t border-gray-100 pt-3">
          Already have an account?{" "}
          <button type="button" onClick={onToggleSignIn} className="text-[#039BAB] font-medium hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
