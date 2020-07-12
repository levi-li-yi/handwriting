const static = require('koa-static');

function serveStaticPlugin({app, root}) {

    //vite在哪里运行就以哪个目录启动静态服务
    app.use(static(root));
    // 以public作为静态服务（public为静态文件）
    app.use(static(path.join(root, 'public')));
}