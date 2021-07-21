import * as THREE from "three";
import * as Dat from "dat.gui";
import Base from "src/js/three/base"
import Controller from 'src/js/controller';
import Earth from 'src/js/planets/earth';
import Moon from 'src/js/planets/moon';

import Config from "./config"

const ControlsList = {
    orbit: "轨道",
    sync: "地球同步卫星",
}
export default class EarthSystem extends Base {
    earth!: Earth;
    moon!: Moon;
    controlsType: string = ControlsList.sync;
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
        this.createControls();
        this.addListeners();
        this.setLoop();
        this.createControlPanel();
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
        const earth = new Earth(Config.options.Earth);
        this.scene.add(earth.mesh);
        this.earth = earth;
    }

    createMoon(): void {
        const moon = new Moon(Config.options.Moon);
        this.scene.add(moon.mesh);
        this.scene.add(moon.track);
        this.moon = moon;
    }

    createControls(): void {
        this.controls && this.controls.dispose();
        this.controls = undefined;
        if(this.controlsType === ControlsList.orbit) {
            this.createOrbitControls();
        }
    }

    updateSynchronousMoonOfEarth(): void {
        const earthPosition = this.earth.getPosition();
        const synchronousMoonPosition = this.earth.getSynchronousMoonPosition(new THREE.Vector3(0, 0, 1), Config.options.Earth.radius * 3);
        const camera = this.camera as THREE.PerspectiveCamera;
        camera.position.copy(synchronousMoonPosition);
        camera.lookAt(earthPosition);
        camera.updateProjectionMatrix(); // 相机属性改变后，调用此方法对属性的更改生效
    }

    update(): void {
        Controller.update();
        this.earth.run();
        this.moon.run();
        this.controlsType === ControlsList.sync && this.updateSynchronousMoonOfEarth();
    }

    createControlPanel(): void {
        const gui = new Dat.GUI({
            width: 150,
            name: "控制",
        })
        gui
            .add(this, "controlsType", Object.values(ControlsList))
            .name("控制器")
            .onChange(() => {
                this.createControls();
            })
    }
}