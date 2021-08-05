import * as THREE from 'three';
import { PlanetParams, PlanetName } from 'src/js/types/planet'
import Planet from "./planet";

// @ts-ignore
import NeptuneMap from "src/file/mesh/neptune/neptunemap.jpg";

const Name = "Neptune";
export default class Neptune extends Planet {
    name: PlanetName = Name;
    constructor(options?: PlanetParams) {
        super(options);
    }

    createMesh() {
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const meterial = new THREE.MeshPhongMaterial({
            specular: 0x333333, 
            shininess: 15,
            map: textureLoader.load(NeptuneMap),
        })
        this.mesh = new THREE.Mesh(sphere, meterial);
        this.mesh.name = Name;
    }
}