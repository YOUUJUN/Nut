const fsPromises = require("fs").promises;
const Path = require('path');
const Service = require(Path.join(process.cwd(), 'nut-core')).Service;
class HomeService extends Service{

    async readPages (fileName){
        let readPath = Path.join(__dirname,"../../vue-pages/",fileName);
        let content = await fsPromises.readFile(readPath);
        return content.toString("utf-8");
    }


    async sayHi(){
        console.log('this from service ===>',this);
        return this.well();
    }

    well (){
        console.log('this from service home.js===>',this);
        return this.foo();
    }

    foo (){
        return 'foo';
    }

}

module.exports = HomeService;
