'use client';
import { useState, useEffect } from "react";

export const NeonStylePreloader: React.FC = () => {
  // State to control the visibility of the preloader.
  // Initially true to show the preloader.
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Function to handle the 'load' event of the window.
    // This event fires when all resources (images, scripts, stylesheets, etc.) have finished loading.
    const handleLoad = () => {
      setIsVisible(false); // Set visibility to false to trigger the fade-out transition.

      // Optional: Remove the preloader element from the DOM after its transition completes.
      // This is good for performance and ensures it doesn't interfere with interactions
      // once it's no longer needed.
      const preloaderElement = document.getElementById('global-preloader');
      if (preloaderElement) {
        // Listen for the 'transitionend' event to ensure the element is removed
        // only after the CSS opacity transition has finished.
        preloaderElement.addEventListener('transitionend', () => {
          preloaderElement.remove();
        }, { once: true }); // Use { once: true } to automatically remove the listener after it fires.
      }
    };

    // Add the 'load' event listener to the window.
    // This will ensure `handleLoad` is called when the page is fully loaded.
    window.addEventListener('load', handleLoad);

    // Cleanup function: Remove the event listener when the component unmounts.
    // This prevents memory leaks and ensures the listener isn't active if the component is removed prematurely.
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []); // Empty dependency array ensures this effect runs only once after the initial render.

  // If the preloader is not visible, we render a div that is already faded out
  // and has pointer-events: none, effectively making it invisible and unclickable.
  // It will then be removed from the DOM by the useEffect cleanup.
  if (!isVisible) {
    return (
      <div
        id="global-preloader"
        className="fixed inset-0 flex flex-col items-center justify-center bg-gray-950 z-[9999] opacity-0 transition-opacity duration-500 pointer-events-none"
        aria-hidden={!isVisible} // Pass boolean directly for aria-hidden
      >
        {/* Preloader content (will not be seen as opacity is 0) */}
      </div>
    );
  }

  // Initial render state: preloader is visible (opacity-100).
  return (
    <div
      id="global-preloader"
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-950 z-[9999] opacity-100 transition-opacity duration-500 text-green-400 font-mono"
      aria-hidden={!isVisible} // Convert boolean to string for aria-hidden
    >
      {/* Custom CSS for glitch and pulse effects */}
      {/* Removed 'jsx' attribute from style tag as it's not being used with styled-jsx */}
      <style>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes pulse-scan {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
          }
          100% {
            transform: scaleX(0);
            opacity: 0;
          }
        }

        .glitch-text {
          animation: glitch 0.2s infinite alternate;
        }

        .scan-line {
          animation: pulse-scan 1.5s infinite ease-in-out;
        }
      `}</style>

      {/*
        ///////////////////////////////////////////////////////////////////
        // PRELOADER ANIMATION AREA - CYBERPUNK/HACKER THEME
        ///////////////////////////////////////////////////////////////////
      */}

      <div className="relative text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-4 uppercase glitch-text text-shadow-neon">
          ACCESSING DATA...
        </h2>
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mb-8">
          <div className="h-full bg-green-500 scan-line"></div>
        </div>
        <p className="text-xl md:text-2xl text-gray-400 animate-pulse">
          INITIATING PROTOCOL // 010101
        </p>
      </div>

      <div className="absolute top-4 left-4 text-sm text-blue-400 opacity-70 animate-fade-in-up">
        [SYS_LOG] Attempting connection...
      </div>
      <div className="absolute bottom-4 right-4 text-sm text-red-400 opacity-70 animate-fade-in-down">
        [STATUS] Verifying checksum...
      </div>

      {/* Binary code background elements */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-2 p-8 opacity-5">
        {Array.from({ length: 100 }).map((_, i) => (
          <span key={i} className="text-xs text-green-300 animate-pulse" style={{ animationDelay: `1s` }}>
            {Math.random() > 0.5 ? '0' : '1'}
          </span>
        ))}
      </div>

      {/*
        ///////////////////////////////////////////////////////////////////
        // END PRELOADER ANIMATION AREA
        ///////////////////////////////////////////////////////////////////
      */}
    </div>
  );
};