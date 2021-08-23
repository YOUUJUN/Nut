/**
 * 请求频率限制中间件
 *
 *
 */

const ratelimit = require('koa-ratelimit');
const rateLimitDB = new Map();

module.exports = (nut) => {

    nut.use(ratelimit({
        driver: 'memory',
        db: rateLimitDB,
        duration: 10000,
        errorMessage: 'Sometimes You Just Have to Slow Down.',
        id: (ctx) => ctx.ip,
        headers: {
            remaining: 'Rate-Limit-Remaining',
            reset: 'Rate-Limit-Reset',
            total: 'Rate-Limit-Total'
        },
        max: 40,
        disableHeader: true,
        whitelist: (ctx) => {
            // some logic that returns a boolean
        },
        blacklist: (ctx) => {
            // some logic that returns a boolean
        }
    }))

};
