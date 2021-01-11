module.exports = {
    async sayWell (ctx, next){
        console.log("well, I am saying hi now",ctx);
        await next();
        console.log("well, I am saying hi like final");
    }
}
