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

//Fade out hero text towards the end
heroTimeline.to("#hero-section", {
  opacity: 0,
  y: -100,
  ease: "power2.out",
}, 0.7);

// When hero is done, reveal next section
// gsap.from("#second-section", {
//   opacity: 0,
//   y: 200,
//   duration: 1.2,
//   ease: "power3.out",
//   scrollTrigger: {
//     trigger: "#second-section",
//     start: "top 80%",
//   },
// });

// Faster typing effect
function typeText(element, text, delay = 0, speed = 5) {
  element.innerHTML = "";
  let i = 0;
  setTimeout(() => {
    const interval = setInterval(() => {
      element.innerHTML += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }, delay);
}

// Scroll animation timeline
const messages = gsap.utils.toArray(".chat-message");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#chat-section",
    start: "top top",
    end: "+=300%",   // shorter scroll distance for faster reveal
    scrub: true,
    pin: true,
  }
});

// Animate messages appearing one by one
messages.forEach((msg) => {
  const originalText = msg.innerText.trim();
  msg.dataset.hasTyped = "false";

  tl.to(msg, {
    opacity: 1,
    duration: 0.2,
    onStart: () => {
      if (msg.dataset.hasTyped === "false") {
        msg.dataset.hasTyped = "true";
        typeText(msg.querySelector("div") || msg, originalText, 0, 5);
      }
    },
  }, "+=0.5");  // faster entry gap
});


// Section reveal animation using IntersectionObserver
const integrationSection = document.querySelector('#integration-section');
const integrationContent = document.querySelector('#integration-content');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      integrationContent.classList.remove('opacity-0', 'translate-y-10');
      integrationContent.classList.add('opacity-100', 'translate-y-0');
    }
  });
}, { threshold: 0.2 });

observer.observe(integrationSection);
const inverseWhiteSection = document.querySelector('#integration-inverse');
const inverseWhiteContent = document.querySelector('#integration-inverse-content');

const observerInverse = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      inverseWhiteContent.classList.remove('opacity-0', 'translate-y-10');
      inverseWhiteContent.classList.add('opacity-100', 'translate-y-0');
    }
  });
}, { threshold: 0.2 });

observerInverse.observe(inverseWhiteSection);
const miniSection = document.querySelector('#mini-section');
const miniContent = document.querySelector('#mini-content');

const observerMini = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      miniContent.classList.remove('opacity-0', 'translate-y-10');
      miniContent.classList.add('opacity-100', 'translate-y-0');
    }
  });
}, { threshold: 0.2 });

observerMini.observe(miniSection);
