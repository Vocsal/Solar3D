import * as THREE from "three";
import Base from "src/js/three/base"

export default class Satellite extends Base {

    init(): void {
        this.createScene();
        this.createPerspectiveCamera();
        this.createRenderer();
        this.createLight();

    }
}