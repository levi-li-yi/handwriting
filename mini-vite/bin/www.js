#! /usr/bin/env node
// 采用node的方式执行文件
console.log('node')

const createServer = require('../index')

// 目标“创建一个koa服务
createServer().listen(4000, () => {

})