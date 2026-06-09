"use client";

import React, { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: "4px",
        background: "var(--accent-gradient)",
        zIndex: 2000,
        transition: "width 0.1s ease-out",
        boxShadow: "0 0 10px rgba(212, 175, 55, 0.6)"
      }}
    />
  );
}
