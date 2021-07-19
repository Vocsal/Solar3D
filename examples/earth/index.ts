import * as THREE from "three";
import Base from "src/js/three/base"
import Controller from 'src/js/controller';
import Earth from 'src/js/planets/earth';
import Moon from 'src/js/planets/moon';

import Config from "./config"

export default class EarthSystem extends Base {
    earth!: Earth;
    moon!: Moon;
    constructor(sel: string, debug?: boolean) {
        super(sel, debug);
        this.perspectiveCameraParams = Config.perspectiveCameraParams;
        this.cameraPosition = Config.cameraPosition;
        this.lookAtPosition = Config.lookAtPosition;
    }

    init(): void {
        this.createScene();
        this.createPerspectiveCamera();
        this.createRenderer();
        this.createEarth();
        this.createMoon();
        this.createLight();
        this.createOrbitControls();
        this.addListeners();
        this.setLoop();
        console.log('this.scene', this.scene)
    }

    createRenderer(): void {
        super.createRenderer();
        this.renderer.setClearColor(0x000000);
    }

    createLight(): void {
        const light = new THREE.AmbientLight();
        // const light = new THREE.DirectionalLight();
        // light.position.copy(this.cameraPosition);
        // light.target = this.earth.mesh;
        this.scene.add(light);
    }

    createEarth(): void {
        const earth = new Earth(Config.options.Earch);
        this.scene.add(earth.mesh);
        this.earth = earth;
    }

    createMoon(): void {
        const moon = new Moon(Config.options.Moon);
        this.scene.add(moon.mesh);
        this.scene.add(moon.track);
        this.moon = moon;
    }

    update(): void {
        Controller.update();
        this.earth.run();
        this.moon.run();
    }
}