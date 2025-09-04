"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "motion/react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// Import plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { sectionAnimations } from "@/utils/gsap-animations";
import Image from "next/image";

const IMGS = [
  "scout.png",
  "scout2.png",
  "kiara2.png",
  "palm3.png",
  "palm4.png",
  "sushi2.png",
  "sushi3.png",
  "movie2.png",
  "movie3.png",
  "movie4.png",
  "tolab2.png",
  "tolab3.png",
  "dawaback2.png",
];

const RollingGallery = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  images = images.length > 0 ? images : IMGS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 640 : false
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Convert images array to lightbox format
  const lightboxSlides = images.map((src, index) => ({
    src,
    alt: `Gallery image ${index + 1}`,
    width: 3870,
    height: 2580,
  }));

  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Improved calculations for better spacing and size
  const cylinderWidth = isScreenSizeSm ? 1200 : 2000;
  const faceCount = images.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);

  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 25,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <div className="flex h-full items-center justify-center [perspective:1200px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[280px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  (360 / faceCount) * i
                }deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={url}
                alt={`Gallery image ${i + 1}`}
                className="pointer-events-auto h-[200px] w-[350px] rounded-[20px] border-[4px] border-white/90 object-cover
                           transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-[#16f2b3] 
                           sm:h-[160px] sm:w-[280px] shadow-2xl cursor-pointer"
                onClick={() => openLightbox(i)}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Yet Another React Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={closeLightbox}
        index={currentImageIndex}
        slides={lightboxSlides}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        zoom={{
          maxZoomPixelRatio: 1,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        fullscreen={{
          auto: false,
        }}
        slideshow={{
          autoplay: false,
          delay: 3000,
        }}
        thumbnails={{
          position: "bottom",
          width: 120,
          height: 80,
          border: 2,
          borderRadius: 4,
          padding: 4,
          gap: 16,
          imageFit: "cover",
        }}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, .9)",
          },
          thumbnailsContainer: {
            backgroundColor: "rgba(0, 0, 0, .8)",
          },
          thumbnail: {
            border: "2px solid rgba(255, 255, 255, .3)",
            borderRadius: "8px",
          },
          thumbnailCurrent: {
            border: "2px solid #16f2b3",
          },
        }}
        carousel={{
          finite: false,
          preload: 2,
          padding: "16px",
          spacing: "30%",
          imageFit: "contain",
        }}
        animation={{
          fade: 250,
          swipe: 500,
        }}
        controller={{
          closeOnPullDown: true,
          closeOnBackdropClick: true,
        }}
        on={{
          view: ({ index }) => setCurrentImageIndex(index),
        }}
      />
    </div>
  );
};

const Gallery = () => {
  const galleryRef = useRef(null);
  const titleRef = useRef(null);
  const galleryContentRef = useRef(null);

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      sectionAnimations.scaleInBounce(titleRef.current, 0.2);
    }

    // Gallery content entrance animation
    if (galleryContentRef.current) {
      sectionAnimations.fadeInStagger([galleryContentRef.current], 0.1, 0.1);
    }

    // Main container animation
    if (galleryRef.current) {
      sectionAnimations.fadeInStagger([galleryRef.current], 0.1, 0.1);
    }
  }, []);

  return (
    <div
      id="gallery"
      className="relative z-40 border-t my-12 lg:my-24 border-[#25213b]"
    >
      {/* Background Image - Same as Education section */}
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      {/* Top gradient line - Same as Education section */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* Section Title - Updated to match Education section style */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Gallery
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="py-8">
        <div ref={galleryContentRef} className="relative">
          <RollingGallery autoplay={true} pauseOnHover={true} />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
