const fs = require('fs');
const Path = require('path');

const FileLoader = require('./file_loader');


class NutLoader {

    constructor(options){
        this.options = options;

        this.app = this.options.app;
    }


    loadToApp (directory, property, options){
        const cursor = this.app[property] = {};    //设置指针指向{controller, service}
        options = Object.assign({},{
            directory : directory,
            cursor : cursor,
            inject : this.app
        } , options);

        new FileLoader(options).load();   //设置指针初始化完成
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

