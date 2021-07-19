import * as THREE from "three";
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

export default class Solar extends Base {
    sun: Sun;
    planets: Array<Planet> = [];
    
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
        this.createLight();
        this.createSun();
        this.createPlanets();
        this.createStars();
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
        // 模拟太阳直射光
        const light = new THREE.AmbientLight();
        this.scene.add(light);
    }

    createSun(): void {
        const sun = new Sun();
        this.sun = sun;
        this.scene.add(sun.mesh);
    }

    createPlanets(): void {
        const mercury = new Mercury();
        this.planets.push(mercury);

        const venus = new Venus();
        this.planets.push(venus);
        
        const earth = new Earth();
        this.planets.push(earth);

        const moon = new Moon(Object.assign({}, Config.moon, {
            center: earth.getPosition.bind(earth),
        }));
        this.planets.push(moon);

        const mars = new Mars();
        this.planets.push(mars);

        const jupiter = new Jupiter();
        this.planets.push(jupiter);

        const saturn = new Saturn();
        this.planets.push(saturn);

        const uranus = new Uranus();
        this.planets.push(uranus);

        const neptune = new Neptune();
        this.planets.push(neptune);

        const pluto = new Pluto();
        this.planets.push(pluto);

        this.planets.forEach(planet => {
            this.scene.add(planet.mesh);
            this.scene.add(planet.track);
        })
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

    createOrbitControls(): void {
        super.createOrbitControls();
        // this.controls.autoRotate = true; // 自旋
        // this.controls.enableDamping = true; // 阻尼
        // this.controls.listenToKeyEvents(window as any); // 按键
    }

    update() {
        Controller.update();
        this.planets?.forEach(planet => {
            planet.run();
        })
    }
}