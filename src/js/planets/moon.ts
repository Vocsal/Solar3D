import * as THREE from 'three';
import Planet from "./planet";

// @ts-ignore
import MoonMap from "src/file/mesh/moon/moon_map_1024.jpg";
// @ts-ignore
import MoonNormalMap from "src/file/mesh/moon/moon-normal.jpg"

const Name = "Moon";
export default class Moon extends Planet {
    name: PlanetName = Name;
    constructor(options?: PlanetParams) {
        super(options);
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
        this.mesh.name = Name;
    }
}