import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

// Animation presets
export const animationPresets = {
  fadeInUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
  },
  fadeInLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
  },
  fadeInRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
  },
  slideInFromTop: {
    from: { opacity: 0, y: -60 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
  },
};

// Hero Section Animations
export const heroAnimations = {
  // Main hero timeline - FIXED VERSION
  mainTimeline: (heroRef, codeRef, socialRef, buttonsRef) => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Check if refs exist
    if (!heroRef || !codeRef || !socialRef || !buttonsRef) {
      console.warn("Some refs are missing in heroAnimations.mainTimeline");
      return tl;
    }

    // Initial state - Only set opacity for main containers
    gsap.set([heroRef, codeRef], { opacity: 0 });

    // Don't set opacity 0 for social and buttons containers to prevent hiding
    gsap.set([socialRef, buttonsRef], { opacity: 1 });

    // Hero text animation
    tl.fromTo(
      heroRef,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      0
    );

    // Code window animation
    tl.fromTo(
      codeRef,
      { opacity: 0, x: 100, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
      },
      0.3
    );

    // Social icons animation - FIXED
    const socialChildren = socialRef.querySelectorAll("a");
    if (socialChildren.length > 0) {
      gsap.set(socialChildren, { opacity: 0, y: 30, scale: 0.8 });
      tl.to(
        socialChildren,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
        },
        0.8
      );
    }

    // Buttons animation - FIXED
    const buttonChildren = buttonsRef.querySelectorAll("a");
    if (buttonChildren.length > 0) {
      gsap.set(buttonChildren, { opacity: 0, y: 20, scale: 0.9 });
      tl.to(
        buttonChildren,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.1,
        },
        1.2
      );
    }

    return tl;
  },

  // Code typing animation
  codeTyping: (codeElement) => {
    if (!codeElement) return gsap.timeline();

    const codeLines = codeElement.querySelectorAll("div");
    const tl = gsap.timeline({ delay: 1.5 });

    gsap.set(codeLines, { opacity: 0, x: -20 });

    codeLines.forEach((line, index) => {
      tl.to(
        line,
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        index * 0.2
      );
    });

    return tl;
  },

  // Floating elements animation
  floatingElements: (elements) => {
    elements.forEach((element, index) => {
      gsap.to(element, {
        y: -20,
        duration: 2 + index * 0.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.3,
      });
    });
  },
};

// Section entrance animations
export const sectionAnimations = {
  // Fade in section with stagger
  fadeInStagger: (elements, stagger = 0.1, delay = 0) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elements[0],
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    gsap.set(elements, { opacity: 0, y: 50 });

    tl.to(
      elements,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: stagger,
      },
      delay
    );

    return tl;
  },

  // Scale in with bounce
  scaleInBounce: (element, delay = 0) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    gsap.set(element, { opacity: 0, scale: 0.5 });

    tl.to(
      element,
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      delay
    );

    return tl;
  },

  // Slide in from sides
  slideInFromSides: (leftElements, rightElements, delay = 0) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: leftElements[0] || rightElements[0],
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    gsap.set(leftElements, { opacity: 0, x: -100 });
    gsap.set(rightElements, { opacity: 0, x: 100 });

    tl.to(
      leftElements,
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      },
      delay
    ).to(
      rightElements,
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      },
      delay + 0.2
    );

    return tl;
  },
};

// Skills animations
export const skillsAnimations = {
  // Skills cards entrance
  skillsEntrance: (skillCards) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skillCards[0],
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    gsap.set(skillCards, { opacity: 0, y: 50, scale: 0.8 });

    tl.to(skillCards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.05,
    });

    return tl;
  },

  // Skills hover effects
  skillsHover: (skillCard) => {
    const icon = skillCard.querySelector("img");
    const text = skillCard.querySelector("p");

    skillCard.addEventListener("mouseenter", () => {
      gsap.to(icon, { scale: 1.2, duration: 0.3, ease: "power2.out" });
      gsap.to(text, { y: -5, duration: 0.3, ease: "power2.out" });
    });

    skillCard.addEventListener("mouseleave", () => {
      gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(text, { y: 0, duration: 0.3, ease: "power2.out" });
    });
  },
};

// Project animations
export const projectAnimations = {
  // Project cards entrance
  projectsEntrance: (projectCards) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectCards[0],
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    gsap.set(projectCards, { opacity: 0, y: 80, rotationY: 15 });

    tl.to(projectCards, {
      opacity: 1,
      y: 0,
      rotationY: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
    });

    return tl;
  },

  // Project card hover
  projectHover: (projectCard) => {
    const image = projectCard.querySelector("img");
    const content = projectCard.querySelector(".project-content");

    projectCard.addEventListener("mouseenter", () => {
      gsap.to(image, { scale: 1.1, duration: 0.4, ease: "power2.out" });
      gsap.to(content, {
        y: -10,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    projectCard.addEventListener("mouseleave", () => {
      gsap.to(image, { scale: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(content, {
        y: 0,
        opacity: 0.9,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  },
};

// Contact form animations
export const contactAnimations = {
  // Form elements entrance
  formEntrance: (formElements) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: formElements[0],
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    gsap.set(formElements, { opacity: 0, x: -50 });

    tl.to(formElements, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
    });

    return tl;
  },

  // Input focus animations
  inputFocus: (input) => {
    const label = input.previousElementSibling;

    input.addEventListener("focus", () => {
      gsap.to(label, { y: -20, scale: 0.9, color: "#16f2b3", duration: 0.3 });
      gsap.to(input, { borderColor: "#16f2b3", duration: 0.3 });
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        gsap.to(label, { y: 0, scale: 1, color: "#ffffff", duration: 0.3 });
      }
      gsap.to(input, { borderColor: "#1a1443", duration: 0.3 });
    });
  },
};

// Background animations
export const backgroundAnimations = {
  // Floating particles
  floatingParticles: (particles) => {
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        y: -100,
        x: Math.random() * 100 - 50,
        duration: 3 + Math.random() * 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.5,
      });
    });
  },

  // Gradient background animation
  gradientAnimation: (element) => {
    gsap.to(element, {
      backgroundPosition: "200% 200%",
      duration: 10,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });
  },
};

// Text animations
export const textAnimations = {
  // Split text animation
  splitTextAnimation: (element, options = {}) => {
    const {
      type = "chars",
      stagger = 0.05,
      duration = 0.6,
      ease = "power3.out",
      delay = 0,
    } = options;

    const split = new SplitText(element, { type });
    const targets = type === "chars" ? split.chars : split.words;

    gsap.set(targets, { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    tl.to(targets, {
      opacity: 1,
      y: 0,
      duration,
      ease,
      stagger,
      delay,
    });

    return tl;
  },

  // Typewriter effect
  typewriter: (element, text, speed = 0.05) => {
    const tl = gsap.timeline();
    let currentText = "";

    text.split("").forEach((char, index) => {
      tl.to(
        {},
        {
          duration: speed,
          onUpdate: () => {
            currentText += char;
            element.textContent = currentText;
          },
        }
      );
    });

    return tl;
  },
};

// Utility functions
export const gsapUtils = {
  // Kill all animations
  killAll: () => {
    gsap.killTweensOf("*");
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  },

  // Pause all animations
  pauseAll: () => {
    gsap.globalTimeline.pause();
  },

  // Resume all animations
  resumeAll: () => {
    gsap.globalTimeline.resume();
  },

  // Refresh ScrollTrigger
  refreshScrollTrigger: () => {
    ScrollTrigger.refresh();
  },
};

// Initialize animations
export const initAnimations = () => {
  // Set default ease
  gsap.defaults({ ease: "power3.out" });

  // Set ScrollTrigger defaults
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });
};

export default {
  animationPresets,
  heroAnimations,
  sectionAnimations,
  skillsAnimations,
  projectAnimations,
  contactAnimations,
  backgroundAnimations,
  textAnimations,
  gsapUtils,
  initAnimations,
};
