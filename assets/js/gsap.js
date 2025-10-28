gsap.registerPlugin(ScrollTrigger);

const heroCanvas = document.getElementById("hero-bg");

// Create a timeline for the hero scroll scene
const heroTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#hero-section",
    start: "top top",
    end: "bottom+=200% top", // controls how long the hero stays pinned
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

// Zoom in the canvas smoothly
heroTimeline.to(heroCanvas, {
  scale: 2.5,
  ease: "power2.inOut",
}, 0);

// Fade out hero text towards the end
heroTimeline.to("#hero-section", {
  opacity: 0,
  y: -100,
  ease: "power2.out",
}, 0.7);

// When hero is done, reveal next section
gsap.from("#second-section", {
  opacity: 0,
  y: 200,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#second-section",
    start: "top 80%",
  },
});
