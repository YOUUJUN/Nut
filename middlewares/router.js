const router = require('koa-router')();
const homeController = require('../controller/home');

const uuid = require("uuid");
const Path = require("path");
const busboy = require('koa-busboy');

//format 表单提交
const uploader = busboy({
    dest: Path.join(__dirname,"../database/cache"), // default is system temp folder (`os.tmpdir()`)
    fnDestFilename: (fieldname, filename) => uuid.v1() + filename
});

module.exports = (app) => {
    console.log("app ======>in router=====>",app);
    router.get('/',app.$controller.home.index);

    app.use(router.routes())
        .use(router.allowedMethods());
};
