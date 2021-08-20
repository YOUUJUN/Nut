const fs = require("fs");
const fsPromises = require('fs').promises;
const Path = require("path");

module.exports = {

    async readPages (fileName){
        let readPath = Path.join(__dirname,"../../vue-pages/",fileName);
        let content = await fsPromises.readFile(readPath);
        return content.toString("utf-8");
    }

};
