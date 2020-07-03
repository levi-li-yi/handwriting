const babel = require('@babel/core');
const code = `const fn = (a,b) => a + b`

// 1、转换箭头函数
// babel的transform方法实现自动遍历，使用相应预设或插件转换相应的代码
const r = babel.transform(code, {
    presets: ['@babel/preset-env'],
})

console.log(r.code)
/* var fn = function fn(a, b) {
  return a + b;
}; */

// 2、使用专用插件来转换箭头函数

const r1 = babel.transform(code, {
    plugins: ['@babel/plugin-transform-arrow-functions'],
})
console.log(r1.code)
/* var fn = function fn(a, b) {
  return a + b;
}; */