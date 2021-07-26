import * as THREE from 'three';
import { PlanetParams } from 'src/js/types/planet'
import Planet from "./planet";

// @ts-ignore
import mercuryMap from "src/file/mesh/mercury/mercury_1024.jpg";

const Name = "Mercury";
export default class Mercury extends Planet {
    name: string = "Mercury";
    constructor(options?: PlanetParams) {
        super(options);
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
        this.mesh.name = Name;
    }
}