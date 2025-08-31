"use client";

import { useEffect, useState } from "react";

export default function GlobalLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Store original body styles
    const originalStyle = window.getComputedStyle(document.body);
    const originalOverflow = originalStyle.overflow;
    const originalHeight = originalStyle.height;

    // Completely prevent scrolling
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = "0";
    document.body.style.left = "0";

    // Prevent all scroll events
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    document.addEventListener("wheel", preventScroll, {
      passive: false,
      capture: true,
    });
    document.addEventListener("touchmove", preventScroll, {
      passive: false,
      capture: true,
    });
    document.addEventListener("scroll", preventScroll, {
      passive: false,
      capture: true,
    });
    document.addEventListener(
      "keydown",
      (e) => {
        if (
          e.key === "ArrowUp" ||
          e.key === "ArrowDown" ||
          e.key === "PageUp" ||
          e.key === "PageDown" ||
          e.key === "Home" ||
          e.key === "End" ||
          e.key === " "
        ) {
          e.preventDefault();
          return false;
        }
      },
      { passive: false, capture: true }
    );

    // Simple progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10 + 5;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    // Hide loading after page is fully loaded
    const handleLoad = () => {
      setProgress(100);

      setTimeout(() => {
        setIsLoading(false);

        // Restore original body styles
        document.body.style.overflow = originalOverflow;
        document.body.style.height = originalHeight;
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        document.body.style.left = "";

        // Remove all event listeners
        document.removeEventListener("wheel", preventScroll, { capture: true });
        document.removeEventListener("touchmove", preventScroll, {
          capture: true,
        });
        document.removeEventListener("scroll", preventScroll, {
          capture: true,
        });
      }, 800);
    };

    if (document.readyState === "complete") {
      setTimeout(handleLoad, 1500);
    } else {
      window.addEventListener("load", () => {
        setTimeout(handleLoad, 1500);
      });
    }

    return () => {
      clearInterval(progressInterval);

      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.left = "";

      document.removeEventListener("wheel", preventScroll, { capture: true });
      document.removeEventListener("touchmove", preventScroll, {
        capture: true,
      });
      document.removeEventListener("scroll", preventScroll, { capture: true });
    };
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .loading-spinner {
          animation: spin 2s linear infinite;
        }

        .loading-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .loading-fadeIn {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      <div
        className="fixed inset-0 bg-gradient-to-br from-[#0d1224] via-[#1a1443] to-[#0d1224] z-[9999] overflow-hidden"
        style={{
          opacity: isLoading ? 1 : 0,
          visibility: isLoading ? "visible" : "hidden",
          transition: "all 0.8s ease-out",
          pointerEvents: "none",
        }}
      >
        {/* Simple Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #16f2b3 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-12 loading-fadeIn">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#16f2b3] mb-4">
                Mohamed Ashraf
              </h1>
              <p className="text-xl text-gray-300">Full Stack Developer</p>
            </div>

            {/* Simple Elegant Spinner */}
            <div className="mb-8 loading-fadeIn">
              <div className="relative w-16 h-16 mx-auto">
                {/* Outer ring */}
                <div className="absolute inset-0 border-4 border-[#16f2b3]/30 rounded-full" />
                {/* Spinning part */}
                <div className="absolute inset-0 border-4 border-transparent border-t-[#16f2b3] rounded-full loading-spinner" />
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#16f2b3] rounded-full transform -translate-x-1/2 -translate-y-1/2 loading-pulse" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-64 mx-auto loading-fadeIn">
              <div className="w-full bg-[#1a1443] rounded-full h-1 mb-3 border border-[#25213b]">
                <div
                  className="h-full bg-gradient-to-r from-[#16f2b3] to-violet-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-[#16f2b3] text-sm">
                {Math.floor(Math.min(progress, 100))}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
