import * as THREE from 'three';
import Planet from "./planet";

export default class Demo extends Planet {
    constructor(options?: PlanetParams) {
        super(options);
    }

    createMesh() {
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const meterial = new THREE.MeshPhongMaterial({
            specular: 0x333333, 
            shininess: 15,
            // map: textureLoader.load(map),
            // specularMap: textureLoader.load(specularMap),
            // normalMap: textureLoader.load(normalMap),
            // normalScale: new THREE.Vector2(0.85, -0.85),
        })
        this.mesh = new THREE.Mesh(sphere, meterial);
    }
}