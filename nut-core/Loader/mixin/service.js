const Path = require('path');

module.exports = {

    loadService(options){

        options = Object.assign({
            fieldClass: 'serviceClasses',
            directory : Path.join(this.options.baseDir, 'app/service'),
        },options);
        const servicePaths = options.directory;

        this.loadToContext(servicePaths, 'service', options);
    }

}
