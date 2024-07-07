// LoadingSpinner.js
import React from "react";
import { TailSpin } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <TailSpin height="30" width="30" color="#333" ariaLabel="loading" />
    </div>
  );
};

export default LoadingSpinner;
