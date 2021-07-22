import * as THREE from 'three';
import { PlanetParams } from 'src/js/types/planet'
import Planet from "./planet";

// @ts-ignore
import VenusMap from "src/file/mesh/venus/venusmap.jpg"
// @ts-ignore
import VenusBumpMap from "src/file/mesh/venus/venusbump.jpg"

export default class Venus extends Planet {
    name: string = "Venus";
    constructor(options?: PlanetParams) {
        super(options);
    }

    createMesh() {
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const meterial = new THREE.MeshPhongMaterial({
            specular: 0x333333, 
            shininess: 15,
            map: textureLoader.load(VenusMap),
            bumpMap: textureLoader.load(VenusBumpMap),
        })
        this.mesh = new THREE.Mesh(sphere, meterial);
        this.mesh.position.copy(this.initPosition);
    }
}