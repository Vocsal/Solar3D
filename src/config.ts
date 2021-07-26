import * as THREE from 'three';
import { calculatePerspectiveCameraFov } from './js/util'

const Center = new THREE.Vector3(0, 0, 0);

const SunPosition = Center; // 太阳位置

// ["real", "compare", "test"]
const type = "compare";

const RealSunRadius = 1392000 / 2;
const RealMercuryRadius = 4879 / 2;
const RealVenusRadius = 12104 / 2;
const RealEarthRadius = 12756 / 2;
const RealMoonRadius = 3475 / 2;
const RealMarsRadius = 6792 / 2;
const RealJupiterRadius = 142984 / 2;
const RealSaturnRadius = 120536 / 2;
const RealUranusRadius = 51118 / 2;
const RealNeptuneRadius = 49528 / 2;
const RealPlutoRadius = 2370 / 2;
const RealMercuryToSunDistance = 57.9e6;
const RealVenusToSunDistance = 108.2e6;
const RealEarthToSunDistance = 149.6e6;
const RealMoonToEarthDistance = 384403; // 月球到地球的距离
const RealMarsToSunDistance = 227.9e6;
const RealJupiterToSunDistance = 778.6e6;
const RealSaturnToSunDistance = 1433.5e6;
const RealUranusToSunDistance = 2872.5e6;
const RealNeptuneToSunDistance = 4495.1e6;
const RealPlutoToSunDistance = 5906.4e6;

const zoom = (_: number): number => _ / 1e2;

const compareRadiusScale = 100;
const compareDistanceScale = 4000;
const compareSunRadiusScale = 1 / 10;
const compareMoonToEarthDistanceScale = 30;
// compareToEarthDistanceScale真实值为: compareRadiusScale * RealEarthToSunDistance / RealEarthRadius
// 其中 RealEarthToSunDistance / RealEarthRadius = 5863.907180934462

const config = {
	real: {
		trackWidth: 10,
		SunScale: 12, // 太阳映射比例
		EarthScale: 36, // 地球映射比例
		perspectiveCameraParamsFar: zoom(1e11),
		SunRadius: zoom(RealSunRadius),
		MercuryRadius: zoom(RealMercuryRadius),
		VenusRadius: zoom(RealVenusRadius),
		EarthRadius: zoom(RealEarthRadius),
		MoonRadius: zoom(RealMoonRadius),
		MarsRadius: zoom(RealMarsRadius),
		JupiterRadius: zoom(RealJupiterRadius),
		SaturnRadius: zoom(RealSaturnRadius),
		UranusRadius: zoom(RealUranusRadius),
		NeptuneRadius: zoom(RealNeptuneRadius),
		PlutoRadius: zoom(RealPlutoRadius),
		MercuryToSunDistance: zoom(RealMercuryToSunDistance),
		VenusToSunDistance: zoom(RealVenusToSunDistance),
		EarthToSunDistance: zoom(RealEarthToSunDistance),
		MoonToEarthDistance: zoom(RealMoonToEarthDistance),
		MarsToSunDistance: zoom(RealMarsToSunDistance),
		JupiterToSunDistance: zoom(RealJupiterToSunDistance),
		SaturnToSunDistance: zoom(RealSaturnToSunDistance),
		UranusToSunDistance: zoom(RealUranusToSunDistance),
		NeptuneToSunDistance: zoom(RealNeptuneToSunDistance),
		PlutoToSunDistance: zoom(RealPlutoToSunDistance),
	},
	compare: {
		trackWidth: 1,
		SunScale: 3,
		EarthScale: 9,
		perspectiveCameraParamsFar: 3e8,
		SunRadius: RealSunRadius / RealEarthRadius * compareRadiusScale * compareSunRadiusScale,
		MercuryRadius: RealMercuryRadius / RealEarthRadius * compareRadiusScale,
		VenusRadius: RealVenusRadius / RealEarthRadius * compareRadiusScale,
		EarthRadius: RealEarthRadius / RealEarthRadius * compareRadiusScale,
		MoonRadius: RealMoonRadius / RealEarthRadius * compareRadiusScale,
		MarsRadius: RealMarsRadius / RealEarthRadius * compareRadiusScale,
		JupiterRadius: RealJupiterRadius / RealEarthRadius * compareRadiusScale,
		SaturnRadius: RealSaturnRadius / RealEarthRadius * compareRadiusScale,
		UranusRadius: RealUranusRadius / RealEarthRadius * compareRadiusScale,
		NeptuneRadius: RealNeptuneRadius / RealEarthRadius * compareRadiusScale,
		PlutoRadius: RealPlutoRadius / RealEarthRadius * compareRadiusScale,
		MercuryToSunDistance: RealMercuryToSunDistance / RealEarthToSunDistance * compareDistanceScale,
		VenusToSunDistance: RealVenusToSunDistance / RealEarthToSunDistance * compareDistanceScale,
		EarthToSunDistance: RealEarthToSunDistance / RealEarthToSunDistance * compareDistanceScale,
		MoonToEarthDistance: RealMoonToEarthDistance / RealEarthToSunDistance * compareDistanceScale * compareMoonToEarthDistanceScale,
		MarsToSunDistance: RealMarsToSunDistance / RealEarthToSunDistance * compareDistanceScale,
		JupiterToSunDistance: RealJupiterToSunDistance / RealEarthToSunDistance * compareDistanceScale,
		SaturnToSunDistance: RealSaturnToSunDistance / RealEarthToSunDistance * compareDistanceScale,
		UranusToSunDistance: RealUranusToSunDistance / RealEarthToSunDistance * compareDistanceScale,
		NeptuneToSunDistance: RealNeptuneToSunDistance / RealEarthToSunDistance * compareDistanceScale,
		PlutoToSunDistance: RealPlutoToSunDistance / RealEarthToSunDistance * compareDistanceScale,
	},
	test: {
		trackWidth: 100,
		SunScale: 3,
		EarthScale: 6,
		perspectiveCameraParamsFar: 3e8,
		SunRadius: 15000,
		MercuryRadius: 380,
		VenusRadius: 950,
		EarthRadius: 1000,
		MoonRadius: 200,
		MarsRadius: 500,
		JupiterRadius: 11210,
		SaturnRadius: 9450,
		UranusRadius: 4007,
		NeptuneRadius: 3883,
		PlutoRadius: 186,
		MercuryToSunDistance: 19333.33,
		VenusToSunDistance: 36163.1,
		EarthToSunDistance: 50000,
		MoonToEarthDistance: 3000,
		MarsToSunDistance: 76000,
		JupiterToSunDistance: 260227.3,
		SaturnToSunDistance: 482453.2,
		UranusToSunDistance: 960060.2,
		NeptuneToSunDistance: 1502373.0,
		PlutoToSunDistance: 1974064.2,
	}
}

const {
	trackWidth,
	SunScale,
	EarthScale,
	perspectiveCameraParamsFar,
	SunRadius,
	MercuryRadius,
	VenusRadius,
	EarthRadius,
	MoonRadius,
	MarsRadius,
	JupiterRadius,
	SaturnRadius,
	UranusRadius,
	NeptuneRadius,
	PlutoRadius,
	MercuryToSunDistance,
	VenusToSunDistance,
	EarthToSunDistance,
	MoonToEarthDistance,
	MarsToSunDistance,
	JupiterToSunDistance,
	SaturnToSunDistance,
	UranusToSunDistance,
	NeptuneToSunDistance,
	PlutoToSunDistance,
} = config[type];
console.log('行星配置信息', config[type])

// 需要保持 EarthScale / SunScale < SunRadius / EarthRadius
// 这样CameraToCenterDistance和CameraFov才能为正值，才能正常看得见
// camera perspectiveCamera
const CameraToCenterDistance = (SunRadius * SunScale) * EarthToSunDistance / ((SunRadius * SunScale) - (EarthRadius * EarthScale)); // 照相机到中心距离
const CameraFov = calculatePerspectiveCameraFov(SunRadius, CameraToCenterDistance, SunScale); // 照相机的张角

// const CameraNormalizeVector = new THREE.Vector3( 0, 0, 1 ).normalize();
// const CameraAngle = Math.PI / 36;
// const CameraNormalizeVector = new THREE.Vector3( 0, Math.sin(CameraAngle), Math.cos(CameraAngle) ).normalize();
// const CameraNormalizeVector = new THREE.Vector3( -1598, 622, 4587 ).normalize();
const CameraNormalizeVector = new THREE.Vector3( 0, 920, 5439 ).normalize();
// const CameraNormalizeVector = new THREE.Vector3( 0, 1, 0 ).normalize();

const controlsList = {
    orbit: "轨道",
    fly: "飞行",
    sync: "地球同步卫星",
}
const defaultControls = controlsList.sync;
const periodScaleGenerator = (type: string): number => {
	if(type === controlsList.sync) return 1 / 100;
	return 1 / 1000;
}
const periodScale = periodScaleGenerator(defaultControls);
const ChinaSynchronousMoonVector = new THREE.Vector3(0.2931436949654428, 1.6525710207101858, -2.4865791351997784).normalize();
export default {
	perspectiveCameraParams: {
		fov: CameraFov,
		near: 1,
		far: perspectiveCameraParamsFar,
	},
	cameraPosition: new THREE.Vector3(
		CameraToCenterDistance * CameraNormalizeVector.x,
		CameraToCenterDistance * CameraNormalizeVector.y,
		CameraToCenterDistance * CameraNormalizeVector.z
	),
	lookAtPosition: new THREE.Vector3(0, 0, 0),
	
	earthToSunDistance: EarthToSunDistance,

	planets: {
        Sun: {
            radius: SunRadius,
            center: SunPosition,
            initPosition: SunPosition,
        },
        Mercury: {
            radius: MercuryRadius,
            center: SunPosition,
            initPosition: new THREE.Vector3(0, 0, MercuryToSunDistance),
            orbitalPeriod: 88.0 * 24 * 60 * 1000,
            inclination: 7.0,
            rotationPeriod: 1407.6 * 60 * 1000,
            obliquity: 0.034,
            trackWidth,
        },
        Venus: {
            radius: VenusRadius,
            center: SunPosition,
            initPosition: new THREE.Vector3(0, 0, VenusToSunDistance),
            orbitalPeriod: 224.7 * 24 * 60 * 1000,
            inclination: 3.4,
            rotationPeriod: -5832.5 * 60 * 1000,
            obliquity: 177.4,
            trackWidth,
        },
        Earth: {
            radius: EarthRadius,
            center: SunPosition,
            initPosition: new THREE.Vector3(0, 0, EarthToSunDistance),
            orbitalPeriod: 365.2 * 24 * 60 * 1000,
            inclination: 0.0,
            rotationPeriod: 23.9 * 60 * 1000,
            obliquity: 23.4,
            trackWidth,
        },
        Moon: {
            radius: MoonRadius,
            center: new THREE.Vector3(0, 0, EarthToSunDistance), // 地球的中心 变化的 Function
            initPosition: new THREE.Vector3(0, 0, EarthToSunDistance + MoonToEarthDistance),
            orbitalPeriod: 27.32 * 24 * 60 * 1000,
            inclination: 5.1,
            rotationPeriod: 655.7 * 60 * 1000,
            obliquity: 6.7,
            trackWidth,
        },
        Mars: {
            radius: MarsRadius,
            center: SunPosition,
            initPosition: new THREE.Vector3(0, 0, MarsToSunDistance),
            orbitalPeriod: 687.0 * 24 * 60 * 1000,
            inclination: 1.9,
            rotationPeriod: 24.6 * 60 * 1000,
            obliquity: 25.2,
            trackWidth,
        },
        Jupiter: {
            radius: JupiterRadius,
            center: SunPosition,
            initPosition: new THREE.Vector3(0, 0, JupiterToSunDistance),
            orbitalPeriod: 4331 * 24 * 60 * 1000,
            inclination: 1.3,
            rotationPeriod: 9.9 * 60 * 1000,
            obliquity: 3.1,
            trackWidth,
        },
        Saturn: {
            radius: SaturnRadius,
            center: SunPosition,
            initPosition: new THREE.Vector3(0, 0, SaturnToSunDistance),
            orbitalPeriod: 10747 * 24 * 60 * 1000,
            inclination: 2.5,
            rotationPeriod: 10.7 * 60 * 1000,
            obliquity: 26.7,
            trackWidth,
        },
        Uranus: {
            radius: UranusRadius,
            center: SunPosition,
            initPosition: new THREE.Vector3(0, 0, UranusToSunDistance),
            orbitalPeriod: 30589 * 24 * 60 * 1000,
            inclination: 0.8,
            rotationPeriod: -17.2 * 60 * 1000,
            obliquity: 97.8,
            trackWidth,
        },
        Neptune: {
            radius: NeptuneRadius,
            center: SunPosition,
            initPosition: new THREE.Vector3(0, 0, NeptuneToSunDistance),
            orbitalPeriod: 59800 * 24 * 60 * 1000,
            inclination: 1.8,
            rotationPeriod: 16.1 * 60 * 1000,
            obliquity: 28.3,
            trackWidth,
        },
        Pluto: {
            radius: PlutoRadius,
            center: SunPosition,
            initPosition: new THREE.Vector3(0, 0, PlutoToSunDistance),
            orbitalPeriod: 90560 * 24 * 60 * 1000,
            inclination: 17.2,
            rotationPeriod: -153.3 * 60 * 1000,
            obliquity: 122.5,
            trackWidth,
        },
    },

	controlsList,
	defaultControls,
	periodScaleGenerator,
	periodScale,

	ChinaSynchronousMoonVector,
}