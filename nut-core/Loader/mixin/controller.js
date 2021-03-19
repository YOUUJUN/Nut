const Path = require("path");
const utils = require('../../utils');

const FULLPATH = require('../file_loader').FULLPATH;

module.exports = {

    loadController(options){

        options = Object.assign({},{
            directory : Path.join(this.options.baseDir, 'app/controller'),

            //在file_loader.js运行时调用，获取JS文件module.exports的暴露内容，根据输出格式使用不同初始化方法；
            initializer : (obj, options) => {

                //如果controller是 class extends 写法;
                if(utils.isClass(obj)){
                    obj.prototype.pathName = options.pathName;
                    obj.prototype.fullPath = options.path;
                    return wrapClass(obj);
                }

                //如果controller是 module.exports = {...}写法;
                if(utils.isObject(obj)){
                    return wrapObject(obj);
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


function wrapObject(Controller, path, prefix){
    const keys = Object.keys(Controller);
    const ret = {};

    for(let key of keys){
        if(utils.isFunction(Controller[key])){
            const names = utils.getParamNames(key);

            ret[key] = functionToMiddleware(Controller[key]);
            ret[key][FULLPATH] = `${path}#${prefix || ''}${key}()`;
        }else if(utils.isObject(Controller[key])){
            ret[key] = wrapObject(Controller[key], path, `${prefix || ''}${key}.`);
        }
    }

    return ret;

    function functionToMiddleware(func) {

        const objectControllerMiddleware = async (...args) =>{
            return await callFn(func, args, this);
        };

        for(let key in func){
            objectControllerMiddleware[key] = func[key];
        }

        return objectControllerMiddleware;
    }
}



async function callFn(fn, args = [], ctx) {
    if(!utils.isFunction(fn)){
        return;
    }

    if(!utils.isGeneratorFunction(fn)){
        // console.warn("fn is not a generatorFunction");
    }

    return ctx ? fn.call(ctx, ...args) : fn(...args);
}

















