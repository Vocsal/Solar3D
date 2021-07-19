import * as THREE from 'three';
import { PlanetParams } from 'src/js/types/planet'
import Planet from "./planet";
import Config from "src/config"

// @ts-ignore
import UranusMap from "src/file/mesh/uranus/2K_uranus.jpg";

export default class Uranus extends Planet {
    constructor(options?: PlanetParams) {
        super(options || Config.uranus);
    }

    createMesh() {
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const meterial = new THREE.MeshPhongMaterial({
            specular: 0x333333, 
            shininess: 15,
            map: textureLoader.load(UranusMap),
        })
        this.mesh = new THREE.Mesh(sphere, meterial);
        this.mesh.position.copy(this.initPosition);
    }
}