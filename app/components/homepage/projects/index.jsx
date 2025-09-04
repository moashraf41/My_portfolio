"use client";

import { projectsData } from "@/utils/data/projects-data";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
const ProjectCard = ({ project, index }) => {
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
      style={{ animationDelay: `${index * 0.1}s` }}
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

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Show 5 page numbers at most

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-700 bg-gray-800/60 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <div key={index}>
          {page === "..." ? (
            <span className="flex items-center justify-center w-10 h-10 text-gray-500">
              ...
            </span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-300 ${
                currentPage === page
                  ? "border-[#16f2b3] bg-gradient-to-r from-[#16f2b3] to-[#00d9ff] text-black font-semibold"
                  : "border-gray-700 bg-gray-800/60 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-[#16f2b3]/50"
              }`}
            >
              {page}
            </button>
          )}
        </div>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-700 bg-gray-800/60 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const Projects = () => {
  const projectsRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Pagination settings
  const projectsPerPage = 6; // Adjust this number as needed
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);

  // Calculate current projects to display
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projectsData.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setIsInitialLoad(false);

      // Smooth scroll to projects section when changing pages
      if (projectsRef.current) {
        projectsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  useEffect(() => {
    // Only run initial animations on first load
    if (isInitialLoad) {
      // Title animation
      if (titleRef.current) {
        sectionAnimations.scaleInBounce(titleRef.current, 0.2);
      }

      // Main container animation
      if (projectsRef.current) {
        sectionAnimations.fadeInStagger([projectsRef.current], 0.1, 0.1);
      }
    }
  }, [isInitialLoad]);

  useEffect(() => {
    // Project cards entrance animation - runs for both initial load and pagination
    if (cardsRef.current) {
      const projectCards = cardsRef.current.querySelectorAll(".project-card");
      if (projectCards.length > 0) {
        // Use a lighter animation for pagination changes
        if (isInitialLoad) {
          projectAnimations.projectsEntrance(projectCards);
        } else {
          // Simple fade-in for pagination
          projectCards.forEach((card, index) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
              card.style.transition = "all 0.4s ease-out";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, index * 100);
          });
        }
      }
    }
  }, [currentProjects, isInitialLoad]);

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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 min-h-[600px]"
      >
        {currentProjects.map((project, index) => (
          <ProjectCard
            key={`${currentPage}-${index}`}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* Show pagination only if there are multiple pages */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Projects;
