const Controller = require('../../nut/').Controller;

class HomeController extends Controller{

    async index (ctx, next){
        console.log("say hi from homeJS",ctx, next);
        next();
        console.log("say halo from inex final");
    }

    async index2 (){
        console.log("say hi from homeJS22");

    }
}

module.exports = HomeController;
