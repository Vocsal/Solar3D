import * as THREE from 'three';
import { PlanetParams } from 'src/js/types/planet'
import Planet from "./planet";
import Config from "src/config"

// @ts-ignore
import EarthMap from "src/file/mesh/earth/earth_atmos_2048.jpg";
// @ts-ignore
import EarthSpecularMap from "src/file/mesh/earth/earth_specular_2048.jpg";
// @ts-ignore
import EarthNormalMap from "src/file/mesh/earth/earth_normal_2048.jpg";
// @ts-ignore
import EarthCloundsMap from "src/file/mesh/earth/earth_clouds_1024.png";

export default class Earth extends Planet {
    constructor(options?: PlanetParams) {
        super(options || Config.earth);
    }

    createMesh() {
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const meterial = new THREE.MeshPhongMaterial({
            specular: 0x333333, 
            shininess: 15,
            map: textureLoader.load(EarthMap),
            specularMap: textureLoader.load(EarthSpecularMap),
            normalMap: textureLoader.load(EarthNormalMap),
            normalScale: new THREE.Vector2(0.85, -0.85),
        })
        this.mesh = new THREE.Mesh(sphere, meterial);
        this.mesh.position.copy(this.initPosition);

        const materialClouds = new THREE.MeshLambertMaterial({
            map: textureLoader.load(EarthCloundsMap),
            transparent: true
        });
        const meshClouds = new THREE.Mesh(sphere, materialClouds);
        const cloudsScale = 1.005;
        meshClouds.scale.set(cloudsScale, cloudsScale, cloudsScale);
        this.mesh.add(meshClouds);
    }
}