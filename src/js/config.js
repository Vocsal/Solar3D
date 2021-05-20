const Center = [0, 0, 0];

// sun
const SunPosition = Center; // 太阳位置
// const SunRadius = 0.696e6; // 太阳半径

// // earth
// const EarthRadius = 6378; // 地球半径
// const EarthToSunDistance = 149.6e6; // 地球到太阳的距离

// // moon
// const MoonRadius = 1738;
// const MoonToEarthDistance = 384403;

const SunScale = 1.5; // 太阳映射比例
const EarthScale = 15; // 地球映射比例
// 需要保持 EarthScale / SunScale < SunRadius / EarthRadius
// 这样CameraToCenterDistance和CameraFov才能为正值，才能正常看得见

// test
const SunRadius = 20000; // 太阳半径
const EarthRadius = 1000; // 地球半径
const EarthToSunDistance = 50000; // 地球到太阳的距离
const MoonRadius = 200;
const MoonToEarthDistance = 3000;


// camera perspectiveCamera
const CameraToCenterDistance = (SunRadius * SunScale) * EarthToSunDistance / ((SunRadius * SunScale) - (EarthRadius * EarthScale)); // 照相机到中心距离
const CameraFov = Math.atan((SunRadius * SunScale) / CameraToCenterDistance) / Math.PI * 180 * 2; // 照相机的张角

export default {
    cameraToCenterDistance: CameraToCenterDistance,
    cameraFov: CameraFov,
    sun: {
        radius: SunRadius,
        center: SunPosition,
        initPosition: SunPosition,
    },
    earth: {
        radius: EarthRadius,
        center: SunPosition,
        initPosition: [0, 0, EarthToSunDistance],
        orbitalPeriod: 365.2 * 24 * 60,
        rotationPeriod: 24 * 60,
    },
    earthToSunDistance: EarthToSunDistance,
    moon: {
        radius: MoonRadius,
        center: [0, 0, EarthToSunDistance], // 地球的中心 变化的 Function
        initPosition: [0, 0, EarthToSunDistance + MoonToEarthDistance],
        orbitalPeriod: 27.32 * 24 * 60,
        rotationPeriod: 27.32 * 24 * 60,
    }
}