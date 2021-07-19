import * as THREE from 'three';

export interface PlanetParams {
    radius?: number;
    initPosition?: THREE.Vector3;
    center?: THREE.Vector3 | Function;
    orbitalPeriod?: number;
    inclination?: number,
    rotationPeriod?: number;
    obliquity?: number;

    mesh?: THREE.Mesh;
}