const Path = require("path");
const fs = require("fs");

const globby = require('globby');

class Loader {

    constructor (options){
        this.options = options;
        console.log("options",this.options);
        let app = options.app;

        app[options.callName] = this.load();
    }

    load(){
        let items = this.parse();
        let cache = {};

        for(let item of items){
            let obj = {};
            item.properties.reduce((cache, property, index, arr)=>{
                const properties = item.properties.slice(0, index + 1).join('.');
                console.log("prper",properties);

                if(index === item.properties.length - 1){
                    obj = item.exports;
                    if (obj) {
                        let FULLPATH = Symbol.for("FULLPATH");
                        let EXPORTS = Symbol.for("EXPORTS");
                        obj[FULLPATH] = item.fullPath;
                        obj[EXPORTS] = true;
                    }
                }else{
                    obj = cache[property] || {};
                }

                cache[property] = obj;
                return obj;
            },cache)
        }

        console.log("cache ====>",cache);
        return cache;

    }



    parse (){
        let directory = this.options.directory;

        let arr = [];

        // let filepaths = fs.readdirSync(directory);
        let filepaths = globby.sync('**/*.js',{cwd : directory});

        console.log("filepaths",filepaths);

        for(let filePath of filepaths){
            let fullPath = Path.join(directory,filePath);
            // if (!fs.lstatSync(fullPath).isFile()) continue;

            if (!fs.statSync(fullPath).isFile()) continue;

            let properties = defaultCamelize(filePath,"camel");

            let exports = require(fullPath);

            let name = Path.basename(filePath,".js");

            arr.push({fullPath,properties,exports});
        }

        console.log("arr====>",arr);

        return arr;
    }

}


module.exports = Loader;



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
