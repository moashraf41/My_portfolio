"use client";

import {
  useGSAPAnimations,
  useScrollAnimations,
} from "@/utils/use-gsap-animations";

const GSAPInitializer = () => {
  // Initialize GSAP animations
  useGSAPAnimations();

  // Handle scroll animations
  useScrollAnimations();

  return null; // This component doesn't render anything
};

export default GSAPInitializer;
