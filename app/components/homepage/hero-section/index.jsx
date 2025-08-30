// @flow strict
"use client";

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import SplitText from "../../../SplitText";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { heroAnimations, backgroundAnimations } from "@/utils/gsap-animations";

function HeroSection() {
  const heroRef = useRef(null);
  const codeRef = useRef(null);
  const socialRef = useRef(null);
  const buttonsRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Initialize hero animations
    const mainTimeline = heroAnimations.mainTimeline(
      heroRef.current,
      codeRef.current,
      socialRef.current,
      buttonsRef.current
    );

    // Code typing animation
    const codeTimeline = heroAnimations.codeTyping(codeRef.current);

    // Floating particles animation
    if (particlesRef.current) {
      const particles =
        particlesRef.current.querySelectorAll(".floating-particle");
      backgroundAnimations.floatingParticles(particles);
    }

    // Ensure social icons are visible after animations
    if (socialRef.current) {
      gsap.set(socialRef.current.children, {
        opacity: 1,
        visibility: "visible",
        display: "block",
      });
    }

    // Ensure buttons are visible after animations
    if (buttonsRef.current) {
      gsap.set(buttonsRef.current.children, {
        opacity: 1,
        visibility: "visible",
        display: "block",
      });
    }

    return () => {
      mainTimeline.kill();
      codeTimeline.kill();
    };
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-between pt-32 overflow-hidden">
      {/* Hero background image */}
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      />

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-particle absolute top-1/4 left-1/4 w-2 h-2 bg-[#16f2b3] rounded-full opacity-60"></div>
        <div className="floating-particle absolute top-1/3 right-1/3 w-1 h-1 bg-[#16f2b3] rounded-full opacity-40"></div>
        <div className="floating-particle absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#16f2b3] rounded-full opacity-50"></div>
        <div className="floating-particle absolute top-1/2 right-1/4 w-1 h-1 bg-[#16f2b3] rounded-full opacity-30"></div>
        <div className="floating-particle absolute bottom-1/3 right-1/4 w-2 h-2 bg-[#16f2b3] rounded-full opacity-70"></div>
      </div>

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        {/* Left Section */}
        <div
          ref={heroRef}
          className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10"
        >
          <SplitText
            text={`Hello, This is ${personalData.name}, I'm a Professional ${personalData.designation}.`}
            className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
          />

          {/* Social Icons - Enhanced visibility and debugging */}
          <div
            ref={socialRef}
            className="my-12 flex items-center gap-5 opacity-100 visible"
            style={{
              opacity: 1,
              visibility: "visible",
              display: "flex",
              zIndex: 10,
            }}
          >
            <Link
              href={personalData.github}
              target="_blank"
              className="transition-all text-pink-500 hover:scale-125 duration-300 hover:text-[#16f2b3] block opacity-100"
              style={{ opacity: 1, display: "block" }}
            >
              <BsGithub size={30} />
            </Link>
            <Link
              href={personalData.linkedIn}
              target="_blank"
              className="transition-all text-pink-500 hover:scale-125 duration-300 hover:text-[#16f2b3] block opacity-100"
              style={{ opacity: 1, display: "block" }}
            >
              <BsLinkedin size={30} />
            </Link>
            <Link
              href={personalData.facebook}
              target="_blank"
              className="transition-all text-pink-500 hover:scale-125 duration-300 hover:text-[#16f2b3] block opacity-100"
              style={{ opacity: 1, display: "block" }}
            >
              <FaFacebook size={30} />
            </Link>
          </div>

          {/* Contact & Resume Buttons - Enhanced visibility */}
          <div
            ref={buttonsRef}
            className="flex items-center gap-3 opacity-100 visible"
            style={{
              opacity: 1,
              visibility: "visible",
              display: "flex",
              zIndex: 10,
            }}
          >
            <Link
              href="#contact"
              className="bg-gradient-to-r from-violet-600 to-pink-500 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600 hover:scale-105"
            >
              <button className="px-3 md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-white flex items-center gap-1 hover:gap-3">
                <span>Contact me</span>
                <RiContactsFill size={16} />
              </button>
            </Link>
            <Link
              href={personalData.resume}
              target="_blank"
              className="bg-gradient-to-r from-violet-600 to-pink-500 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600 hover:scale-105"
            >
              <button className="px-3 md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-white flex items-center gap-1 hover:gap-3">
                <span>Get Resume</span>
                <MdDownload size={16} />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section (Code window) */}
        <div
          ref={codeRef}
          className="order-1 lg:order-2 relative rounded-lg border border-[#1b2c68a0] bg-gradient-to-r from-[#0d1224] to-[#0a0d37] hover:border-[#16f2b3]/50 transition-all duration-500"
        >
          <div className="flex flex-row">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
          </div>

          <div className="px-4 lg:px-8 py-5">
            <div className="flex flex-row space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-orange-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-200"></div>
            </div>
          </div>

          <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
            <code className="font-mono text-xs md:text-sm lg:text-base">
              <div className="blink">
                <span className="mr-2 text-pink-500">const</span>
                <span className="mr-2 text-white">coder</span>
                <span className="mr-2 text-pink-500">=</span>
                <span className="text-gray-400">{"{"}</span>
              </div>

              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
                <span className="text-gray-400">&apos;</span>
                <span className="text-amber-300">Mohamed Ashraf</span>
                <span className="text-gray-400">&apos;,</span>
              </div>

              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">location:</span>
                <span className="text-gray-400">&apos;</span>
                <span className="text-amber-300">Cairo, Egypt</span>
                <span className="text-gray-400">&apos;,</span>
              </div>

              <div className="ml-4 lg:ml-8 mr-2">
                <span className="text-white">skills:</span>
                <span className="text-gray-400">{`['`}</span>
                <span className="text-amber-300">
                  React, NextJS, Redux, Zustand, Node.js, Express, MongoDB,
                  Bootstrap, Tailwind, Shadcn, Typescript, Angular, Git
                </span>
                <span className="text-gray-400">],</span>
              </div>

              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">
                  openToWork:
                </span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>

              <div className="ml-4 lg:ml-8 mr-2">
                <span className="text-white">interests:</span>
                <span className="text-gray-400">{`['Problem Solving', 'Web Development', 'UI/UX', 'Learning New Tech']`}</span>
                <span className="text-gray-400">,</span>
              </div>

              <div>
                <span className="text-gray-400">{"}"}</span>
              </div>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
