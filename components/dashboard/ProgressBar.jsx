"use client";
import React, { useEffect, useState } from "react";

export default function ProgressBar({ current, total }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // setProgress((current / total) * 100);
    // make this but with timeout to see the progress bar
    // use timeout to simulate the progress bar
    const timeout = setTimeout(() => {
      setProgress((current / total) * 100);
    }, 500);
  }, [current, total]);
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
}
