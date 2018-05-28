# node.js

# Day1

## node.js是什么

- 不是语言
- 不是库/不是框架
- 是JavaScript运行环境

## 安装node

## node 系统文件读写

- fs库的运用

## node http服务器的构建

- 核心库`http`的加载
- 请求和响应
- 根据不同请求路径响应不同请求结果

## node 核心模块

-  引用

## node第三方模块引用

- 引用
- 模块作用域（node中没有全局作用域）

# Day2

## 代码规范

- https://github.com/airbnb/javascript
- 注意引进模块
- 检查变量

## 实现类似Apache功能

- 通过不同的url访问本地服务器资源

## 使用模板引擎

- 使用art-template模板引擎
    - 在项目目录下安装`npm install art-template --save`
    - 在需要使用的文件模块中加载`art-template`
    - 模板使用流程：创建服务器(http.createServer()) > 拿到模板,读取模板信息(fs.readfile) > 把模板信息转化成字符串(toString()) > 替换模板信息(template.render()) > 响应(response.end()) 

- 处理静态资源
    - 建立public文件夹
    - 判定访问路径中是否以/public/开头
    - 访问资源并响应`fs.readFile('.'+ url, function(err,data){}`
