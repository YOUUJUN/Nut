const NutCore = require('../../nut-core').NutCore;

console.log("NutCore===>",NutCore);

class Nut extends NutCore{

    constructor(options = {}){

        super(options);

        this.init();
    }

    init () {
        this.loader.loadController();
    }
}

console.log("Nut",Nut);

module.exports = Nut;


