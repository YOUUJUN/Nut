const Path = require('path');

module.exports = {

    loadHelperExtend(){
        if(this.app && this.app.Helper){
            this.loadExtend('helper', this.app.Helper.prototype);
        }
    },

    loadExtend(name, proto){
        const filePath = Path.join(this.baseDir, 'app/extend/helper.js');
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

            }else{
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

}
