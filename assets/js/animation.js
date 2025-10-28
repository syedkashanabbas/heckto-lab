import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// === Smooth Scroll (Lenis) ===
const lenis = new Lenis({ duration: 1.4 });
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// === GSAP Scroll Animations ===
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.feature-item').forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
    },
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: 'power3.out',
  });
});

// === THREE.JS Scene Setup ===
const canvas = document.getElementById('hero-bg');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 8);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

let particles;

// === Load Image ===
const loader = new THREE.TextureLoader();
loader.load('assets/imgs/face.png', (texture) => {
  const img = texture.image;
  const canvas2 = document.createElement('canvas');
  const ctx = canvas2.getContext('2d');
  canvas2.width = img.width;
  canvas2.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  const imgData = ctx.getImageData(0, 0, img.width, img.height);
  const positions = [];
  const colors = [];

  const color = new THREE.Color();

  // Convert pixels into particles
  for (let y = 0; y < img.height; y += 3) {
    for (let x = 0; x < img.width; x += 3) {
      const i = (y * img.width + x) * 4;
      const brightness = imgData.data[i]; // use red channel
      if (brightness > 50) { // threshold to skip black pixels
        const posX = (x - img.width / 2) / 50;
        const posY = -(y - img.height / 2) / 50;
        const posZ = Math.random() * 0.4 - 0.2; // depth
        positions.push(posX, posY, posZ);

        color.setHSL(0.35 + Math.random() * 0.1, 1, 0.6 + Math.random() * 0.2); // green tone
        colors.push(color.r, color.g, color.b);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.045,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.95,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);
});

// === Lights ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
const pointLight = new THREE.PointLight(0x7cffb2, 2, 50);
pointLight.position.set(2, 3, 5);
scene.add(ambientLight, pointLight);

// === Animation Loop ===
function animate() {
  requestAnimationFrame(animate);

  if (particles) {
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] = Math.sin(Date.now() * 0.001 + positions[i] * 2) * 0.15; // wave depth
    }
    particles.geometry.attributes.position.needsUpdate = true;

    particles.rotation.y += 0.002;
    particles.rotation.x += 0.001;
  }

  renderer.render(scene, camera);
}
animate();

// === Responsive Resize ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
