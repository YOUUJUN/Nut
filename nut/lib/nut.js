const NutCore = require('../../nut-core').NutCore;

class Nut extends NutCore{

    constructor(options = {}){

        super(options);

        this.init();
    }

    init () {
        console.log('\x1B[32m','loading controller now.............');
        this.loader.loadController();
    }
}

module.exports = Nut;


