export default class Controller {
    static preTimeStamp: number  = 0; // 即自转和公转都是从时间0起始点开始的
    static timeInterval: number = 0;
    static timeStamp: number = 0;

    static update(): void {
        Controller.preTimeStamp = Controller.timeStamp;
        Controller.timeStamp = Date.now();
        Controller.timeInterval = Controller.timeStamp - Controller.preTimeStamp;
        // 保证Controller更新的时候在最后调用
        // 为了保持 Controller.timeStamp, Controller.timeInterval 引起的自转差异，必须保持Controller在最前更新
        // 维持一致性
    }

    static reset(): void {
        Controller.preTimeStamp = 0;
        Controller.timeStamp = 0;
        Controller.timeInterval = 0;
    }
}