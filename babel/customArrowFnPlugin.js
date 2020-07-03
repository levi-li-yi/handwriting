// babel插件就是要将一棵树变成另外一颗树
// 在开发babel的plugin时候，要用到访问者模式；在访问到某一个路径的时候进行匹配，然后对这个节点进行修改,如：
/* 
const babel = require('@babel/core')
const code = `const fn = (a, b) => a + b` // 转换后 const fn = function(a, b) { return a + b }
const arrowFnPlugin = {
  // 访问者模式
  visitor: {
    // 当访问到某个路径的时候进行匹配
    ArrowFunctionExpression(path) {
      // 拿到节点
      const node = path.node
      console.log('ArrowFunctionExpression -> node', node)
    },
  },
}

const r = babel.transform(code, {
  plugins: [arrowFnPlugin],
})
 */

 // 要将箭头函数ArrowFunctionExpression 结构替换成FunctionExpression结构，需要先组装类似的结构
/* 
@babel/types的两个作用:
(1)、判断这个节点是不是这个节点
(2)、生成对应的表达式
(3)、在使用时需要经常查阅文档，其中节点数目很多
(4)、在types文档中，找到functionExpression,该方法接收响应的参数，参数传递过去即可生成一个FunctionExpression
 */

/* 
t.functionExpression(id, params, body, generator, async)
id: Identifier (default: null) id 可传递 null
params: Array<LVal> (required) 函数参数，可以把之前的参数拿过来
body: BlockStatement (required) 函数体，接受一个 BlockStatement 我们需要生成一个
generator: boolean (default: false) 是否为 generator 函数，当然不是了
async: boolean (default: false) 是否为 async 函数，肯定不是了
还需要生成一个 BlockStatement，我们接着看文档找到 BlockStatement 接受的参数
t.blockStatement(body, directives)
看文档说明，blockStatement 接受一个 body，那我们把之前的 body 拿过来就可以直接用，不过这里 body 接受一个数组
我们细看 AST 结构，函数表达式中的 BlockStatement 中的 body 是一个 ReturnStatement，所以我们还需要生成一个 ReturnStatement
 */

const babel = require('@babel/core');
const  t = require('@babel/types');
const code = `const fn = (a,b) => a + b`

// 转化箭头函数
const arrowFnPlugin = {
     // 访问者模式
     visitor: {
         // 访问到某个路径时匹配
         ArrowFunctionExpression(path) {
             // 拿到节点
             const node = path.node;
             // 拿到函数的参数
             const params = node.params;
             let body = node.body;
             // 判断若不是blockStatement, 则将body转化成blockStatement
             if (!t.isBlockStatement(body)) {
               body = t.blockStatement(body);
             }
             const functionExpression = t.functionExpression(null, params, t.blockStatement([body]));
             // 替换原来的函数
             path.replaceWith(functionExpression);
         }
     }
 }

 const r = babel.transform(code, {
     plugins: [arrowFnPlugin],
 })
 console.log(r.code);