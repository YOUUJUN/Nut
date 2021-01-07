const NutCore = require('./nut');

console.log("NutCore===>", typeof NutCore);

class Nut extends NutCore{

    constructor(options = {}){

        super(options);

        this.init();
    }

    init () {
        this.loader.loadController();
    }
}

module.exports = Nut;


