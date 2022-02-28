// https://sketchfab.com/3d-models/satellite-90c8fafa35c84e3b90601dd3ac8d202f
import * as THREE from "three";
import Base from "src/js/three/base"

export default class Satellite extends Base {
    dirLight: THREE.Light;
    constructor(sel: string, debug?: boolean) {
        super(sel, debug);
        this.perspectiveCameraParams = {
            fov: 45,
            near: 1,
            far: 20000
        };
        this.cameraPosition = new THREE.Vector3(1000, 2000, 3000);
    }

    init(): void {
        this.createScene();
        this.createPerspectiveCamera();
        this.createRenderer();
        this.createLight();
        this.createOrbitControls();
        this.loadFBXModel('src/file/models/satellite/satellite_sketchfab.fbx')
            .then(obj => {
                const mesh = obj.children[0].clone();
                this.scene.add(mesh);
            })
            .catch(err => {
                console.error('加载FBX模型失败');
                console.error(err)
            });
        this.addListeners();
        this.setLoop();
    }

    createRenderer(): void {
        super.createRenderer();
        this.renderer.setClearColor(0x000000);
    }

    createLight(): void {
        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
        hemiLight.position.set( 0, 10000, 0 );
        this.scene.add( hemiLight );
        const dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        dirLight.position.set( 1000, 2000, 3000 );
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 180;
        dirLight.shadow.camera.bottom = - 100;
        dirLight.shadow.camera.left = - 120;
        dirLight.shadow.camera.right = 120;
        this.scene.add( dirLight );
        this.dirLight = dirLight;
    }

    update(): void {
        this.dirLight.position.copy(this.camera.position);
    }
}