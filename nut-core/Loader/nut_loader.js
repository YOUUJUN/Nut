const fs = require('fs');
const Path = require('path');

const FileLoader = require('./file_loader');


class NutLoader {

    constructor(options){
        this.options = options;

        this.app = this.options.app;

    }


    loadToApp (directory, property, options){
        const cursor = this.app[property] = {};
        options = Object.assign({},{
            directory : directory,
            cursor : cursor,
            inject : this.app
        } , options);

        new FileLoader(options).load();
    }

    get FileLoader(){
        return FileLoader;
    }

}


const loaders = [
    require('./mixin/controller'),
];

for(let loader of loaders){
    Object.assign(NutLoader.prototype, loader);
}

module.exports = NutLoader;

