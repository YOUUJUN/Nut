const router = require('koa-router')();

const uuid = require("uuid");
const Path = require("path");
const busboy = require('koa-busboy');

//format 表单提交
const uploader = busboy({
    dest: Path.join(__dirname,"../database/cache"), // default is system temp folder (`os.tmpdir()`)
    fnDestFilename: (fieldname, filename) => uuid.v1() + filename
});

module.exports = (app) => {
    const {controller} = app;

    router.get('/', controller.home.indexPage);

    router.get('/hello',controller.api.index.sayWell, controller.home.index2);

    router.get('/ok',controller.home.index,controller.home.index2);

    // router.get('/home',controller.api.home2.hi);

    app.use(router.routes())
        .use(router.allowedMethods());
};
