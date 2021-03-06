import * as THREE from 'three';
import Sun from "src/js/planets/sun";
import Mercury from "src/js/planets/mercury";
import Venus from "src/js/planets/venus";
import Earth from "src/js/planets/earth";
import Moon from "src/js/planets/moon";
import Mars from "src/js/planets/mars";
import Jupiter from "src/js/planets/jupiter";
import Saturn from "src/js/planets/saturn";
import Uranus from "src/js/planets/uranus";
import Neptune from "src/js/planets/neptune";
import Pluto from "src/js/planets/pluto";
const Planets = {
    // Sun: () => import("src/js/planets/Sun"),
    Sun,
    Mercury,
    Venus,
    Earth,
    Moon,
    Mars,
    Jupiter,
    Saturn,
    Uranus,
    Neptune,
    Pluto,
}

import { calculatePerspectiveCameraFov } from 'src/js/util'
const radius = 1;
const scale = 2;
const CameraToCenterDistance = 3;
const CameraFov = calculatePerspectiveCameraFov(radius, CameraToCenterDistance, scale);
const RatioOfRotationPeriod = 60 * 60;
const options = {
    Sun: {
        radius,
    },
    Mercury: {
        radius,
        rotationPeriod: 1407.6 * RatioOfRotationPeriod,
        obliquity: 0.034,
    },
    Venus: {
        radius,
        rotationPeriod: -5832.5 * RatioOfRotationPeriod,
        obliquity: 177.4,
    },
    Earth: {
        radius,
        rotationPeriod: 23.9 * RatioOfRotationPeriod,
        obliquity: 23.4,
    },
    Moon: {
        radius,
        rotationPeriod: 655.7 * RatioOfRotationPeriod,
        obliquity: 6.7,
    },
    Mars: {
        radius,
        rotationPeriod: 24.6 * RatioOfRotationPeriod,
        obliquity: 25.2,
    },
    Jupiter: {
        radius,
        rotationPeriod: 9.9 * RatioOfRotationPeriod,
        obliquity: 3.1,
    },
    Saturn: {
        radius,
        rotationPeriod: 10.7 * RatioOfRotationPeriod,
        obliquity: 26.7,
    },
    Uranus: {
        radius,
        rotationPeriod: -17.2 * RatioOfRotationPeriod,
        obliquity: 97.8,
    },
    Neptune: {
        radius,
        rotationPeriod: 16.1 * RatioOfRotationPeriod,
        obliquity: 28.3,
    },
    Pluto: {
        radius,
        rotationPeriod: -153.3 * RatioOfRotationPeriod,
        obliquity: 122.5,
    },
}

const ChinaSynchronousMoonVector = new THREE.Vector3(0.2931436949654428, 1.6525710207101858, -2.4865791351997784).normalize();
export default {
    perspectiveCameraParams: {
        fov: CameraFov,
        near: 1,
        far: 10,
    },
    cameraPosition: new THREE.Vector3(0, 0, CameraToCenterDistance),
    lookAtPosition: new THREE.Vector3(0, 0, 0),

    Planets,
    options,

    ChinaSynchronousMoonVector,

    descriptions: require("src/data/descriptions.json"),
}