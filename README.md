# Nut.JS
### Web全栈开发框架
### 后台Koa,参考Egg内核的后端框架
### 前台Vue项目,基于VueCli配置的Vue多页面脚手架
## 项目目录：
      .
      |-- app  #后台代码目录 参考egg.js
      |   |-- controller  #Koa控制层，json接口返回数据，页面跳转 
      |   |   |-- api
      |   |   |   |-- api2
      |   |   |   |   `-- ok.js
      |   |   |   |-- hom2.js
      |   |   |   `-- index.js
      |   |   `-- home.js
      |   |-- help
      |   |   |-- common.js
      |   |   |-- tools.js
      |   |   `-- uploader.js
      |   |-- middleware  #路由层 控制路由
      |   |   `-- router.js
      |   |-- model #数据层model
      |   |   `-- home.js
      |   |-- plublic
      |   `-- service   #业务层 实现操作层controller的耦合封装
      |       |-- home.js
      |       `-- login.js
      |-- bin
      |   `-- www
      |-- config
      |   |-- mysql_config.js
      |   `-- tokensecret.js
      |-- database
      |   `-- mysql
      |       `-- query.js
      |-- logs
      |-- nut-core  #参考Egg.js内核编写的后台框架
      |   |-- Loader
      |   |   |-- context_loader.js
      |   |   |-- file_loader.js
      |   |   |-- mixin
      |   |   |   |-- controller.js
      |   |   |   `-- service.js
      |   |   `-- nut_loader.js
      |   |-- index.js
      |   |-- nut.js
      |   `-- utils
      |       |-- context_class.js
      |       |-- index.js
      |       `-- is-class.js
      |-- views
      |   |-- error.html
      |   `-- offline.html
      |-vue-pages #Vue打包后的html文件
      |-vue-public #Vue打包后的静态目录
      |-- web  #前端开发框架
      |   |-- public
      |   |-- src
      |   |   |-- assets
      |   |   |   `-- css
      |   |   |       |-- bat
      |   |   |       |   `-- youjun_base.css
      |   |   |       |-- component.css
      |   |   |       |-- global.css
      |   |   |       `-- youjun_base.css
      |   |   |-- components
      |   |   |   |-- DefaultLoading
      |   |   |   |   |-- index.js
      |   |   |   |   `-- index.vue
      |   |   |   |-- Footer.vue
      |   |   |   |-- LogPanel.vue
      |   |   |   `-- Navigation.vue
      |   |   |-- custom-components.js
      |   |   |-- pages
      |   |   |   `-- test
      |   |   |       |-- private #基于页面的组件封装
      |   |   |       |-- Test.vue
      |   |   |       |-- test.html
      |   |   |       `-- test.js
      |   |   |-- router
      |   |   |   `-- test.js
      |   |   |-- store
      |   |   |   |-- getter.js
      |   |   |   |-- index.js
      |   |   |   `-- modules
      |   |   |       `-- app.js
      |   |   `-- utils
      |   |       |-- common.js
      |   |       |-- config.js
      |   |       `-- web.js
      |   |-- README.md
      |   |-- .env.devbuild #前台环境变量配置文件
      |   |-- package-lock.json
      |   |-- package.json
      |   `-- vue.config.js
      |-- app.js  #Koa起始文件
      |-- ecosystem.config.js  #PM2配置文件
      |-- nginx.conf  #Nginx服务器配置文件（Nginx反向代理 3000端口到80端口，开启gzip）
      |-- package-lock.json
      |-- package.json
      `-- README.md
      



## 项目指令：
项目初始化：
`cd ./`

`npm install`

`cd web`

`npm install`

开启本地webpack dev server,运行端口8080
`npm run serve`

本地模拟生产环境打包：
`npm run dev-build`

生产环境打包：
`npm run build`

`cd ..`

开启本地测试接口koa服务,运行端口3000
`npm run dev`

开启服务器生产服务器
`npm run prd`


## 项目示例[>>项目链接戳我<<](http://106.13.63.236/community ">>项目链接戳我<<")




