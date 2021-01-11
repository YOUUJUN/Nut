const Path = require("path");
const utils = require('../../utils');

const FULLPATH = require('../file_loader').FULLPATH;

module.exports = {

    loadController(options){

        options = Object.assign({},{
            directory : Path.join(this.options.baseDir, 'app/controller'),
            initializer : (obj, options) => {

                console.log("path from controller ====>",utils.isClass(obj));
                if(utils.isClass(obj)){
                    console.log('did we actually in already ????');
                    obj.prototype.pathName = options.pathName;
                    obj.prototype.fullPath = options.path;
                    return wrapClass(obj);
                }

            }
        } , options);

        const controllerBase = options.directory;

        this.loadToApp(controllerBase, 'controller', options);
    }

};


function wrapClass(Controller) {
    let proto = Controller.prototype;
    const ret = {};

    let keys = Object.getOwnPropertyNames(proto);

    for(let key of keys){

        if(key === 'constructor'){  //Object.getOwnPropertyNames 会返回constructor, 忽略;
            continue;
        }

        let definer = Object.getOwnPropertyDescriptor(proto, key);  //获取对象属性定义 就好像返回Object.defineProperty()的参数;

        if(utils.isFunction(definer.value) && !ret.hasOwnProperty(key)){    //判断definer是否有value属性，且是否为function.  可知属性是否为getter setter nonfunction
            ret[key] = methodToMiddleware(Controller, key);
            ret[key][FULLPATH] = Controller.prototype.fullPath + '#' + Controller.name + '.' + key + '()';
        }
    }

    return ret;


    function methodToMiddleware(Controller, key) {

        return function classControllerMiddleware(...args) {
            const controller = new Controller(this);

            return callFn(controller[key], args, controller);
        }

    }
}



async function callFn(fn, args = [], ctx) {
    if(!utils.isFunction(fn)){
        return;
    }

    if(!utils.isGeneratorFunction(fn)){
        console.warn("fn is not a generatorFunction");
    }

    return ctx ? fn.call(ctx, ...args) : fn(...args);
}

















