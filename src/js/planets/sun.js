import * as THREE from 'three';
import Planet from './planet'
import Config from "../config.js"

// file
import SunMap from "../../../file/mesh/sun/2k_sun.jpg";

export default class Sun extends Planet {
    constructor(options = {}) {
        super(Object.assign({}, Config.sun, options))
    }

    init() {
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const material = new THREE.MeshPhongMaterial({
            specular: 0x333333,
            shininess: 15,
            map: textureLoader.load(SunMap),
            normalScale: new THREE.Vector2(0.85, -0.85),
        })
        this.mesh = new THREE.Mesh(sphere, material);
        this.mesh.position.set(...this.initPosition);
    }
}