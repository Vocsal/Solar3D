import * as THREE from 'three';
import { PlanetParams } from 'src/js/types/planet'
import Planet from "./planet";
import Config from "src/config"

// @ts-ignore
import SunMap from "src/file/mesh/sun/2k_sun.jpg";

export default class Sun extends Planet {
    constructor(options?: PlanetParams) {
        super(options || Config.sun);
    }

    createMesh() {
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const meterial = new THREE.MeshPhongMaterial({
            map: textureLoader.load(SunMap),
            emissive: 0xffffff,
            emissiveMap: textureLoader.load(SunMap),
            side: THREE.DoubleSide,
        })
        this.mesh = new THREE.Mesh(sphere, meterial);
        this.mesh.position.copy(this.initPosition);
    }
}