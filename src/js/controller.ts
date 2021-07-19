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