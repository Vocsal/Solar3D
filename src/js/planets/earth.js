import * as THREE from 'three';
import Planet from './planet'
import Config from "../config.js"

// file
import EarthMap from "../../../file/mesh/earth/earth_atmos_2048.jpg";
import EarthSpecularMap from "../../../file/mesh/earth/earth_specular_2048.jpg";
import EarthNormalMap from "../../../file/mesh/earth/earth_normal_2048.jpg";

export default class Earth extends Planet {
    constructor(options = {}) {
        super(Object.assign({}, Config.earth, options))
    }

    init() {
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const material = new THREE.MeshPhongMaterial({
            specular: 0x333333,
            shininess: 15,
            map: textureLoader.load(EarthMap),
            specularMap: textureLoader.load(EarthSpecularMap),
            normalMap: textureLoader.load(EarthNormalMap),
            normalScale: new THREE.Vector2(0.85, -0.85),
        })
        this.mesh = new THREE.Mesh(sphere, material);
        this.mesh.position.set(...this.initPosition);
    }
}