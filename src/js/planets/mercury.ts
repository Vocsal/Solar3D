import * as THREE from 'three';
import { PlanetParams } from 'src/js/types/planet'
import Planet from "./planet";
import Config from "src/config"

// @ts-ignore
import mercuryMap from "src/file/mesh/mercury/2k_mercury.jpg";

export default class Mercury extends Planet {
    constructor(options?: PlanetParams) {
        super(options || Config.mercury);
    }

    createMesh() {
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const meterial = new THREE.MeshPhongMaterial({
            specular: 0x333333, 
            shininess: 15,
            map: textureLoader.load(mercuryMap),
        })
        this.mesh = new THREE.Mesh(sphere, meterial);
        this.mesh.position.copy(this.initPosition);
    }
}