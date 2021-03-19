const Nut = require('./nut-core/').NutCore;
const nut = new Nut();
// const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('./app/middleware/router');
// const history = require('koa2-history-api-fallback');
const session = require('koa-session');
const jwt = require("jsonwebtoken");
const TOKENSECRET = require("./config/tokensecret");


/*---登录状态检测中间件---*/
nut.use( async (ctx, next) =>{
  if(ctx.url.match(/^\/community/) || ctx.url.match(/^\/personal/) || ctx.url.match(/^\/users/) || ctx.url.match(/^\/editor/) || ctx.url.match(/^\/offline/)){
    let cookie = ctx.cookies.get("marscript");
    let token = ctx.request.header.accesstoken || cookie || "";
    const page_user = require("./utils/pages/user");
    let result = await page_user.verifyUserToken(token);
    ctx.state.logged = result;

  }
  await next();
});

// error handler
// onerror(nut);

// middlewares
// nut.use(bodyparser());
nut.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
nut.use(json());
nut.use(logger());

let allowOriginURL = (process.env.NODE_ENV !== 'production') ? "http://localhost:8081" : "";
nut.use( async (ctx, next) =>{
  ctx.set("Access-Control-Allow-Origin",allowOriginURL);

  ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, accesstoken");

  ctx.set("Access-Control-Allow-Credentials", true);
  await next();
});


// nut.use(require('koa-static')(__dirname + '/database/expose'));
nut.use(require('koa-static')(__dirname + '/app/plublic'));
nut.use(require('koa-static')(__dirname + '/vue-public'));

router(nut); //koa-router 应在koa-static下面注册，否则koa-router会根据静态路径多次match,影响性能

//添加ejs模板并修改模板后缀为html
// nut.use(views(__dirname + '/vue-public', {
//   map : {html:'ejs'}
// }));



// logger
nut.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error-handling
nut.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = nut;
