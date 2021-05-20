export function typeOf(val) {
    return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
}


/**
 * @description 计算弧度
 * @param {Number} period 周期
 * @param {Number} timeStamp 时间戳
 * @returns 弧度
 */
export function calculateAngle(period, timeStamp) {
    return timeStamp % period / period * Math.PI * 2;
}