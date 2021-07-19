import * as THREE from 'three';
import { calculatePerspectiveCameraFov } from 'src/js/util'

const Center = new THREE.Vector3(0, 0, 0);

// sun
const SunPosition = Center; // 太阳位置
// const SunRadius = 0.696e6; // 太阳半径

// // earth
// const EarthRadius = 6378; // 地球半径
// const EarthToSunDistance = 149.6e6; // 地球到太阳的距离

// // moon
// const MoonRadius = 1738;
// const MoonToEarthDistance = 384403;

const SunScale = 3; // 太阳映射比例
const EarthScale = 6; // 地球映射比例
// 需要保持 EarthScale / SunScale < SunRadius / EarthRadius
// 这样CameraToCenterDistance和CameraFov才能为正值，才能正常看得见

// test
const SunRadius = 15000; // 太阳半径
const EarthRadius = 1000; // 地球半径
const EarthToSunDistance = 50000; // 地球到太阳的距离
const MoonRadius = 200;
const MoonToEarthDistance = 3000;

const MarsRadius = 500;
const MarsToSunDistance = 76000;

const MercuryRadius = 380;
const MercuryToSunDistance = 19333.33;

const VenusRadius = 950;
const VenusToSunDistance = 36163.1;

const JupiterRadius = 11210;
const JupiterToSunDistance = 260227.3;

const SaturnRadius = 9450;
const SaturnToSunDistance = 482453.2;

const UranusRadius = 4007;
const UranusToSunDistance = 960060.2;

const NeptuneRadius = 3883;
const NeptuneToSunDistance = 1502373.0;

const PlutoRadius = 186;
const PlutoToSunDistance = 1974064.2;

// camera perspectiveCamera
const CameraToCenterDistance = (SunRadius * SunScale) * EarthToSunDistance / ((SunRadius * SunScale) - (EarthRadius * EarthScale)); // 照相机到中心距离
const CameraFov = calculatePerspectiveCameraFov(SunRadius, CameraToCenterDistance, SunScale); // 照相机的张角

export default {
    perspectiveCameraParams: {
        fov: CameraFov,
        near: 1,
        far: 3e8,
    },
    cameraPosition: new THREE.Vector3(0, 0, CameraToCenterDistance),
    lookAtPosition: new THREE.Vector3(0, 0, 0),
    
    earthToSunDistance: EarthToSunDistance,
    sun: {
        radius: SunRadius,
        center: SunPosition,
        initPosition: SunPosition,
    },
    mercury: {
        radius: MercuryRadius,
        center: SunPosition,
        initPosition: new THREE.Vector3(0, 0, MercuryToSunDistance),
        orbitalPeriod: 88.0 * 24 * 60,
        inclination: 7.0,
        rotationPeriod: 1407.6 * 60,
        obliquity: 0.034,
    },
    venus: {
        radius: VenusRadius,
        center: SunPosition,
        initPosition: new THREE.Vector3(0, 0, VenusToSunDistance),
        orbitalPeriod: 224.7 * 24 * 60,
        inclination: 3.4,
        rotationPeriod: -5832.5 * 60,
        obliquity: 177.4,
    },
    earth: {
        radius: EarthRadius,
        center: SunPosition,
        initPosition: new THREE.Vector3(0, 0, EarthToSunDistance),
        orbitalPeriod: 365.2 * 24 * 60,
        inclination: 0.0,
        rotationPeriod: 23.9 * 60,
        obliquity: 23.4,
    },
    moon: {
        radius: MoonRadius,
        center: new THREE.Vector3(0, 0, EarthToSunDistance), // 地球的中心 变化的 Function
        initPosition: new THREE.Vector3(0, 0, EarthToSunDistance + MoonToEarthDistance),
        orbitalPeriod: 27.32 * 24 * 60,
        inclination: 5.1,
        rotationPeriod: 655.7 * 60,
        obliquity: 6.7,
    },
    mars: {
        radius: MarsRadius,
        center: SunPosition,
        initPosition: new THREE.Vector3(0, 0, MarsToSunDistance),
        orbitalPeriod: 687.0 * 24 * 60,
        inclination: 1.9,
        rotationPeriod: 24.6 * 60,
        obliquity: 25.2,
    },
    jupiter: {
        radius: JupiterRadius,
        center: SunPosition,
        initPosition: new THREE.Vector3(0, 0, JupiterToSunDistance),
        orbitalPeriod: 4331 * 24 * 60,
        inclination: 1.3,
        rotationPeriod: 9.9 * 60,
        obliquity: 3.1,
    },
    saturn: {
        radius: SaturnRadius,
        center: SunPosition,
        initPosition: new THREE.Vector3(0, 0, SaturnToSunDistance),
        orbitalPeriod: 10747 * 24 * 60,
        inclination: 2.5,
        rotationPeriod: 10.7 * 60,
        obliquity: 26.7,
    },
    uranus: {
        radius: UranusRadius,
        center: SunPosition,
        initPosition: new THREE.Vector3(0, 0, UranusToSunDistance),
        orbitalPeriod: 30589 * 24 * 60,
        inclination: 0.8,
        rotationPeriod: -17.2 * 60,
        obliquity: 97.8,
    },
    neptune: {
        radius: NeptuneRadius,
        center: SunPosition,
        initPosition: new THREE.Vector3(0, 0, NeptuneToSunDistance),
        orbitalPeriod: 59800 * 24 * 60,
        inclination: 1.8,
        rotationPeriod: 16.1 * 60,
        obliquity: 28.3,
    },
    pluto: {
        radius: PlutoRadius,
        center: SunPosition,
        initPosition: new THREE.Vector3(0, 0, PlutoToSunDistance),
        orbitalPeriod: 90560 * 24 * 60,
        inclination: 17.2,
        rotationPeriod: -153.3 * 60,
        obliquity: 122.5,
    },
}