const Path = require('path');

const originalPrototypes = {
    request: require('koa/lib/request'),
    response: require('koa/lib/response'),
    context: require('koa/lib/context'),
    application: require('koa/lib/application'),
};


module.exports = {

    loadApplicationExtend() {
        console.log('loading application====================>');
        this.loadExtend('application', this.app);
    },

    loadContextExtend(){
        this.loadExtend('context', this.app.context);
    },

    loadHelperExtend(){
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
            if (!filePath) {
                continue;
            }

            const ext = this.requireFile(filePath);
            const properties = Object.getOwnPropertyNames(ext);

            const mergeRecord = new Map();
            for(let property of properties){
                if(mergeRecord.has(property)){

                }

                //Copy descriptor
                let descriptor = Object.getOwnPropertyDescriptor(ext, property);
                let originalDescriptor = Object.getOwnPropertyDescriptor(proto, property);

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

                console.log('property====>', property, "filePath==>", filePath);
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
