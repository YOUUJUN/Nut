const Path = require('path');
const Service = require(Path.join(process.cwd(), 'nut')).Service;

// module.exports = {
//     said : "well... just checkout the utils folder.. amigo"
// };

class HomeService extends Service{

    sayHi(){
        return 'hi from service';
    }

}

module.exports = HomeService;
