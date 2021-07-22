import * as THREE from "three";
import * as Dat from "dat.gui";
import Base from "./three/base"
import Controller from './controller';
import Config from '../config';

import Planet from './planets/planet';
import Sun from './planets/sun';
import Mercury from './planets/mercury';
import Venus from './planets/venus';
import Earth from './planets/earth';
import Moon from './planets/moon';
import Mars from './planets/mars';
import Jupiter from './planets/jupiter';
import Saturn from './planets/saturn';
import Uranus from './planets/uranus';
import Neptune from './planets/neptune';
import Pluto from './planets/pluto';

import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";

export default class Solar extends Base {
    sun: Sun;
    earth: Earth;
    planets: Array<Planet> = [];
    controlsType: string = Config.defaultControls;
    flyControls: FlyControls;
    
    constructor(sel: string, debug?: boolean) {
        super(sel, debug);
        this.perspectiveCameraParams = Config.perspectiveCameraParams;
        this.cameraPosition = Config.cameraPosition;
        this.lookAtPosition = Config.lookAtPosition;
    }

    init() {
        this.createScene();
        this.createPerspectiveCamera();
        this.createRenderer();
        this.createSun();
        this.createPlanets();
        this.createStars();
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
        // const light = new THREE.AmbientLight();
        // this.scene.add(light);

        const light1 = new THREE.AmbientLight(0xffffff, 0.15);
        this.scene.add(light1);
        // 模拟太阳直射光
        const light2 = new THREE.PointLight(0xffffff);
        this.sun && this.sun.mesh && light2.add(this.sun.mesh);
        this.scene.add(light2);
    }

    createSun(): void {
        const sun = new Sun(Config.Sun);
        this.sun = sun;
        this.scene.add(sun.mesh);
    }

    createPlanets(): void {
        const mercury = new Mercury(Config.Mercury);
        this.planets.push(mercury);

        const venus = new Venus(Config.Venus);
        this.planets.push(venus);
        
        const earth = new Earth(Config.Earth);
        this.planets.push(earth);
        this.earth = earth;

        const moon = new Moon(Object.assign({}, Config.Moon, {
            center: earth.getPosition.bind(earth),
        }));
        this.planets.push(moon);

        const mars = new Mars(Config.Mars);
        this.planets.push(mars);

        const jupiter = new Jupiter(Config.Jupiter);
        this.planets.push(jupiter);

        const saturn = new Saturn(Config.Saturn);
        this.planets.push(saturn);

        const uranus = new Uranus(Config.Uranus);
        this.planets.push(uranus);

        const neptune = new Neptune(Config.Neptune);
        this.planets.push(neptune);

        const pluto = new Pluto(Config.Pluto);
        this.planets.push(pluto);

        this.planets.forEach(planet => {
            planet.mesh && this.scene.add(planet.mesh);
            planet.track && this.scene.add(planet.track);
        })

        this.setPeriod(Config.periodScaleGenerator(this.controlsType));
    }

    createStars(): void {
        const count1 = 250, count2 = 1500, count3 = 30;
        const distance = Config.perspectiveCameraParams.far;
        const starsGeometry = [ new THREE.BufferGeometry(), new THREE.BufferGeometry() ];
        const vertices1 = [];
        const vertices2 = [];
        const vertex = new THREE.Vector3();

        const randomNum = () => Math.random() * 2 -1;
        for ( let i = 0; i < count1; i ++ ) {
            vertex.x = randomNum();
            vertex.y = randomNum();
            vertex.z = randomNum();
            vertex.multiplyScalar( distance );

            vertices1.push( vertex.x, vertex.y, vertex.z );
        }
        for ( let i = 0; i < count2; i ++ ) {
            vertex.x = randomNum();
            vertex.y = randomNum();
            vertex.z = randomNum();
            vertex.multiplyScalar( distance );

            vertices2.push( vertex.x, vertex.y, vertex.z );
        }

        starsGeometry[0].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices1, 3 ) );
        starsGeometry[1].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices2, 3 ) );

        const starsMaterials= [
            new THREE.PointsMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
            new THREE.PointsMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
            new THREE.PointsMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
            new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
            new THREE.PointsMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
            new THREE.PointsMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } ),
        ];

        for ( let i = 0; i < count3; i ++ ) {
            const stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );
            stars.rotation.x = Math.random() * Math.PI * 2;
            stars.rotation.y = Math.random() * Math.PI * 2;
            stars.rotation.z = Math.random() * Math.PI * 2;
            stars.scale.setScalar( i % 10 );

            stars.matrixAutoUpdate = false;
            stars.updateMatrix();

            this.scene.add(stars);
        }
    }

    createControls(): void {
        this.controls && this.controls.dispose();
        this.controls = undefined;
        this.flyControls && this.flyControls.dispose();
        this.flyControls = undefined;
        if(this.controlsType === Config.controlsList.fly) {
            this.createFlyControls();
        } else if(this.controlsType === Config.controlsList.orbit) {
            this.createOrbitControls();
            const camera = this.camera as THREE.PerspectiveCamera;
            camera.position.copy(this.cameraPosition);
            camera.lookAt(this.lookAtPosition);
            camera.updateProjectionMatrix();
        }
    }

    createOrbitControls(): void {
        super.createOrbitControls();
        // this.controls.autoRotate = true; // 自旋
        // this.controls.enableDamping = true; // 阻尼
        // this.controls.listenToKeyEvents(window as any); // 按键
    }

    createFlyControls(): void {
        const controls = new FlyControls(this.camera, this.renderer.domElement);
        controls.rollSpeed = 0.0003;
        controls.movementSpeed = 50;
        // controls.dragToLook = true;
        // controls.autoForward = false;
        controls.update(Controller.timeInterval);
        this.flyControls = controls;
    }

    setPeriod(scale: number = 1): void {
        this.planets.forEach(planet => {
            // @ts-ignore
            const { orbitalPeriod, rotationPeriod } = Config[planet.name];
            planet.setPeriod({
                orbitalPeriod: orbitalPeriod * scale,
                rotationPeriod: rotationPeriod * scale,
            })
        })
    }

    updateSynchronousMoonOfEarth(): void {
        const earthPosition = this.earth.getPosition();
        const synchronousMoonPosition = this.earth.getSynchronousMoonPosition(
            Config.ChinaSynchronousMoonVector.clone(),
            Config.Earth.radius * 3
        );
        const camera = this.camera as THREE.PerspectiveCamera;
        camera.position.copy(synchronousMoonPosition);
        camera.lookAt(earthPosition);
        camera.updateProjectionMatrix(); // 相机属性改变后，调用此方法对属性的更改生效
    }

    updateControls(): void {
        this.controlsType === Config.controlsList.fly && this.flyControls && this.flyControls.update(Controller.timeInterval);
        this.controlsType === Config.controlsList.sync && this.updateSynchronousMoonOfEarth();
        this.setPeriod(Config.periodScaleGenerator(this.controlsType));
    }

    update(): void {
        this.planets?.forEach(planet => {
            planet.run();
        })
        this.updateControls();
        Controller.update();
        // 为了保持 Controller.timeStamp, Controller.timeInterval 引起的自转差异，必须保持Controller在最后更新
        // 即自转和公转都是从时间0起始点开始的
        // 维持一致性
    }

    createControlPanel(): void {
        const gui = new Dat.GUI({
            width: 150,
            name: "控制",
        })
        gui
            .add(this, "controlsType", Object.values(Config.controlsList))
            .name("控制器")
            .onChange(() => {
                this.createControls();
            })
    }
}