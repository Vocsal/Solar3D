import * as THREE from 'three';
import { PlanetParams } from 'src/js/types/planet'
import Planet from "./planet";

// @ts-ignore
import PlutoMap from "src/file/mesh/pluto/plutomap1k.jpg";
// @ts-ignore
import PlutoBumpMap from "src/file/mesh/pluto/plutobump1k.jpg";

export default class Pluto extends Planet {
    name: string = "Pluto";
    constructor(options?: PlanetParams) {
        super(options);
    }

    createMesh() {
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const meterial = new THREE.MeshPhongMaterial({
            specular: 0x333333, 
            shininess: 15,
            map: textureLoader.load(PlutoMap),
            bumpMap: textureLoader.load(PlutoBumpMap),
        })
        this.mesh = new THREE.Mesh(sphere, meterial);
        this.mesh.position.copy(this.initPosition);
    }
}