const Path = require('path');
const Service = require(Path.join(process.cwd(), 'nut-core')).Service;

const model = require('../model/home');

// module.exports = {
//     said : "well... just checkout the utils folder.. amigo"
// };

class HomeService extends Service{

    async sayHi(){
        console.log('this from service ===>',this);
        // try {
        //     await model.authenticate();
        //     // console.log('Connection has been established successfully.');
        // } catch (error) {
        //     console.error('Unable to connect to the database:', error);
        // }
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
