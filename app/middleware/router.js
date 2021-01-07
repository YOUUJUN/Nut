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
    const controller = app.$controller;
    console.log("controller==========>ok1",app);
    console.log("service==========>ok",app.$service);
    console.log("model==========>ok",app.$model);

    // router.get('/',controller.home.index);

    app.use(router.routes())
        .use(router.allowedMethods());
};
