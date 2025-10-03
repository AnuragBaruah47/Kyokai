import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <div className="p-10 rounded-2xl text-center shadow-2xl border border-gray-700">
        <h1 className="text-7xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-red-500 mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-400 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 hover:cursor-pointer py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-lg"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
