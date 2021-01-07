const fs = require('fs');
const KoaApplication = require('koa');
const ContextClass = require('./utils/context_class');

const NUT_LOADER = Symbol.for('NUT_LOADER');

console.log("KoaApplication====>",typeof KoaApplication);
class NutCore extends KoaApplication{

    constructor (options = {}){
        options.baseDir = options.baseDir || process.cwd(),

        super();

        this.options = options;

        this.ContextClass = ContextClass;

        const Controller = this.ContextClass;
        const Service = this.ContextClass;
        const Loader = this[NUT_LOADER];

        this.Controller = Controller;
        this.Service = Service;

        this.loader = new Loader({
            baseDir : options.baseDir,
            app : this
        })

    }


    get [NUT_LOADER](){
        return require('./Loader/nut_loader');
    }
}


module.exports = NutCore;


