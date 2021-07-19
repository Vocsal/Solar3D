import * as THREE from 'three';
import { PlanetParams } from 'src/js/types/planet'
import Planet from "./planet";
import Config from "src/config"

// @ts-ignore
import MoonMap from "src/file/mesh/moon/moonmap2k.jpg";
// @ts-ignore
import MoonNormalMap from "src/file/mesh/moon/moon-normal.jpg"

export default class Moon extends Planet {
    constructor(options?: PlanetParams) {
        super(options || Config.moon);
    }
    
    createMesh() {
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const material = new THREE.MeshPhongMaterial({
            specular: 0x333333,
            shininess: 15,
            map: textureLoader.load(MoonMap),
            normalMap: textureLoader.load(MoonNormalMap),
            normalScale: new THREE.Vector2(0.85, -0.85),
        })
        this.mesh = new THREE.Mesh(sphere, material);
        this.mesh.position.copy(this.initPosition);
    }
}