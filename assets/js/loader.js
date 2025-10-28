// === Preloader Logic ===
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const progressText = document.getElementById("progress-text");
  const progressCircle = document.querySelector(".progress-ring");
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  progressCircle.style.strokeDasharray = `${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;

  let progress = 0;

  const fakeLoading = setInterval(() => {
    progress += Math.random() * 3 + 1;
    if (progress >= 100) {
      progress = 100;
      clearInterval(fakeLoading);
      finishLoading();
    }
    updateProgress(progress);
  }, 50);

  function updateProgress(value) {
    progressText.textContent = `${Math.floor(value)}%`;
    const offset = circumference - (value / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
  }

  function finishLoading() {
    gsap.to("#progress-text", { scale: 1.3, duration: 0.3, ease: "power1.inOut", yoyo: true, repeat: 1 });

    setTimeout(() => {
      gsap.to(preloader, {
        y: "-100%",
        duration: 1.5,
        ease: "power4.inOut",
        onComplete: () => {
          preloader.remove();
          // revealContent();
        },
      });
    }, 400);
  }

//   function revealContent() {
//     gsap.from("header", { y: -50, opacity: 0, duration: 1, ease: "power2.out" });
//     gsap.from("section", { scale: 0.95, opacity: 0, duration: 1.5, delay: 0.3, ease: "expo.out" });
//   }
});
