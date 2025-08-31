"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollToPlugin);

// Music Control Component
const MusicControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef(null);

  // Replace with your audio file URL
  const audioSrc = "/sound (mp3cut.net).mp3"; // Update this path

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.07;
    audio.loop = true;

    // Handle audio events
    const handleCanPlay = () => {
      console.log("Audio loaded");
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (!hasStarted) {
        await audio.play();
        setHasStarted(true);
        setIsPlaying(true);
        setIsMuted(false);
      } else if (isPlaying) {
        if (isMuted) {
          audio.volume = 0.07;
          setIsMuted(false);
        } else {
          audio.volume = 0;
          setIsMuted(true);
        }
      } else {
        await audio.play();
        setIsPlaying(true);
        setIsMuted(false);
        audio.volume = 0.07;
      }
    } catch (error) {
      console.error("Audio play error:", error);
    }
  };

  // Animation variants for the music waves
  const waveVariants = {
    playing: {
      scaleY: [0.5, 1.2, 0.8, 1.5, 0.6, 1.1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    muted: {
      scaleY: 0.3,
      transition: {
        duration: 0.3,
      },
    },
    stopped: {
      scaleY: 0.5,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Get current state for animation
  const getAnimationState = () => {
    if (!hasStarted) return "stopped";
    if (isMuted) return "muted";
    if (isPlaying) return "playing";
    return "stopped";
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioSrc} preload="auto" />

      {/* Music Control Button */}
      <motion.button
        onClick={toggleMusic}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#16f2b3]/20 to-[#8b5cf6]/20 backdrop-blur-sm border border-[#16f2b3]/30 hover:border-[#16f2b3]/60 transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={
          !hasStarted ? "Start music" : isMuted ? "Unmute music" : "Mute music"
        }
      >
        {/* Outer glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#16f2b3]/10 to-[#8b5cf6]/10 blur-md group-hover:blur-lg transition-all duration-300" />

        {/* Music icon container */}
        <div className="relative flex items-center justify-center w-6 h-6">
          <AnimatePresence mode="wait">
            {!hasStarted ? (
              // Play icon
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center"
              >
                <div className="w-0 h-0 border-l-[8px] border-l-[#16f2b3] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1" />
              </motion.div>
            ) : (
              // Music waves icon
              <motion.div
                key="waves"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="flex items-end justify-center space-x-0.5 h-4"
              >
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className={`w-1 rounded-full ${
                      isMuted ? "bg-gray-500" : "bg-[#16f2b3]"
                    }`}
                    style={{ height: `${12 + i * 2}px` }}
                    variants={waveVariants}
                    animate={getAnimationState()}
                    transition={{
                      delay: i * 0.1,
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mute indicator */}
          <AnimatePresence>
            {isMuted && hasStarted && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center"
              >
                <div className="w-1 h-1 bg-white rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pulse effect when playing */}
        <AnimatePresence>
          {isPlaying && !isMuted && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full border-2 border-[#16f2b3]"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

// Enhanced GooeyNav component with better responsive handling
const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  onItemClick = () => {},
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (distance, pointIndex, totalPoints) => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };
  const createParticle = (i, t, d, r) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };
  const makeParticles = (element) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove("active");
      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);
        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // do nothing
          }
        }, t);
      }, 30);
    }
  };
  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };
  const handleClick = (e, index) => {
    e.preventDefault(); // Prevent default anchor behavior
    const liEl = e.currentTarget;
    if (activeIndex === index) return;
    setActiveIndex(index);
    updateEffectPosition(liEl);
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll(".particle");
      particles.forEach((p) => filterRef.current.removeChild(p));
    }
    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth;
      textRef.current.classList.add("active");
    }
    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
    // Call custom click handler
    onItemClick(index, items[index]);
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick({ currentTarget: liEl }, index);
      }
    }
  };
  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add("active");
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi =
        navRef.current?.querySelectorAll("li")[activeIndex];
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <>
      {/* Enhanced styles with better responsive handling */}
      <style>
        {`
          :root {
            --color-1: #16f2b3;
            --color-2: #ec4899;
            --color-3: #8b5cf6;
            --color-4: #06b6d4;
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
          }
          .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
          }
          .effect.text {
            color: white;
            transition: color 0.3s ease;
            font-size: inherit;
          }
          .effect.text.active {
            color: black;
          }
          .effect.filter {
            mix-blend-mode: lighten;
          }
          .effect.filter::before {
            content: "";
            position: absolute;
            inset: -75px;
            z-index: -2;
            background: transparent;
          }
          .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: white;
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          .effect.active::after {
            animation: pill 0.3s ease both;
          }
          @keyframes pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 8px);
            animation: particle calc(var(--time)) ease 1 -350ms;
          }
          .point {
            background: var(--color);
            opacity: 1;
            animation: point calc(var(--time)) ease 1 -350ms;
          }
          @keyframes particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          .gooey-nav-item.active {
            color: black;
            text-shadow: none;
          }
          .gooey-nav-item.active::after {
            opacity: 1;
            transform: scale(1);
          }
          .gooey-nav-item::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 8px;
            background: white;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
          .gooey-nav-container {
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .gooey-nav-container::-webkit-scrollbar {
            display: none;
          }
          @media (max-width: 1280px) {
            .gooey-nav-ul {
              gap: 1rem;
            }
            .gooey-nav-item a {
              padding: 0.5em 0.75em;
              font-size: 0.9rem;
            }
          }
          @media (max-width: 1024px) {
            .gooey-nav-ul {
              gap: 0.75rem;
            }
            .gooey-nav-item a {
              padding: 0.5em 0.6em;
              font-size: 0.85rem;
            }
          }
        `}
      </style>
      <div className="relative gooey-nav-container" ref={containerRef}>
        <nav
          className="flex relative"
          style={{ transform: "translate3d(0,0,0.01px)" }}
        >
          <ul
            ref={navRef}
            className="flex gap-4 xl:gap-8 list-none p-0 px-2 sm:px-4 m-0 relative z-[3] whitespace-nowrap gooey-nav-ul"
            style={{
              color: "white",
              textShadow: "0 1px 1px hsl(205deg 30% 10% / 0.2)",
            }}
          >
            {items.map((item, index) => (
              <li
                key={index}
                className={`rounded-full relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] text-white flex-shrink-0 gooey-nav-item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <a
                  onClick={(e) => handleClick(e, index)}
                  href={item.href}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="outline-none py-[0.6em] px-[0.8em] lg:px-[1em] inline-block text-sm lg:text-base"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items for the gooey nav
  const navItems = [
    { label: "ABOUT", href: "/#about", id: "about" },
    { label: "EDUCATION", href: "/#education", id: "education" },
    { label: "SKILLS", href: "/#skills", id: "skills" },
    { label: "PROJECTS", href: "/#projects", id: "projects" },
    { label: "GALLERY", href: "/#gallery", id: "gallery" },
    { label: "EXPERIENCE", href: "/#experience", id: "experience" },
  ];

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle gooey nav item clicks
  const handleGooeyNavClick = (index, item) => {
    // Prevent default link behavior
    event?.preventDefault();

    const target = document.getElementById(item.id);
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 80 },
        ease: "power2.out",
      });
    }
  };

  // Handle mobile menu item clicks
  const handleMobileMenuClick = (item) => {
    const target = document.getElementById(item.id);
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 80 },
        ease: "power2.out",
      });
    }
    setIsMobileMenuOpen(false); // Close menu after clicking
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Burger menu animation variants
  const burgerVariants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 180,
    },
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  // Menu item animation variants
  const menuItemVariants = {
    closed: {
      x: 50,
      opacity: 0,
    },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-black/80 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between py-3 sm:py-5">
            {/* Logo - Responsive text sizing */}
            <div className="flex flex-shrink-0 items-center">
              <Link
                href="/"
                className="text-[#16f2b3] text-xl sm:text-2xl lg:text-3xl font-bold"
              >
                Mohamed Ashraf
              </Link>
            </div>

            {/* Gooey Navigation - Hidden below 1028px */}
            <div className="hidden min-[1028px]:block max-w-full overflow-hidden">
              <GooeyNav
                items={navItems}
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={0}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                onItemClick={handleGooeyNavClick}
              />
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              {/* Music Control */}
              <div className="relative group">
                <MusicControl />
              </div>

              {/* Mobile Burger Menu Button - Shows below 1028px */}
              <motion.button
                className="min-[1028px]:hidden flex flex-col justify-center items-center w-8 h-8 relative z-50 p-1"
                onClick={toggleMobileMenu}
                variants={burgerVariants}
                animate={isMobileMenuOpen ? "open" : "closed"}
                aria-label="Toggle mobile menu"
              >
                <motion.span
                  className="w-5 sm:w-6 h-0.5 bg-white block transition-all duration-300"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 2 : -3,
                  }}
                />
                <motion.span
                  className="w-5 sm:w-6 h-0.5 bg-white block transition-all duration-300 my-0.5 sm:my-1"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                />
                <motion.span
                  className="w-5 sm:w-6 h-0.5 bg-white block transition-all duration-300"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -2 : 3,
                  }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Enhanced responsive design */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />

            {/* Mobile Menu - Fully responsive width */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-xs sm:max-w-sm bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl shadow-2xl z-50 border-l border-gray-800/50"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col pt-16 sm:pt-20 px-6 sm:px-8 h-full">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    custom={index}
                    className="mb-4 sm:mb-6"
                  >
                    <button
                      onClick={() => handleMobileMenuClick(item)}
                      className="text-white text-base sm:text-lg font-medium hover:text-[#16f2b3] transition-colors duration-300 w-full text-left group"
                    >
                      <span className="block transform group-hover:translate-x-2 transition-transform duration-300">
                        {item.label}
                      </span>
                      <span className="block w-0 h-0.5 bg-[#16f2b3] group-hover:w-full transition-all duration-300 mt-1" />
                    </button>
                  </motion.div>
                ))}

                {/* Decorative element - Responsive positioning */}
                <motion.div
                  className="absolute bottom-8 sm:bottom-10 left-6 sm:left-8 right-6 sm:right-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-[#16f2b3] to-transparent" />
                  <div className="text-center text-gray-400 text-xs sm:text-sm mt-4">
                    Mohamed Ashraf Portfolio
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
