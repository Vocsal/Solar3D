import * as THREE from 'three';
import { calculatePerspectiveCameraFov } from 'src/js/util'

const radius = 1;
const scale = 2;
const CameraToCenterDistance = 5;
const CameraFov = calculatePerspectiveCameraFov(radius, CameraToCenterDistance, scale);

export default {
    perspectiveCameraParams: {
        fov: CameraFov,
        near: 1,
        far: 10,
    },
    cameraPosition: new THREE.Vector3(0, 0, CameraToCenterDistance),
    lookAtPosition: new THREE.Vector3(0, 0, 0),

    options: {
        Earch: {
            radius,
            rotationPeriod: 15000,
            obliquity: 23.4,
        },
        Moon: {
            radius: 0.1,
            initPosition: new THREE.Vector3(0, 0, 2.5),
            rotationPeriod: 41150,
            obliquity: 6.7,
            orbitalPeriod: 41150,
            inclination: 5.1,
            trackWidth: 0.01,
        },
    }
}