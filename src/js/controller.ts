export default class Controller {
    static preTimeStamp: number  = 0; // 即自转和公转都是从时间0起始点开始的
    static timeInterval: number = Date.now();
    static timeStamp: number = Date.now();

    static update(): void {
        Controller.preTimeStamp = Controller.timeStamp;
        Controller.timeStamp = Date.now();
        Controller.timeInterval = Controller.timeStamp - Controller.preTimeStamp;
        // 保证Controller更新的时候在最后调用
        // 为了保持 Controller.timeStamp, Controller.timeInterval 引起的自转差异，必须保持Controller在最后更新
        // 维持一致性
    }    
}