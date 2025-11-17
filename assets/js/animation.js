import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Scene setup
const canvas = document.getElementById("hero-bg");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(0, 0, 35);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// BIG LANDSCAPE SETTINGS
const NODE_COUNT = 380;
const NODES = [];
const maxDistance = 4;  
const AREA_X = 40;  
const AREA_Y = 20;  
const AREA_Z = 24;

const nodeGeometry = new THREE.SphereGeometry(0.12, 8, 8);

// gradient node material
const nodeMaterial = new THREE.MeshBasicMaterial({
  color: 0x7cffb2
});

// create nodes
for (let i = 0; i < NODE_COUNT; i++) {
  const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

  node.position.set(
    (Math.random() - 0.5) * AREA_X,
    (Math.random() - 0.5) * AREA_Y,
    (Math.random() - 0.5) * AREA_Z
  );

  node.velocity = new THREE.Vector3(
    (Math.random() - 0.5) * 0.015,
    (Math.random() - 0.5) * 0.015,
    (Math.random() - 0.5) * 0.015
  );

  NODES.push(node);
  scene.add(node);
}

// Lines
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0x5affd6,
  transparent: true,
  opacity: 0.35
});

const lineGeometry = new THREE.BufferGeometry();
let linePositions = new Float32Array(NODE_COUNT * NODE_COUNT * 3 * 2);
lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
scene.add(lineMesh);

// Animation
function animate() {
  requestAnimationFrame(animate);

  let index = 0;

  for (let i = 0; i < NODE_COUNT; i++) {
    const a = NODES[i];

    // move
    a.position.add(a.velocity);

    // bounce limits
    if (a.position.x > AREA_X / 2 || a.position.x < -AREA_X / 2) a.velocity.x *= -1;
    if (a.position.y > AREA_Y / 2 || a.position.y < -AREA_Y / 2) a.velocity.y *= -1;
    if (a.position.z > AREA_Z / 2 || a.position.z < -AREA_Z / 2) a.velocity.z *= -1;

    // check lines
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const b = NODES[j];

      const dist = a.position.distanceTo(b.position);
      if (dist < maxDistance) {
        linePositions[index++] = a.position.x;
        linePositions[index++] = a.position.y;
        linePositions[index++] = a.position.z;

        linePositions[index++] = b.position.x;
        linePositions[index++] = b.position.y;
        linePositions[index++] = b.position.z;
      }
    }
  }

  // remove leftover lines
  for (let k = index; k < linePositions.length; k++) {
    linePositions[k] = 0;
  }

  lineGeometry.attributes.position.needsUpdate = true;

  // subtle breathing
  scene.rotation.x = Math.sin(Date.now() * 0.0003) * 0.04;
  scene.rotation.y = Math.sin(Date.now() * 0.0004) * 0.03;

  renderer.render(scene, camera);
}

animate();

// resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
 