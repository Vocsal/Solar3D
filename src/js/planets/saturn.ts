import * as THREE from 'three';
import { PlanetParams } from 'src/js/types/planet'
import Planet from "./planet";

// @ts-ignore
import SaturnMap from "src/file/mesh/saturn/2K_saturn.jpg";

export default class Saturn extends Planet {
    name: string = "Saturn";
    constructor(options?: PlanetParams) {
        super(options);
    }

    createMesh() {
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const meterial = new THREE.MeshPhongMaterial({
            specular: 0x333333, 
            shininess: 15,
            map: textureLoader.load(SaturnMap),
        })
        this.mesh = new THREE.Mesh(sphere, meterial);
    }
}