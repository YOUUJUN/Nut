const Path = require('path');

const originalPrototypes = {
    request: require('koa/lib/request'),
    response: require('koa/lib/response'),
    context: require('koa/lib/context'),
    application: require('koa/lib/application'),
};


module.exports = {

    loadContextExtend(){
        this.loadExtend('context', this.app.context);
    },

    loadHelperExtend(){
        console.log('this,',this);
        console.log('----->',this.app.Helper);
        if(this.app && this.app.Helper){
            this.loadExtend('helper', this.app.Helper.prototype);
        }
    },

    loadExtend(name, proto){
        const filePaths = this.getExtendFilePaths(name);
        console.log('filePaths', filePaths);
        for(let filePath of filePaths){
            filePath += `.js`;

            filePath = this.resolveModule(filePath);
            console.log('filepath===>+', filePath);
            if (!filePath) {
                continue;
            }

            console.log('filePath', filePath);
            const ext = this.requireFile(filePath);
            console.log('ext', ext);
            const properties = Object.getOwnPropertyNames(ext);

            const mergeRecord = new Map();
            for(let property of properties){
                if(mergeRecord.has(property)){

                }

                //Copy descriptor
                let descriptor = Object.getOwnPropertyDescriptor(ext, property);
                let originalDescriptor = Object.getOwnPropertyDescriptor(proto, property);
                console.log('originalDescriptor', originalDescriptor);

                if(!originalDescriptor){
                    const originalProto = originalPrototypes[name];
                    if (originalProto) {
                        originalDescriptor = Object.getOwnPropertyDescriptor(originalProto, property);
                    }
                }
                if(originalDescriptor){
                    descriptor = Object.assign({}, descriptor);
                    if(!descriptor.set && originalDescriptor.set){
                        descriptor.set = originalDescriptor.set;
                    }
                    if(!descriptor.get && originalDescriptor.get){
                        descriptor.get = originalDescriptor.get;
                    }
                }

                Object.defineProperty(proto, property, descriptor);
                mergeRecord.set(property, filePath)
            }
        }

    },


    getExtendFilePaths(name) {
        let paths = [];
        let staticPath = Path.join(this.baseDir, 'nut-core/extend', name);
        let customPath = Path.join(this.baseDir, 'app/extend', name);
        paths.push(staticPath, customPath);
        return paths;
    },

}
