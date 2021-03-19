const Path = require('path');
const Controller = require(Path.join(process.cwd(), 'nut-core')).Controller;

const os = require('os');

class HomeController extends Controller{

    async index (ctx, next){
        console.log("this from home.js=====>",this);
        let service = ctx.service;
        console.log('service from home.js===>',service);
        next();

        ctx.body = await service.home.sayHi();

    }

    async index2 (){
        console.log("say hi from homeJS22");

    }
}

module.exports = HomeController;
