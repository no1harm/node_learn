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

- 处理表单提交get
    - `<form action="/pinglun" method="get">`转到`/pinglun` > `url.parse()`解析请求路径 > `url.parse().pathname`获取url字段 > 获取`url.parse()`字段中的`query`> `query`即是刚才发出的get请求中的内容/对象 >

- 重定向
    - 1.状态码设置为302 临时重定向`res.statusCode`
    - 2.在响应头中通过location告诉客户端往哪儿重定向 `res.setHeader('Location','/')`
