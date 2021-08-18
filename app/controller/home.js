const Path = require('path');
const Controller = require(Path.join(process.cwd(), 'nut-core')).Controller;

const os = require('os');

class HomeController extends Controller{

    async index (ctx, next){
        // console.log("this from home.js=====>",this);
        // let service = ctx.service;
        // console.log('service from home.js===>',service);
        console.log('-----1');
        await next();
        console.log('-----3');
        // ctx.body = await service.home.sayHi();
        ctx.body = 'ok';

    }

    async index2 (ctx, next){
        // console.log("say hi from homeJS22", module);
        console.log('-----2');
        await next();
        console.log('-----4');
    }


    async test(ctx, next){
        console.log('ctx', ctx);
        await next();

        ctx.body = 'test done';
    }
}

module.exports = HomeController;
