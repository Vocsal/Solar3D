import "./css/common.scss"
import * as THREE from 'three';
// import { Scene } from 'three';
// const THREE = { Scene };
import Earth from './js/planets/earth.js'
import Moon from './js/planets/moon.js'
import Sun from './js/planets/sun.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import Config from './js/config.js';
import Controller from './js/controller.js';

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000000);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(Config.cameraFov, window.innerWidth / window.innerHeight, 1, 3e8);
camera.position.set(0, 0, Config.cameraToCenterDistance);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

const light = new THREE.AmbientLight();
scene.add(light);

// scene.add(new THREE.AxesHelper(Config.cameraToCenterDistance))

// sun
const sun = new Sun();
scene.add(sun.mesh);

// planets
const planets = [];
const earth = new Earth();
scene.add(earth.mesh);
planets.push(earth);

const moon = new Moon({
    center: earth.getPosition.bind(earth),
});
scene.add(moon.mesh);
planets.push(moon);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true; // 自旋
controls.enableDamping = true; // 阻尼
controls.listenToKeyEvents(window); // 按键


function run() {
    planets.forEach(planet => {
        planet.run();
    })
    Controller.update();
    controls && controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(run);
}

run();