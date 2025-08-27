// @flow strict
"use client";

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  sectionAnimations,
  backgroundAnimations,
} from "@/utils/gsap-animations";

function AboutSection() {
  const aboutRef = useRef(null);
  const textContentRef = useRef(null);
  const imageRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Slide in from sides animation
    const textElements =
      textContentRef.current?.querySelectorAll(".animate-on-scroll");
    const imageElement = imageRef.current;

    if (textElements && imageElement) {
      sectionAnimations.slideInFromSides(
        Array.from(textElements),
        [imageElement],
        0.2
      );
    }

    // Floating particles animation
    if (particlesRef.current) {
      const particles =
        particlesRef.current.querySelectorAll(".floating-particle");
      backgroundAnimations.floatingParticles(particles);
    }

    // Scale in animation for the main container
    if (aboutRef.current) {
      sectionAnimations.scaleInBounce(aboutRef.current, 0.1);
    }
  }, []);

  return (
    <div
      ref={aboutRef}
      id="about"
      className="my-12 lg:my-16 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-particle absolute top-1/4 left-1/4 w-32 h-32 bg-[#16f2b3]/10 rounded-full blur-3xl"></div>
        <div className="floating-particle absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#1a1443]/20 rounded-full blur-2xl"></div>
        <div className="floating-particle absolute top-1/2 left-1/2 w-24 h-24 bg-[#16f2b3]/5 rounded-full blur-xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Side Label - Original */}
        <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
          <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
            ABOUT ME
          </span>
          <span className="h-36 w-[2px] bg-[#1a1443]"></span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div ref={textContentRef} className="order-2 lg:order-1 space-y-8">
            {/* Glowing Header */}
            <div className="animate-on-scroll relative">
              <p className="font-bold mb-8 text-[#16f2b3] text-2xl lg:text-3xl uppercase tracking-wider relative z-10">
                <span className="bg-gradient-to-r from-[#16f2b3] to-[#00d9ff] bg-clip-text text-transparent">
                  Who I Am?
                </span>
              </p>
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#16f2b3] to-transparent rounded-full"></div>
            </div>

            {/* Description with Enhanced Styling */}
            <div className="animate-on-scroll relative">
              <p className="text-gray-200 text-base lg:text-xl leading-relaxed lg:leading-relaxed relative z-10 p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-[#1a1443]/20 to-transparent border border-[#16f2b3]/20 backdrop-blur-sm shadow-2xl">
                {personalData.description}
              </p>
              {/* Glow effect behind text */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#16f2b3]/10 to-[#1a1443]/10 rounded-2xl blur-xl -z-10"></div>
            </div>
          </div>

          {/* Image Section - Completely Redesigned */}
          <div
            ref={imageRef}
            className="flex justify-center order-1 lg:order-2 relative"
          >
            <div className="relative group">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 w-80 h-80 lg:w-96 lg:h-96 border-2 border-[#16f2b3]/30 rounded-full animate-spin"></div>

              {/* Middle pulsing ring */}
              <div className="absolute inset-4 w-72 h-72 lg:w-88 lg:h-88 border border-[#16f2b3]/50 rounded-full animate-pulse"></div>

              {/* Inner glow ring */}
              <div className="absolute inset-8 w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-r from-[#16f2b3]/20 to-[#1a1443]/20 rounded-full blur-md"></div>

              {/* Image container with enhanced effects */}
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 m-8 lg:m-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#16f2b3] to-[#1a1443] rounded-full p-1">
                  <div className="w-full h-full bg-black rounded-full p-2">
                    <Image
                      src={personalData.profile}
                      width={320}
                      height={320}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 filter grayscale group-hover:grayscale-0 brightness-90 group-hover:brightness-110"
                    />
                  </div>
                </div>

                {/* Floating particles */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#16f2b3] rounded-full animate-bounce delay-0"></div>
                <div className="absolute -top-4 right-8 w-2 h-2 bg-[#16f2b3] rounded-full animate-bounce delay-300"></div>
                <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[#16f2b3] rounded-full animate-bounce delay-700"></div>
                <div className="absolute -bottom-4 left-12 w-2 h-2 bg-[#16f2b3] rounded-full animate-bounce delay-1000"></div>
                <div className="absolute top-8 -right-4 w-2 h-2 bg-[#16f2b3] rounded-full animate-bounce delay-500"></div>
              </div>

              {/* Holographic effect overlay */}
              <div className="absolute inset-0 w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-tr from-transparent via-[#16f2b3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
