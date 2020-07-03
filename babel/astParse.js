/* 
AST解析流程
解析工具：
esprima: code => ast（将代码转化成ast）
estraverse: traverse ast 转换树
escodegen: ast => code （将ast转换成代码）
 */
const esprima = require('esprima');
const estraverse = require('estraverse')
const escodegen = require('escodegen')
const code = `function getUser() {}`

const ast = esprima.parseScript(code);

// estraverse只遍历type节点
// estraverse有两个钩子函数
estraverse.traverse(ast, {
    enter(node) {
        console.log('enter -> node.type', node.type)
        // 通过查看ast知道，node.type为Identifier时，节点指向函数名称
        if (node.type === 'Identifier') {
            node.name = 'fn'
        }
    },
    leave(node) {
        console.log('leave -> node.type', node.type)
    }
})
// AST遍历流程是按深度优先原则
const result = escodegen.generate(ast)
console.log(result)