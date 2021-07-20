import * as THREE from 'three';
import { PlanetParams } from 'src/js/types/planet'
import { calculateOrbitRad, deg2rad, getNormalizedVectorFromObliquity, getNormalizedVectorFromInclination, getOrbitalPosition } from "src/js/util";
import Controller from "src/js/controller";

export default class Planet {
    mesh: THREE.Mesh; // 物体材质
    track: THREE.Mesh; // 运动轨迹

    radius: number; // 物体半径
    initPosition: THREE.Vector3; // 初始位置
    center: THREE.Vector3 | Function; // 公转中心
    distance: number = 0; // 公转半径
    orbitalPeriod: number; // 公转周期，周期以分钟为基准
    inclination: number; // 轨道倾角
    orbitalAxisVector3: THREE.Vector3; // 轨道转轴标准化向量
    rotationPeriod: number; // 自转周期
    obliquity: number; // 转轴倾角
    rotationAxisVector3: THREE.Vector3;  // 自转转轴标准化向量

    constructor({
        radius = 0,
        initPosition = new THREE.Vector3(0, 0, 0),
        center = new THREE.Vector3(0, 0, 0),
        orbitalPeriod,
        inclination = 0,
        rotationPeriod,
        obliquity = 0,
        mesh,
    }: PlanetParams) {
        this.radius = radius;
        this.initPosition = initPosition;
        this.center = center;
        this.orbitalPeriod = orbitalPeriod;
        this.inclination = inclination;
        this.orbitalAxisVector3 = getNormalizedVectorFromInclination(inclination);
        this.rotationPeriod = rotationPeriod;
        this.obliquity = obliquity;
        this.rotationAxisVector3 = getNormalizedVectorFromObliquity(obliquity);
        mesh && (this.mesh = mesh);

        const { x: cx, y: cy, z: cz } = center instanceof THREE.Vector3 ? center : center();
        const { x: ix, y: iy, z: iz } = this.initPosition;
        this.distance = Math.sqrt((cx-ix)*(cx-ix) + (cy-iy)*(cy-iy) + (cz-iz)*(cz-iz));

        this.init();
    }

    init() {
        this.createMesh();
        if(this.mesh && this.obliquity) {
            this.mesh.rotation.z = deg2rad(-1 * this.obliquity);
        }
        this.createTrack();
    }

    createMesh() {}

    createTrack(): void {
        const width = 30;
        const distance = this.distance;
        const track = new THREE.Mesh(
            new THREE.RingGeometry( distance - width / 2, distance + width / 2, 128, 1),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
            })
        )
        track.rotation.x = Math.PI / 2;
        track.rotation.y = deg2rad(this.inclination);
        this.track = track;
    }

    orbitalRun(): void {
        if(!this.orbitalPeriod || this.orbitalPeriod === 0) return;
        const center = this.center instanceof THREE.Vector3 ? this.center : this.center();
        const { distance } = this;
        const orbitalRad = calculateOrbitRad(this.orbitalPeriod, Controller.timeStamp);
        // 考虑轨道平面倾角
        const position = getOrbitalPosition(this.orbitalAxisVector3, new THREE.Vector3(0, 0, distance), orbitalRad);

        this.mesh.position.copy(position.add(center));
        this.track.position.copy(center);
    }

    rotationRun(): void {
        if(!this.rotationPeriod || this.rotationPeriod === 0) return;
        const orbitalRad = calculateOrbitRad(this.rotationPeriod, Controller.timeInterval);
        // 考虑轴倾角
        this.mesh.rotateOnWorldAxis(this.rotationAxisVector3, orbitalRad);
    }

    run(): void {
        this.orbitalRun();
        this.rotationRun();
    }

    getPosition(): THREE.Vector3 {
        if(!this.mesh) return this.initPosition;
        return this.mesh.position;
    }
}