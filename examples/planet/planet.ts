import * as THREE from "three";
import * as Dat from "dat.gui";
import Base from "src/js/three/base";
import Controller from 'src/js/controller';
import Planet from 'src/js/planets/planet';
import Pannel from "src/js/other/pannel";

import Config from "./config"
import { getPlanet } from './util';
const ControlsList = {
    orbit: "轨道",
    sync: "同步卫星",
}
export default class PlanetSystem extends Base {
    planetName: PlanetName;
    planet!: Planet;
    updating: boolean = true;
    controlsType: string = ControlsList.orbit;
    pannel: Pannel;
    constructor(sel: string, debug?: boolean) {
        super(sel, debug);
        this.perspectiveCameraParams = Config.perspectiveCameraParams;
        this.cameraPosition = Config.cameraPosition;
        this.lookAtPosition = Config.lookAtPosition;
    }

    init(): void {
        this.pannel = new Pannel({
            name: 'planet description',
            title: '介绍',
            background: "transparent",
            color: "rgba(255, 255, 255, 1)",
            top: "50px",
        });
        this.planetName = "Earth";
        this.createScene();
        this.createPerspectiveCamera();
        this.createRenderer();
        this.createLight();
        this.createPlanet();
        this.createControls();
        this.addListeners();
        this.setLoop();
        this.createSelectPanel();
    }

    createRenderer(): void {
        super.createRenderer();
        this.renderer.setClearColor(0x000000);
    }

    createLight(): void {
        const light = new THREE.AmbientLight();
        this.scene.add(light);
    }

    createPlanet(): void {
        if(!this.planetName || !Object.keys(Config.Planets).includes(this.planetName)) return;
        const planet = getPlanet(this.planetName);
        this.scene.add(planet.mesh);
        this.planet = planet;
        this.pannel.setList(Config.descriptions[this.planetName]);
        this.pannel.update();
    }

    removePlanet(): void{
        this.planet && this.scene.remove(this.planet.mesh);
    }

    changePlanet(name: PlanetName): void {
        this.updating = false;
        this.removePlanet();
        this.resetControl();
        this.planetName = name;
        this.createPlanet();
        this.updating = true;
    }

    createControls(): void {
        this.controls && this.controls.dispose();
        this.controls = undefined;
        if(this.controlsType === ControlsList.orbit) {
            this.createOrbitControls();
        }
    }

    resetControl(): void {
        this.controls && this.controls.reset();
    }

    updateSynchronousMoonOfEarth(): void {
        const planetPosition = this.planet.getPosition();
        const synchronousMoonPosition = this.planet.getSynchronousMoonPosition(
            Config.ChinaSynchronousMoonVector.clone(),
            Config.options.Earth.radius * 3
        );
        const camera = this.camera as THREE.PerspectiveCamera;
        camera.position.copy(synchronousMoonPosition);
        camera.lookAt(planetPosition);
        camera.updateProjectionMatrix(); // 相机属性改变后，调用此方法对属性的更改生效
    }

    createSelectPanel(): void {
        const gui = new Dat.GUI({
            width: 150,
            name: "控制器",
        });
        gui
            .add(this, "controlsType", Object.values(ControlsList))
            .name("控制")
            .onChange(() => {
                this.createControls();
            })
        gui
            .add(this, "planetName", Object.keys(Config.Planets))
            .name("行星选择")
            .onChange((value: PlanetName) => {
                this.changePlanet(value);
            });
    }

    update(): void {
        if(!this.updating) return;
        Controller.update();
        this.planet.run();
        this.controlsType === ControlsList.sync && this.updateSynchronousMoonOfEarth();
    }
}