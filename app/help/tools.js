
class Tools{

    constructor(){

    }

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
    }

    //better async func error capture;
    async errorCaptured(asyncFunc){
        try{
            let res = await asyncFunc();
            return [null,res];
        }catch (e) {
            return [e, null];
        }
    }

}

module.exports = Tools;

