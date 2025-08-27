"use client";

import { projectsData } from "@/utils/data/projects-data";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { projectAnimations, sectionAnimations } from "@/utils/gsap-animations";

// SpotlightCard Component
const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => {
        setIsFocused(true);
        setOpacity(0.6);
      }}
      onBlur={() => {
        setIsFocused(false);
        setOpacity(0);
      }}
      onMouseEnter={() => setOpacity(0.6)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      projectAnimations.projectHover(cardRef.current);
    }
  }, []);

  return (
    <SpotlightCard
      ref={cardRef}
      className="project-card group hover:scale-[1.02] transition-all duration-500"
      spotlightColor="rgba(22, 242, 179, 0.15)"
    >
      <div className="relative flex flex-col">
        {/* Code Window Header */}
        <div className="flex flex-row mb-4">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#16f2b3] to-violet-600 animate-pulse"></div>
          <div className="h-[2px] w-full bg-gradient-to-r from-violet-600 to-transparent animate-pulse delay-500"></div>
        </div>

        {/* Window Controls */}
        <div className="flex flex-row space-x-2 mb-6">
          <div className="h-3 w-3 rounded-full bg-red-400 animate-pulse hover:scale-125 transition-all duration-300"></div>
          <div className="h-3 w-3 rounded-full bg-orange-400 animate-pulse delay-300 hover:scale-125 transition-all duration-300"></div>
          <div className="h-3 w-3 rounded-full bg-green-200 animate-pulse delay-700 hover:scale-125 transition-all duration-300"></div>
        </div>

        {/* Project Image */}
        <div className="project-content relative mb-6 rounded-lg overflow-hidden border border-[#16f2b3]/20 group-hover:border-[#16f2b3]/40 transition-all duration-300">
          <div className="aspect-video relative">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover object-top transition-all duration-500 group-hover:scale-110 filter brightness-90 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-[#16f2b3] transition-colors duration-300">
            {project.name}
          </h3>

          <div className="inline-block">
            <span className="px-3 py-1 bg-gradient-to-r from-[#16f2b3] to-[#00d9ff] text-black font-semibold rounded-full text-sm">
              {project.role}
            </span>
          </div>

          <p className="text-gray-300 text-sm lg:text-base leading-relaxed line-clamp-5">
            {project.description}
          </p>

          <div>
            <h4 className="text-white font-semibold mb-2 text-sm">
              Technologies:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gradient-to-r from-violet-600/20 to-pink-500/20 border border-violet-500/30 text-violet-300 text-xs rounded-md hover:scale-105 transition-all duration-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6 pt-4 border-t border-[#16f2b3]/20">
          {project.private ? (
            <div className="relative group">
              <button
                disabled
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 text-gray-400 rounded-lg border border-gray-700 cursor-not-allowed"
              >
                <BsGithub className="w-4 h-4" />
                <span className="text-sm">Code</span>
              </button>

              {/* Custom Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 text-xs text-white bg-black/80 backdrop-blur-md rounded-md shadow-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none">
                secret 🔒
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45"></div>
              </div>
            </div>
          ) : (
            <Link
              href={project.code}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-[#16f2b3]/50 group/btn"
            >
              <BsGithub className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
              <span className="text-sm">Code</span>
            </Link>
          )}

          {project.deployed === false ? (
            <div className="relative group">
              <button
                disabled
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 text-gray-400 rounded-lg border border-gray-700 cursor-not-allowed"
              >
                <FiExternalLink className="w-4 h-4" />
                <span className="text-sm">Live Demo</span>
              </button>
            </div>
          ) : (
            <Link
              href={project.demo}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#16f2b3] to-[#00d9ff] hover:from-[#00d9ff] hover:to-[#16f2b3] text-black rounded-lg transition-all duration-300 hover:scale-105 font-semibold group/btn"
            >
              <FiExternalLink className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
              <span className="text-sm">Live Demo</span>
            </Link>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
};

const Projects = () => {
  const projectsRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      sectionAnimations.scaleInBounce(titleRef.current, 0.2);
    }

    // Project cards entrance animation
    if (cardsRef.current) {
      const projectCards = cardsRef.current.querySelectorAll(".project-card");
      projectAnimations.projectsEntrance(projectCards);
    }

    // Main container animation
    if (projectsRef.current) {
      sectionAnimations.fadeInStagger([projectsRef.current], 0.1, 0.1);
    }
  }, []);

  return (
    <div
      ref={projectsRef}
      id="projects"
      className="relative z-40 my-12 lg:my-24"
    >
      <div ref={titleRef} className="mb-16">
        <div className="relative">
          <div className="w-[120px] h-[120px] bg-gradient-to-r from-[#16f2b3]/20 to-violet-600/20 rounded-full absolute -top-6 left-0 translate-x-1/2 filter blur-3xl opacity-40 animate-pulse"></div>
          <div className="flex items-center justify-start relative">
            <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
              Projects
            </span>
            <span className="w-full h-[3px] bg-gradient-to-r from-[#1a1443] via-[#16f2b3] to-[#1a1443] rounded-full shadow-lg"></span>
          </div>
        </div>
      </div>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        {projectsData.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
