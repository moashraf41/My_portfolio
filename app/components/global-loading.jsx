"use client";

import { useEffect, useState } from "react";

export default function GlobalLoading() {
  const [isLoading, setIsLoading] = useState(true);

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

    // Add multiple event listeners to catch all scroll attempts
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
          e.key === " " // Spacebar
        ) {
          e.preventDefault();
          return false;
        }
      },
      { passive: false, capture: true }
    );

    // Hide loading after page is fully loaded
    const handleLoad = () => {
      // Small delay to ensure smooth transition
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
      }, 500);
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);

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
      document.removeEventListener("scroll", preventScroll, { capture: true });
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-[#0d1224] via-[#1a1443] to-[#0d1224] z-[9999] overflow-hidden"
      style={{
        opacity: isLoading ? 1 : 0,
        transition: "opacity 0.5s ease-out",
        pointerEvents: "none",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Code Symbols */}
        <div
          className="absolute top-1/4 left-1/4 text-[#16f2b3]/20 text-6xl animate-bounce"
          style={{ animationDelay: "0s" }}
        >
          &lt;/&gt;
        </div>
        <div
          className="absolute top-1/3 right-1/3 text-[#16f2b3]/20 text-4xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >{`{}`}</div>
        <div
          className="absolute bottom-1/4 left-1/3 text-[#16f2b3]/20 text-5xl animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          &lt;/&gt;
        </div>
        <div
          className="absolute top-1/2 right-1/4 text-[#16f2b3]/20 text-3xl animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >{`[]`}</div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #16f2b3 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Animated Logo/Name */}
          <div className="mb-12">
            <div className="relative">
              {/* Main Name - Simple and Clean */}
              <h1 className="text-6xl md:text-7xl font-bold text-[#16f2b3]">
                Mohamed Ashraf
              </h1>
            </div>

            {/* Animated Subtitle */}
            <div className="mt-4 overflow-hidden">
              <p className="text-xl md:text-2xl text-gray-300 font-medium animate-slideUp">
                Full Stack Developer
              </p>
            </div>
          </div>

          {/* Creative Loading Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Outer Ring */}
              <div className="w-20 h-20 border-4 border-[#16f2b3]/30 rounded-full animate-spin"></div>

              {/* Inner Ring */}
              <div
                className="absolute top-2 left-2 w-16 h-16 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>

              {/* Center Dot */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#16f2b3] rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>

              {/* Floating Particles */}
              <div
                className="absolute top-0 left-1/2 w-2 h-2 bg-[#16f2b3] rounded-full transform -translate-x-1/2 animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#00d4ff] rounded-full transform -translate-x-1/2 animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="absolute top-1/2 left-0 w-2 h-2 bg-[#16f2b3] rounded-full transform -translate-y-1/2 animate-bounce"
                style={{ animationDelay: "0.6s" }}
              ></div>
              <div
                className="absolute top-1/2 right-0 w-2 h-2 bg-[#00d4ff] rounded-full transform -translate-y-1/2 animate-bounce"
                style={{ animationDelay: "0.9s" }}
              ></div>
            </div>
          </div>

          {/* Animated Loading Text */}
          <div className="relative">
            <p className="text-lg text-gray-400 font-medium">
              <span
                className="inline-block animate-fadeIn"
                style={{ animationDelay: "0s" }}
              >
                L
              </span>
              <span
                className="inline-block animate-fadeIn"
                style={{ animationDelay: "0.1s" }}
              >
                o
              </span>
              <span
                className="inline-block animate-fadeIn"
                style={{ animationDelay: "0.2s" }}
              >
                a
              </span>
              <span
                className="inline-block animate-fadeIn"
                style={{ animationDelay: "0.3s" }}
              >
                d
              </span>
              <span
                className="inline-block animate-fadeIn"
                style={{ animationDelay: "0.4s" }}
              >
                i
              </span>
              <span
                className="inline-block animate-fadeIn"
                style={{ animationDelay: "0.5s" }}
              >
                n
              </span>
              <span
                className="inline-block animate-fadeIn"
                style={{ animationDelay: "0.6s" }}
              >
                g
              </span>
              <span
                className="inline-block animate-fadeIn"
                style={{ animationDelay: "0.7s" }}
              >
                .
              </span>
              <span
                className="inline-block animate-fadeIn"
                style={{ animationDelay: "0.8s" }}
              >
                .
              </span>
              <span
                className="inline-block animate-fadeIn"
                style={{ animationDelay: "0.9s" }}
              >
                .
              </span>
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 w-64 mx-auto">
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#16f2b3] to-[#00d4ff] rounded-full animate-progressBar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
