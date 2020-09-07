const Path = require("path");
// const fsPromise = require("fs").promises;
const fs = require("fs");

const init_config = require("../config/init_config");

module.exports = async (app) => {
    if(app.$contraller){
        await next();
    }

    console.log("ok---------ye");
    const loader = async (module) => {
        console.log("in loader");
        let F = function(){};
        function traverse(path) {
            console.log("in traverse");

            /*--异步写法   执行在router.js之后？--*/
            // let files = await fsPromise.readdir(path);
            //
            // for(let item of files){
            //     let filePath = Path.join(path,item);
            //     let stat = await fsPromise.stat(filePath);
            //     let name = Path.basename(item,".js");
            //     if(stat.isDirectory()){
            //         await traverse(filePath);
            //     }else{
            //         console.log("filePath ====>",filePath);
            //         console.log("module.folder",module.folder);
            //         let property = filePath.replace(module.folder,"").replace(".js","").split(/[/\\]/).join(".");
            //         console.log("properties ====>",property);
            //         F.prototype[property] = require(filePath);
            //     }
            // }

            /*--同步写法--*/
            let files = fs.readdirSync(path);

            for(let item of files){
                let filePath = Path.join(path,item);
                let stat = fs.lstatSync(filePath);
                let name = Path.basename(item,".js");
                if(stat.isDirectory()){
                    traverse(filePath);
                }else{
                    console.log("filePath ====>",filePath);
                    console.log("module.folder",module.folder);
                    let property = filePath.replace(module.folder,"").replace(".js","").split(/[/\\]/).join(".");
                    console.log("properties ====>",property);
                    F.prototype[property] = require(filePath);
                }
            }
        }

        traverse(module.folder);

        console.log("F======>",F.prototype);
        console.log("module.name",module.name);
        Object.defineProperty(app,module.name,{
            value : new F
        });

        console.log("app =====>init===>",app.$controller);
    };

    for(let item of init_config.loader){
        console.log("good");
        await loader(item);
    }
};
