const Path = require('path');
const Controller = require(Path.join(process.cwd(), 'nut')).Controller;

const os = require('os');

class HomeController extends Controller{

    async index (ctx, next){
        console.log("this from home.js=====>",this);
        console.log("Process ===>", process.cwd());
        console.log("Process ===>", process.platform);
        console.log("cpus ===>", os.cpus());
        let service = ctx.service;
        next();
        console.log("say halo from inex final", service.home);

        ctx.body = service.home.sayHi();
    }

    async index2 (){
        console.log("say hi from homeJS22");

    }
}

module.exports = HomeController;
