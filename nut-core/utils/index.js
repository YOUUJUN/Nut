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

    isClass : ifClass,

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
    }

};
