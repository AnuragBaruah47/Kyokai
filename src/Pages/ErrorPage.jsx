import React from "react";

const ErrorPage = ({ errorMessage = "Something went wrong!" }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-lg">{errorMessage}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;