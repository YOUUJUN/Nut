const Path = require("path");
const fs = require("fs");

//globby 用来遍历目录，找到目录下所有的特定后缀文件(*.js),返回 (目录/文件.文件名的格式)
const globby = require('globby/index');

const utils = require('../utils');

const FULLPATH = Symbol('NUT_LOADER_ITEM_FULLPATH');
const EXPORTS = Symbol('NUT_LOADER_ITEM_EXPORTS');

const defaults = {
    directory : null,
    cursor : null,
    inject : null,
    caseStyle: 'camel',
    initializer: null,
    filter: null,
};

class FileLoader {


    /**
   * @class
   * @param {Object} options - options
   * @param {String|Array} options.directory - directories to be loaded
   * @param {Function} options.initializer - custom file exports, receive two parameters, first is the inject object(if not js file, will be content buffer), second is an `options` object that contain `path`
   * @param {Object} options.inject - an object that be the argument when invoke the function
   * @param {Function} options.filter - a function that filter the exports which can be loaded
   */

    constructor (options){

        this.options = Object.assign({}, defaults, options);
    }

    /**
     * attach items to target object. Mapping the directory to properties.
     * `app/controller/group/repository.js` => `target.group.repository`
     * @return {Object} target
     *
     */
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



    /**
     *
     * 解析给定的目录，返回一个包含目录下js模块路径，js模块包含的方法名，和模块的抛出指针
     *
     *
     * Parse files from given directories, then return an items list, each item contains properties and exports.
     *
     * For example, parse `app/controller/group/repository.js`
     *
     * ```
     * module.exports = app => {
     *   return class RepositoryController extends app.Controller {};
     * }
     * ```
     *
     * It returns a item
     *
     * ```
     * {
     *   properties: [ 'group', 'repository' ],
     *   exports: app => { ... },
     * }
     * ```
     *
     * `Properties` is an array that contains the directory of a filepath.
     *
     *
     * @return {Array} item
     */
    parse (){
        let directories = this.options.directory;

        if(!Array.isArray(directories)){
            directories = [directories];
        }


        const filter = utils.isFunction(this.options.filter) ? this.options.filter : null;
        let items = [];

        for(let directory of directories){

            let filepaths = globby.sync('**/*.js',{cwd : directory});

            for(let filePath of filepaths){
                let fullPath = Path.join(directory,filePath);

                if (!fs.statSync(fullPath).isFile()) continue;

                let properties = defaultCamelize(filePath, this.options.caseStyle);
                const pathName = directory.split(/[/\\]/).slice(-1) + '.' + properties.join('.');

                let exports = getExports(fullPath, this.options, pathName);

                // ignore exports when it's null or false returned by filter function
                if (exports == null || (filter && filter(exports) === false)) continue;

                items.push({fullPath,properties,exports});
            }

        }

        return items;
    }

}


module.exports = FileLoader;
module.exports.EXPORTS = EXPORTS;
module.exports.FULLPATH = FULLPATH;


//获取模块的暴露内容
function getExports(fullPath, {initializer, inject}, pathName) {
    let exports = utils.loadFile(fullPath);
    if(initializer){
        exports = initializer(exports, {path : fullPath, pathName});
        // console.log(fullPath,"inject from isObject judge!=====>");
    }

    if (utils.isClass(exports) || utils.isGeneratorFunction(exports) || utils.isAsyncFunction(exports)) {
        // console.log(fullPath,"inject from isClass judge!=====>");
        return exports;
    }

    if(utils.isFunction(exports)){
        // console.log(fullPath,"inject from isFunction judge!=====>");
        exports = exports(inject);
        if (exports != null) {
            return exports;
        }
    }

    return exports;

}



//驼峰化JS文件名 foo_bar.js > FooBar
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
