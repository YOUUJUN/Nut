const Controller = require('../../nut/').Controller;
console.log("Controller======>",typeof Controller);
class HomeController extends Controller{

    async index (ctx, next){
        console.log("say hi from homeJS",ctx, next);
    }

    async index2 (){
        console.log("say hi from homeJS2");

    }
}

module.exports = HomeController;
