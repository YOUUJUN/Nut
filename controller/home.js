module.exports = {
    index (ctx, next) {

        console.log("service=====>",ctx.app.$service.home.said);

        ctx.body = "stupid";
        // next();
        // console.log("well");
    },

    hi : "hi"
};
