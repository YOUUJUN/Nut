const fs = require('fs');
const Path = require('path');

const FileLoader = require('./file_loader');
const ContextLoader = require('./context_loader');


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


    loadToContext(directory, property, options){
        options = Object.assign({}, {
            directory,
            property,
            inject : this.app
        },options);

        new ContextLoader(options).load();  //执行从file_loader继承来的loader();加载service模块
    }


    get FileLoader(){
        return FileLoader;
    }

}


const loaders = [
    require('./mixin/controller'),
    require('./mixin/service'),
];

for(let loader of loaders){
    Object.assign(NutLoader.prototype, loader);
}

module.exports = NutLoader;

