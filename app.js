const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('./middlewares/router');
const history = require('koa2-history-api-fallback');
const session = require('koa-session');
const jwt = require("jsonwebtoken");
const TOKENSECRET = require("./config/tokensecret");
const initializer = require("./middlewares/init");
const loader = require("./middlewares/loader");


initializer(app);
// app.use(loader);


/*---登录状态检测中间件---*/
app.use( async (ctx, next) =>{
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
// onerror(app);

// middlewares
// app.use(bodyparser());
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());

app.use( async (ctx, next) =>{
  ctx.set("Access-Control-Allow-Origin","http://localhost:8080");

  ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, accesstoken");

  ctx.set("Access-Control-Allow-Credentials", true);
  await next();
});


router(app);

// app.use(require('koa-static')(__dirname + '/database/expose'));
app.use(require('koa-static')(__dirname + '/views'));
app.use(require('koa-static')(__dirname + '/vue-public'));

//添加ejs模板并修改模板后缀为html
// app.use(views(__dirname + '/vue-dist', {
//   map : {html:'ejs'}
// }));



// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
