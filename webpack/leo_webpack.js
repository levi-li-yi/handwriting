// createAssets方法

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
// traverse采用ES Module导出，需添加default
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

let moduleId = 0; // 用来区分当前操作的模块

const createAssets = filename => {
    // 同步读取文件
    const content = fs.readFileSync(filename, 'utf-8');

    // 将读取文件流buffer转化为AST
    const ast = parser.parse(content, {
        sourceType: 'module' // 指定源码类型
    })

    const dependencies = []; // 用于收集文件依赖路径
    traverse(ast, {
        ImportDeclaration: ({node}) => {
            dependencies.push(node.source.value);
        }
    })
    /* console.log(ast);
    console.log(dependencies); */

    // 将AST转化为浏览器可运行的代码
    const {code} = babel.transformFromAstSync(ast, null, {
        presets: ['@babel/preset-env']
    })
    let id = moduleId++;
    return {
        id,
        filename, // 当前文件路径和名称
        code, // 编译后生成的代码
        dependencies // 依赖文件相对路径和名称
    }
}

// 递归所有依赖模块，生成依赖图谱
const createGraph = (entry) => {
    const mainAsset = createAssets(entry); // 获取入口文件对应内容
    const queue = [mainAsset];
    // console.log('queue');
    for (const asset of queue) {
        // console.log(asset);
        const dirname = path.dirname(asset.filename);
        asset.mapping = {};
        asset.dependencies.forEach(relativePath => {
            const absolutePath = path.join(dirname, relativePath);
            const child = createAssets(absolutePath);
            asset.mapping[relativePath] = child.id;
            queue.push(child);
        })
    }
    return queue;
}
// const graph = createGraph('./src/index.js');
// console.log(graph);

const bundle = (graph) => {
    // console.log(graph);
    let modules = '';
    graph.forEach(item => {
        // 字符串由组件ID为键，模块方法和序列化mapping组合的数组为值的对象
        modules += `
        ${item.id}: [
            function (require, module, exports) { 
                ${item.code}
            },
            ${JSON.stringify(item.mapping)}
        ],`
        // 构建工具无法判断是否支持require/module/exports这三种模块方法;故需要自己实现
    })
    // bundle返回值处理
    return `(function(modules) {
        function require(id) {
            const [fn, mapping] = modules[id];
            function localRequire(relativePath) {
                return require(mapping[relativePath]);
            }
            const module = {
                exports: {}
            }
            fn(localRequire, module, module.exports);
            return module.exports;
        }
        require(0);
    })({${modules}})
    `
}

const graph = createGraph('./src/index.js');
// console.log(graph);
const result = bundle(graph);
console.log(result);
eval(result);