# GSAP Animations System

This portfolio website now features a comprehensive GSAP (GreenSock Animation Platform) animation system that creates modern, dynamic, and professional animations throughout the site.

## 🎯 Features

### Hero Section Animations

- **Main Timeline**: Coordinated entrance animations for hero text, code window, social icons, and buttons
- **Code Typing Effect**: Animated code lines that appear sequentially
- **Floating Particles**: Subtle floating elements that add depth and movement
- **Staggered Social Icons**: Icons appear with a staggered delay for visual interest

### Section Entrance Animations

- **Fade In Stagger**: Elements appear with a staggered delay as you scroll
- **Scale In Bounce**: Elements scale in with a bouncy effect
- **Slide In From Sides**: Content slides in from left and right sides
- **Scroll-Triggered**: All animations are triggered by scroll position

### Skills Section

- **Cards Entrance**: Skill cards animate in with a bounce effect
- **Hover Effects**: Interactive hover animations for icons and text
- **Marquee Integration**: Enhanced marquee with smooth animations

### Projects Section

- **3D Card Effects**: Cards rotate and scale on entrance
- **Hover Interactions**: Enhanced hover effects with image scaling
- **Staggered Layout**: Cards appear in sequence for visual flow

### Contact Section

- **Form Animations**: Form elements slide in from the left
- **Input Focus Effects**: Dynamic focus animations for form inputs
- **Info Stagger**: Contact information appears with staggered timing

## 🛠️ Implementation

### Core Files

1. **`utils/gsap-animations.js`** - Main animation library

   - Animation presets and configurations
   - Section-specific animation functions
   - Utility functions for animation management

2. **`utils/use-gsap-animations.js`** - Custom React hooks

   - `useGSAPAnimations()` - Initialize and cleanup animations
   - `useScrollAnimations()` - Handle scroll-based animations

3. **`app/components/gsap-initializer.jsx`** - Global initializer
   - Initializes GSAP plugins and configurations
   - Handles window resize events

### Animation Categories

#### Hero Animations

```javascript
import { heroAnimations } from "@/utils/gsap-animations";

// Main hero timeline
const mainTimeline = heroAnimations.mainTimeline(
  heroRef.current,
  codeRef.current,
  socialRef.current,
  buttonsRef.current
);

// Code typing animation
const codeTimeline = heroAnimations.codeTyping(codeRef.current);

// Floating particles
backgroundAnimations.floatingParticles(particles);
```

#### Section Animations

```javascript
import { sectionAnimations } from "@/utils/gsap-animations";

// Fade in with stagger
sectionAnimations.fadeInStagger(elements, stagger, delay);

// Scale in with bounce
sectionAnimations.scaleInBounce(element, delay);

// Slide in from sides
sectionAnimations.slideInFromSides(leftElements, rightElements, delay);
```

#### Skills Animations

```javascript
import { skillsAnimations } from "@/utils/gsap-animations";

// Skills cards entrance
skillsAnimations.skillsEntrance(skillCards);

// Add hover effects
skillCards.forEach((card) => {
  skillsAnimations.skillsHover(card);
});
```

#### Project Animations

```javascript
import { projectAnimations } from "@/utils/gsap-animations";

// Project cards entrance
projectAnimations.projectsEntrance(projectCards);

// Project card hover
projectAnimations.projectHover(projectCard);
```

## 🎨 Animation Presets

### Available Presets

- `fadeInUp` - Elements fade in from bottom
- `fadeInLeft` - Elements fade in from left
- `fadeInRight` - Elements fade in from right
- `scaleIn` - Elements scale in with bounce
- `slideInFromTop` - Elements slide in from top

### Usage

```javascript
import { animationPresets } from "@/utils/gsap-animations";

const { fadeInUp, scaleIn } = animationPresets;
```

## 🔧 Configuration

### ScrollTrigger Settings

- **Trigger Point**: `top 80%` (animations start when element is 80% from top)
- **Toggle Actions**: `play none none reverse` (play on enter, reverse on exit)
- **Mobile Optimization**: Responsive settings for mobile devices

### Performance Optimizations

- **will-change**: CSS property optimization for animated elements
- **force3D**: Hardware acceleration for smooth animations
- **cleanup**: Proper animation cleanup to prevent memory leaks

## 🎭 Visual Effects

### Floating Particles

- Subtle floating elements that move continuously
- Different sizes and opacities for depth
- Smooth easing for natural movement

### Glow Effects

- Gradient borders that glow on hover
- Dynamic color transitions
- Smooth opacity changes

### Button Animations

- Scale effects on hover
- Gradient color transitions
- Shimmer effects for premium feel

### Text Animations

- Character-by-character reveal
- Staggered word animations
- Smooth opacity transitions

## 📱 Responsive Design

All animations are optimized for:

- **Desktop**: Full animation effects
- **Tablet**: Adjusted timing and effects
- **Mobile**: Simplified animations for performance

## 🚀 Performance Tips

1. **Use `will-change`**: Optimize elements that will be animated
2. **Cleanup animations**: Always kill animations on component unmount
3. **Debounce resize**: Handle window resize events efficiently
4. **Lazy load**: Load animations only when needed

## 🔄 Customization

### Adding New Animations

```javascript
// In utils/gsap-animations.js
export const customAnimations = {
  myCustomAnimation: (element) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.set(element, { opacity: 0, y: 50 });
    tl.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    return tl;
  },
};
```

### Modifying Existing Animations

```javascript
// Override default settings
const customTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: element,
    start: "top 90%", // Custom trigger point
    toggleActions: "play none none reverse",
  },
});
```

## 🎯 Best Practices

1. **Consistency**: Use consistent easing and timing across animations
2. **Performance**: Monitor animation performance on mobile devices
3. **Accessibility**: Ensure animations don't interfere with user experience
4. **Testing**: Test animations across different browsers and devices

## 🐛 Troubleshooting

### Common Issues

1. **Animations not triggering**: Check ScrollTrigger configuration
2. **Performance issues**: Reduce animation complexity on mobile
3. **Memory leaks**: Ensure proper cleanup in useEffect

### Debug Mode

```javascript
// Enable GSAP debug mode
gsap.config({ nullTargetWarn: false });
ScrollTrigger.config({ ignoreMobileResize: true });
```

## 📚 Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Plugin](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [SplitText Plugin](https://greensock.com/docs/v3/Plugins/SplitText)

---

This animation system creates a modern, professional, and engaging user experience that showcases your portfolio in the best possible way!
