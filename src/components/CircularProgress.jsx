// CircularProgress.js
import React, { useEffect, useState } from "react";
import Styles from "../Styles/CircularProgress.module.css";

const CircularProgress = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {

    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 70); // Speed of progress increment
      return () => clearInterval(interval);
    } else {
      onComplete(); 
    }
  }, [progress, onComplete]);

  return (
    <div className={Styles.progressContainer}>
      <div className={Styles.circularProgress}>
        <span className={Styles.progressText}>{progress}%</span>
      </div>
    </div>
  );
};

export default CircularProgress;
