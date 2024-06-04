// LoadingSpinner.js
import React from "react";
import { TailSpin } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <TailSpin height="50" width="50" color="#007bff" ariaLabel="loading" />
    </div>
  );
};

export default LoadingSpinner;
