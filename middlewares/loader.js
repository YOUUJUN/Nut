const Path = require("path");
const fsPromise = require("fs").promises;

const init_config = require("../config/init_config");

module.exports = async (ctx, next) => {
    const loader = async (module) => {
        let F = function(){};
        async function traverse(path) {
            // Object.defineProperty(app,module.name,{
            //
            // });

            let files = await fsPromise.readdir(path);

            for(let item of files){
                let filePath = Path.join(path,item);
                let stat = await fsPromise.stat(filePath);
                let name = Path.basename(item,".js");
                if(stat.isDirectory()){
                    await traverse(filePath);
                }else{
                    console.log("filePath ====>",filePath);
                    console.log("module.folder",module.folder);
                    let property = filePath.replace(module.folder,"").replace(".js","").split(/[/\\]/).join(".");
                    console.log("properties ====>",property);
                    F.prototype[property] = require(filePath);
                }
            }
        }

        await traverse(module.folder);

        console.log("F======>",F.prototype);
        console.log("module.name",module.name);
        Object.defineProperty(ctx.app,module.name,{
            value : new F
        });

        console.log("app =====>init===>",ctx.app.$controller);
    };

    for(let item of init_config.loader){
        await loader(item);
    }

    await next();
};
