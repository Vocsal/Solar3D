export default class Controller {
    static preTimeStamp: number  = Date.now();
    static timeStamp: number = Date.now();
    static timeInterval: number = 0;

    static update(): void {
        Controller.preTimeStamp = Controller.timeStamp;
        Controller.timeStamp = Date.now();
        Controller.timeInterval = Controller.timeStamp - Controller.preTimeStamp;
    }    
}

// import * as THREE from 'three';

// const Base = Date.now();
// const Clock = new THREE.Clock();
// Clock.start();

// export default class Controller {
//     static preTimeStamp: number  = Base + Clock.oldTime * 1000;
//     static timeStamp: number = Base + Clock.startTime * 1000;
//     static timeInterval: number = Clock.getDelta() * 1000;

//     static update(): void {
//         const delta = Clock.getDelta();
//         Controller.preTimeStamp = Controller.timeStamp;
//         Controller.timeStamp += delta * 1000;
//         Controller.timeInterval = delta * 1000;
//     }
// }