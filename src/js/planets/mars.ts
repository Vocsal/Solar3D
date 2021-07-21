import * as THREE from 'three';
import { PlanetParams } from 'src/js/types/planet'
import Planet from "./planet";

// @ts-ignore
import MarsMap from "src/file/mesh/mars/mars_1k_color.jpg";
// @ts-ignore
import MarsNormalMap from "src/file/mesh/mars/mars_1k_topo.jpg";

export default class Mars extends Planet {
    constructor(options?: PlanetParams) {
        super(options);
    }

    createMesh() {
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const meterial = new THREE.MeshPhongMaterial({
            specular: 0x333333, 
            shininess: 15,
            map: textureLoader.load(MarsMap),
            normalMap: textureLoader.load(MarsNormalMap),
            normalScale: new THREE.Vector2(0.85, -0.85),
        })
        this.mesh = new THREE.Mesh(sphere, meterial);
        this.mesh.position.copy(this.initPosition);
    }
}
