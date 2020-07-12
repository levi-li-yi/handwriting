const Koa = require('koa');
const {serveStaticPlugin} = require('./plugins/serveStaticPlugin')
// npm run dev时会创建koa服务
function createServer() {
    // koa是基于中间件运行的，可以定义一些插件列表

    const app = new koa();
    const root = process.cwd(); // 当前进程工作的路径

    const context = {
        app,
        root
    }
    const resolvePlugin = {
        // 2、解析import语法，重写导入路径: 直接请求vue文件浏览器不支持，仅支持'/'、'./'
        
        // 1、实现静态服务功能（静态服务可以注册多个）/服务启动会去找main.js
        serveStaticPlugin
    }
    return app;
}
module.exports = createServer;