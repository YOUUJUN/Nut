const Path = require('path');
const Controller = require(Path.join(process.cwd(), 'nut-core')).Controller;

class HomeController extends Controller{

    async indexPage(ctx, next){
        let service = ctx.service;
        console.log('somebody just visit home page!');

        ctx.helper.helloLa();
        await next();

        ctx.body = await service.home.readPages('test.html');
    }


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

}

module.exports = HomeController;
