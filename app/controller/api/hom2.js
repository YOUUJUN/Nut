const Path = require('path');
const Controller = require(Path.join(process.cwd(), 'nut-core')).Controller;

class HomeController2  extends Controller{

    hi (){
        console.log("say hi from hom2");
    }
}
