import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/orbitcontrols";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import gsap from "gsap";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

/**
 * Loader
 */
const gtflLoader = new GLTFLoader()

/**
 * Timeline
 */

const tl = gsap.timeline()

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Phone
 */
gtflLoader.load('phone.gltf', gltf => {
    gltf.scene.rotation.set(0, 3.3, 0)
    gltf.scene.scale.set(0.3, 0.3, 0.3)
    scene.add(gltf.scene)
    tl.to(gltf.scene.rotation, {y : 4.7, duration: 1} )
    tl.to(gltf.scene.scale, {x: 0.2, y:0.2, z:0.2, duration: 1}, "-=1")
    tl.to(gltf.scene.position, {x: .5})
    tl.to(gltf.scene.rotation, {y: 4.1, duration: 1})
    tl.to(gltf.scene.scale, {x: .25, y: .25, z: .25, duration: 1}, "-=1")
})

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
);
camera.position.z = 1;
camera.lookAt(0, 0, 0);
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff, 3)
scene.add(ambientLight)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});

renderer.setSize(size.width, size.height);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();

const tick = () => {
  let elapsedTime = clock.getElapsedTime();

  //controls.update();
  window.requestAnimationFrame(tick);
  renderer.render(scene, camera);
};

window.addEventListener("resize", () => {
  //Update sizes
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  //Update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  //Update renderer
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

tick();
