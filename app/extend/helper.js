const fs = require("fs");
const fsPromises = require('fs').promises;
const Path = require("path");


module.exports = {
    helloLa (){
        console.log('hellala from custom helper');
        return 'hello';
    },

    async readPages (fileName){
        let readPath = Path.join(__dirname,"../../vue-pages/",fileName);
        let content = await fsPromises.readFile(readPath);
        return content.toString("utf-8");
    },

    formatBytes (bytes) {
        if(bytes < 1024){
            return bytes + " Bytes";
        } else if(bytes < 1048576) {
            return(bytes / 1024).toFixed(3) + " KB";
        } else if(bytes < 1073741824){
            return(bytes / 1048576).toFixed(3) + " MB";
        } else{
            return(bytes / 1073741824).toFixed(3) + " GB";
        }
    },

    //better async func error capture;
    /*
    *
    * async function func() {
            let [err, res] = await errorCaptured(asyncFunc)
            if (err) {
                //... 错误捕获
            }
            //...
        }
    *
    *
    * */
    async errorCaptured(asyncFunc){
        try{
            let res = await asyncFunc();
            return [null,res];
        }catch (e) {
            return [e, null];
        }
    },

    saveAs(savePath,limitSize){
        const defaultSizeLimit = 5 * 1048576;
        let ctx = this.ctx;
        let file = ctx.request.files[0];

        let cacheFileState = fs.statSync(file.path);
        let size = cacheFileState.size;
        let sizeLimit = limitSize || defaultSizeLimit;
        if(size > sizeLimit){
            console.log("图片大小超过限制");
            return false;
        }

        let foarmatedSize = tools.formatBytes(size);


        let typeCache = file.mimetype.split("/");
        let fileType = typeCache[1];
        let randomFileName = Math.random().toString().concat(".",fileType);
        let finalPath = Path.join(savePath,randomFileName);

        let readStream = fs.createReadStream(file.path);
        let writeStream = fs.createWriteStream(finalPath);
        readStream.pipe(writeStream);

        return randomFileName;
    },


    /*
    * options : {
    *   path : "",
    *   name : "",
    *   content : ""
    * }
    *
    *
    * */
    saveDraft(options){
        const splitFixer = "@!@";
        let combineName = options.content.topic.concat(splitFixer,options.content.title,splitFixer,options.name);
        console.log("combineName======",combineName);
        let readStream = fs.createReadStream(options.content.content);
        let finalPath = Path.join(options.path,combineName);
        let writeStream = fs.createWriteStream(finalPath);
        console.log("writeStream-=-=-=-=",writeStream);
        readStream.pipe(writeStream);
        console.log("done");

        return finalPath;
    },


}
