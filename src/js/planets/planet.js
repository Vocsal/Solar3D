import { typeOf, calculateAngle } from "../util.js";
import Controller from "../controller.js"

export default class Planet {
    constructor({
        radius, // number 半径 （标准数据km）
        initPosition: [ix, iy, iz] = [0, 0, 0], // [x, y, z] 初始位置
        center, // [x, y, z], 公转中心 // Array Function
        orbitalPeriod = 0, // 公转周期 （标准数据分钟）
        rotationPeriod = 0, // 自转周期
        mesh
    } = {}) {
        const [cx = 0, cy = 0, cz = 0] = typeOf(center) === 'function' ? center() : center;

        // planet
        this.radius = radius; // 物体半径
        this.center = center; // 运动中心
        this.initPosition = [ix, iy, iz]; // 初始位置
        this.distance = Math.sqrt((cx-ix)*(cx-ix) + (cy-iy)*(cy-iy) + (cz-iz)*(cz-iz)); // 运动半径，到圆心距离
        this.orbitalPeriod = orbitalPeriod;
        this.rotationPeriod = rotationPeriod;

        // planet mesh
        this.mesh = mesh;
        this.init();
    }

    init() {}

    orbitalRun() {
        if(this.orbitalPeriod === 0) return;
        const [centerX = 0, centerY = 0, centerZ = 0] = typeOf(this.center) === 'function' ? this.center() : this.center;
        const distance = this.distance;
        const rotationAngle = calculateAngle(this.orbitalPeriod, Controller.timeStamp);
        // 考虑轨道平面倾角 undone
        this.mesh.position.set(-1 * distance * Math.sin(rotationAngle) + centerX, 0 + centerY, distance * Math.cos(rotationAngle) + centerZ); // 暂时为地球定制
    }

    rotationRun() {
        if(this.rotationPeriod === 0) return;
        const rotationAngle = calculateAngle(this.rotationPeriod, Controller.timeStamp);
        // 考虑轴倾角
        this.mesh.rotation.y = rotationAngle;
    }

    run() {
        this.orbitalRun();
        this.rotationRun();
    }

    getPosition() {
        if(!this.mesh) return this.initPosition
        return [this.mesh.position.x, this.mesh.position.y, this.mesh.position.z];
    }
}