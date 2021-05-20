import * as THREE from 'three';
import Planet from './planet'
import Config from "../config.js"

// file
import MoonMap from "../../../file/mesh/moon/moonmap2k.jpg";
import MoonNormalMap from "../../../file/mesh/moon/moon-normal.jpg"

export default class Moon extends Planet {
    constructor(options = {})  {
        super(Object.assign({}, Config.moon, options))
    }

    init() {
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
        this.mesh.position.set(...this.initPosition);
    }
}