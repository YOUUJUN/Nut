const Path = require("path");
const fs = require("fs");

const Loader = require("./loader");


const loader_config = require("../config/loader_config");

console.log("now we are get in to engine");


module.exports = {

    start (app){
        this.actLoader(app, loader_config.basic);

    },

    actLoader(app, config){

        for(let item in config){
            let options = {
                directory : config[item].folder,
                callName : config[item].name,
                app : app
            };

            new Loader(options);
        }

    }

}
