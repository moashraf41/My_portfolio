"use client";

import dynamic from "next/dynamic";

// نعمل import للديناميك مع إيقاف الـ SSR
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const AnimationLottie = ({ animationPath, width }) => {
  return (
    <Lottie
      animationData={animationPath}
      loop
      autoplay
      style={{
        width: width || "95%", // ممكن تستقبل width من props
      }}
    />
  );
};

export default AnimationLottie;
