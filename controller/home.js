module.exports = {
    index (ctx, next) {
        console.log("ctx ==== >",ctx);

        console.log("ctx.app ==1111111111111111111==>",ctx.app.$controller.home.hi);

        ctx.body = "stupid";
        // next();
        // console.log("well");
    },

    hi : "hi"
};
