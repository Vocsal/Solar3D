import * as THREE from "three";
import Base from "src/js/three/base"
import Controller from 'src/js/controller';
import Planet from 'src/js/planets/planet';

import Config from "./config"
import { getPlanet } from './util';

import * as Dat from "dat.gui";

export default class PlanetSystem extends Base {
    planetName: string;
    planet!: Planet;
    updating: boolean = true;
    constructor(sel: string, debug?: boolean) {
        super(sel, debug);
        this.perspectiveCameraParams = Config.perspectiveCameraParams;
        this.cameraPosition = Config.cameraPosition;
        this.lookAtPosition = Config.lookAtPosition;
    }

    init(): void {
        this.planetName = "Earth";
        this.createScene();
        this.createPerspectiveCamera();
        this.createRenderer();
        this.createLight();
        this.createPlanet();
        this.createOrbitControls();
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
    }

    removePlanet(): void{
        this.planet && this.scene.remove(this.planet.mesh);
    }

    changePlanet(name: string): void {
        this.updating = false;
        this.removePlanet();
        this.resetControl();
        this.planetName = name;
        this.createPlanet();
        this.updating = true;
    }

    resetControl(): void {
        this.controls && this.controls.reset();
    }

    createSelectPanel(): void {
        const gui = new Dat.GUI({
            width: 150,
            name: "行星选择",
        });
        gui
            .add(this, "planetName", Object.keys(Config.Planets))
            .name("行星选择")
            .onChange((value: string) => {
                this.changePlanet(value);
            });
    }

    update(): void {
        if(!this.updating) return;
        Controller.update();
        this.planet.run();
    }
}