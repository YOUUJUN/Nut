const Path = require("path");

module.exports = {
    loader : [
        {
            folder: Path.join(__dirname, '../controller/'),
            name: '$controller'
        },
        // {
        //     folder: Path.join(__dirname, '../service/'),
        //     name: '$service'
        // }
    ]
}
