const Path = require('path');
const Service = require(Path.join(process.cwd(), 'nut-core')).Service;

class LoginService extends Service{

    async sayHi(){
        console.log("hi from login");
    }

}

module.exports = LoginService;
















