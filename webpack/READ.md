## webpack执行过程

``` bash
# 确定入口文件；
# 根据模块之间的依赖关系，通过递归生产关系图谱
# 核心分别包括：分析文件、转化文件、编译文件、生成文件
# 输出打包文件
```

## webpack原理

``` bash
# 初始化参数配置
合并shell脚本传入的webpack.config.js文件，得到配置参数

# 执行编译
获取初始化参数后，得到complier编译对象，并注册插件，插件的webpack执行过程的钩子中做出相应处理，调用complier对象的run方法

# 生成AST
根据模块之间的依赖关系，从入口文件entry开始，递归生成完整的AST

# 代码转换
根据定义的文件类型和loader,递归AST并进行代码转换，直到所有文件都被转换处理

# 完成编译并输出
递归完毕后，得到转换结果，包含每个模块和它们之间的依赖关系，并根据entry入口文件输出代码块chunk

# 输出打包文件
将chunk输出到文件系统中，得到打包文件
```

## 关键依赖包说明

``` bash
# @babel/parser: 
用于分析通过fs.readFileSync读取的文件内容，并返回AST

# @babel/traverse: 
用于遍历AST,获取必要的数据

# @babel/core: 
babel核心模块，提供transformFromAst方法，将AST转化问浏览器可运行的代码

# @babel/preset-env: 
将转换后代码转换生产ES5代码
```

## webpack实现关键方法

```bash
# createAssets
使用 @babel/parser生成AST;使用@babel/traverse建立依赖关系；使用@babel/preset-env生成ES5代码。根据模块依赖递归文件并执行createAssets方法

#createGraph
根据入口文件，返回所有文件依赖图谱

#bundle
根据依赖图谱返回整个代码和输出
```