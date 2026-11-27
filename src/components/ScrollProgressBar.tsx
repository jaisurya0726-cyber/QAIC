import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200/50 backdrop-blur-xs pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 transition-all duration-150 shadow-xs"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
};
