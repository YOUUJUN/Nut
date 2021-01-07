
class ContextClass{

    constructor (ctx){

        this.ctx = ctx;

        this.app = ctx.app;

        this.config = ctx.app.config;

        this.service = ctx.service;

    }


}


module.exports = ContextClass;
