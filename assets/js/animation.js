
      import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
      

      const lenis = new Lenis({ duration: 1.4 });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

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

      const canvas = document.getElementById('hero-bg');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.z = 5;

      const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 16);
      const material = new THREE.MeshStandardMaterial({ color: 0x00ffff, metalness: 0.8, roughness: 0.2 });
      const torus = new THREE.Mesh(geometry, material);
      scene.add(torus);

      const light = new THREE.PointLight(0xffffff, 1);
      light.position.set(5, 5, 5);
      scene.add(light);

      function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.015;
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
