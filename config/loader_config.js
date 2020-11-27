const Path = require("path");

module.exports = {
    basic : {
        controller : {
            folder: Path.join(__dirname, '../controller/'),
            name: '$controller'
        },

        service : {
            folder: Path.join(__dirname, '../service/'),
            name: '$service'
        },

        model : {
            folder: Path.join(__dirname, '../model/'),
            name: '$model'
        }
    },

    extra : {
        tools : {
            folder: Path.join(__dirname, '../helps/'),
            name: '$tools'
        }
    }
};
