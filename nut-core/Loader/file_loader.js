const Path = require("path");
const fs = require("fs");

const globby = require('globby/index');

const utils = require('../utils');

const FULLPATH = Symbol('NUT_LOADER_ITEM_FULLPATH');
const EXPORTS = Symbol('NUT_LOADER_ITEM_EXPORTS');

const defaults = {
    directory : null,
    cursor : null,
    inject : null
};

class FileLoader {

    constructor (options){

        this.options = Object.assign({}, defaults, options);

        // app[options.callName] = this.load();
    }

    load(){
        let items = this.parse();
        let cursor = this.options.cursor;

        for(let item of items){
            let obj = {};
            item.properties.reduce((cursor, property, index, arr)=>{
                const properties = item.properties.slice(0, index + 1).join('.');

                if(index === item.properties.length - 1){
                    obj = item.exports;
                    if (obj) {
                        obj[FULLPATH] = item.fullPath;
                        obj[EXPORTS] = true;
                    }
                }else{
                    obj = cursor[property] || {};
                }

                cursor[property] = obj;
                return obj;
            },cursor)
        }

        return cursor;
    }



    parse (){
        let directories = this.options.directory;

        if(!Array.isArray(directories)){
            directories = [directories];
        }

        let items = [];


        for(let directory of directories){

            let filepaths = globby.sync('**/*.js',{cwd : directory});

            for(let filePath of filepaths){
                let fullPath = Path.join(directory,filePath);

                if (!fs.statSync(fullPath).isFile()) continue;

                let properties = defaultCamelize(filePath,"camel");

                const pathName = directory.split(/[/\\]/).slice(-1) + '.' + properties.join('.');

                let exports = getExports(fullPath, this.options, pathName);

                console.log('so what is the exports anyway',exports);

                // let name = Path.basename(filePath,".js");

                items.push({fullPath,properties,exports});
            }

        }

        console.log("items====>",items);

        return items;
    }

}


module.exports = FileLoader;
module.exports.EXPORTS = EXPORTS;
module.exports.FULLPATH = FULLPATH;

function getExports(fullPath, {initializer, inject}, pathName) {
    console.log('into the  getExports ---------------->');
    let exports = utils.loadFile(fullPath);
    console.log('well-----------------------ok--0',fullPath, exports);
    if(initializer){
        exports = initializer(exports, {path : fullPath, pathName});
        console.log('well-----------------------ok', typeof exports);
    }

    if (utils.isClass(exports) || utils.isGeneratorFunction(exports) || utils.isAsyncFunction(exports)) {   //这个判断永远不会执行...
        console.log("---------------------------------well this is wild------------------------------------");
        return exports;
    }

    if(utils.isFunction(exports)){
        exports = exports(inject);
        console.log("exports---->",typeof exports);
        if (exports != null) {

            console.log("exports from file-loader=====>",typeof exports);
            return exports;
        }
    }

    return exports;

}




function defaultCamelize(filepath, caseStyle) {
    const properties = filepath.substring(0, filepath.lastIndexOf('.')).split('/');
    return properties.map(property => {
        if (!/^[a-z][a-z0-9_-]*$/i.test(property)) {
            throw new Error(`${property} is not match 'a-z0-9_-' in ${filepath}`);
        }

        // use default camelize, will capitalize the first letter
        // foo_bar.js > FooBar
        // fooBar.js  > FooBar
        // FooBar.js  > FooBar
        // FooBar.js  > FooBar
        // FooBar.js  > fooBar (if lowercaseFirst is true)
        property = property.replace(/[_-][a-z]/ig, s => s.substring(1).toUpperCase());
        let first = property[0];
        switch (caseStyle) {
            case 'lower':
                first = first.toLowerCase();
                break;
            case 'upper':
                first = first.toUpperCase();
                break;
            case 'camel':
            default:
        }
        return first + property.substring(1);
    });
}
