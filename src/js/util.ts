import * as THREE from 'three';

export function typeOf(val: any): string {
    return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
}

/**
 * @description 将弧度转换为角度
 * @param rad 弧度
 * @returns 角度
 */
export function rad2deg(rad: number): number {
    return (rad * 180.0) / Math.PI;
}

export function deg2rad(deg: number): number {
    return deg / 180.0 * Math.PI;
}

/**
 * @description 计算弧度
 * @param {Number} period 周期
 * @param {Number} timeStamp 时间戳
 * @returns 弧度
 */
export function calculateOrbitRad(period: number, timeStamp: number): number {
    const sign = period > 0 ? 1 : -1;
    return timeStamp % period / period * Math.PI * 2 * sign;
}

/**
 * 计算透视相机的视角
 * @param radius 物体半径
 * @param distance 照相机距离
 */
export function calculatePerspectiveCameraFov(radius: number, distance: number, scale: number = 1): number {
    return Math.atan(radius * scale / distance) / Math.PI * 180 * 2;
}

/**
 * 获取转轴向量
 * @param obliquity 转轴倾角,角度
 * @returns 转轴标准化向量，相对于Z轴
 */
export function getNormalizedVectorFromObliquity(obliquity: number): THREE.Vector3 {
    return new THREE.Vector3(Math.sin(deg2rad(obliquity)), Math.cos(deg2rad(obliquity)), 0).normalize();
}

/**
 * @description 获取旋转轴向量
 * @param inclination 轨道倾角，角度
 * @return 旋转轴向量
 */
export function getNormalizedVectorFromInclination(inclination: number): THREE.Vector3 {
    return new THREE.Vector3(Math.sin(deg2rad(inclination)), -1 * Math.cos(deg2rad(inclination)), 0).normalize();
}

/**
 * 获取旋转后的位置
 * @param axis 旋转轴，单位向量，归一化
 * @param startPosition 起始位置
 * @param theta 旋转弧度
 * @return 位置
 */
export function getOrbitalPosition(axis: THREE.Vector3, startPosition: THREE.Vector3, theta: number): THREE.Vector3 {
    const { x: vx, y: vy, z: vz} = axis;
    const { x: sx, y: sy, z: sz } = startPosition;
    const sinT = Math.sin(theta), cosT = Math.cos(theta);

    const ex =
        ( vx * vx * ( 1 - cosT ) + cosT ) * sx +
        ( vx * vy * ( 1 - cosT ) - vz * sinT ) * sy +
        ( vx * vz * ( 1 - cosT ) + vy * sinT ) * sz;
    const ey =
        ( vx * vy * ( 1 - cosT ) + vz * sinT ) * sx +
        ( vy * vy * ( 1 - cosT ) + cosT ) * sy +
        ( vy * vz * ( 1 - cosT ) - vx * sinT ) * sz;
    const ez =
        ( vx * vz * ( 1 - cosT ) - vy * sinT ) * sx
        + ( vy * vz * ( 1 - cosT ) + vx * sinT ) * sy +
        + ( vz * vz * ( 1 - cosT ) + cosT ) * sz;

    return new THREE.Vector3(ex, ey, ez);
}