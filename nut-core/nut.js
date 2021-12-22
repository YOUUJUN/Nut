/**
 * nut.js
 *
 * The Framework based on koa
 *
 * designed && written by YOUJUN
 *
 * */

const fs = require('fs');
const KoaApplication = require('koa');
const ContextClass = require('./utils/context_class');

const NUT_LOADER = Symbol.for('NUT_LOADER');
const HELPER = Symbol('Application#Helper');

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


        this.loader.loadApplicationExtend();
        this.loader.loadContextExtend();
        this.loader.loadHelperExtend();
        //加载控制层模块
        this.loader.loadController();
        //加载服务层模块
        this.loader.loadService();
        //加载sequelize model
        this.loader.loadModel();
    }


    get [NUT_LOADER](){
        return require('./Loader/nut_loader');
    }

    get Helper(){
        if(!this[HELPER]){
            /**
             * Define developers to extend Helper as ${baseDir}/app/extend/helper.js ,
             * then you can use all method on `ctx.helper` that is a instance of Helper.
             */
            class Helper extends this.ContextClass{}
            this[HELPER] = Helper;
        }

        return this[HELPER];
    }
}


module.exports = NutCore;


