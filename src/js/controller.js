const Controller = {
    timeStamp: Date.now(),
}

function update() {
    Controller.timeStamp = Date.now();
}

Controller.update = update;

export default Controller;