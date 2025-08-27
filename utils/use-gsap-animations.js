import { useEffect } from "react";
import { initAnimations, gsapUtils } from "./gsap-animations";

export const useGSAPAnimations = () => {
  useEffect(() => {
    // Initialize GSAP animations
    initAnimations();

    // Cleanup function
    return () => {
      // Kill all animations when component unmounts
      gsapUtils.killAll();
    };
  }, []);
};

export const useScrollAnimations = () => {
  useEffect(() => {
    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      gsapUtils.refreshScrollTrigger();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
};

export default useGSAPAnimations;
