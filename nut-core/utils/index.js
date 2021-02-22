const fs = require('fs');
const Path = require('path');

const ifClass = require('./is-class');

const BuiltinModule = require('module');
// Guard against poorly mocked module constructors.
const Module = module.constructor.length > 1
    ? module.constructor
    /* istanbul ignore next */
    : BuiltinModule;


module.exports = {

    loadFile (filepath){

        try{
            const extname = Path.extname(filepath);
            if(extname && !Module._extensions[extname]){
                return fs.readFileSync(filepath);
            }

            const obj = require(filepath);

            if(!obj){  //我就不懂了这句是啥意思...
                return obj;
            }

            if(obj.__esModule){   //如果是es module;
                return 'default' in obj ? obj.default : obj;
            }
            return obj;

        }catch(err){
            err.message = `load file: ${filepath}, error: ${err.message}`;
            throw err;
        }

    },

    //获取函数参数名，返回数组 function f(params){}  ===>  ['params']
    getParamNames(func, cache) {
        var type = typeof func;

        cache = cache !== false;
        if (cache && func.__cache_names) {
            return func.__cache_names;
        }
        var str = func.toString();
        var names = str.slice(str.indexOf('(') + 1, str.indexOf(')')).match(/([^\s,]+)/g) || [];
        func.__cache_names = names;
        return names;
    },


    isClass : ifClass,

    isObject(arg) {
        return typeof arg === 'object' && arg !== null;
    },

    isFunction(root){
        return (typeof root === 'function');
    },


    isGeneratorFunction(obj) {
        return obj
            && obj.constructor
            && 'GeneratorFunction' === obj.constructor.name;
    },

    isAsyncFunction (obj) {
        return obj
            && obj.constructor
            && 'AsyncFunction' === obj.constructor.name;
    },

    //判断是否为简单类型
    isPrimitive(arg){
        return arg === null ||
            typeof arg === 'boolean' ||
            typeof arg === 'number' ||
            typeof arg === 'string' ||
            typeof arg === 'symbol' ||
            typeof arg === 'undefined';
    }



};
