# node.js学习路径

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

-  fs/文件操作
-  http/http服务
-  url/路径操作
-  path/路径处理
-  os/操作系统信息  

## node模块引用

- CommonJS模块规范
    - 核心模块直接`require`
    - 第三方模块通过`npm install` 下载
    - 自己写的模块引入/导出
        - `require` 引入
        - `exports` 导出
            - 如果一个模块需要导出某个成员或多个成员，而非以挂载的方式，则要用`module.exports = {}`
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
    - 模板使用流程：创建服务器(`http.createServer()`) > 拿到模板,读取模板信息(`fs.readfile`) > 把模板信息转化成字符串(`toString()`) > 替换模板信息(`template.render()`) > 响应(`response.end()`) 

- 处理静态资源
    - 建立public文件夹
    - 判定访问路径中是否以/public/开头
    - 访问资源并响应`fs.readFile('.'+ url, function(err,data){}`

- 处理表单提交get
    - `<form action="/pinglun" method="get">`转到`/pinglun` > `url.parse()`解析请求路径 > `url.parse().pathname`获取url字段 > 获取`url.parse()`字段中的`query`> `query`即是刚才发出的get请求中的内容/对象 >

- 重定向
    - 1.状态码设置为302 临时重定向`res.statusCode`
    - 2.在响应头中通过location告诉客户端往哪儿重定向 `res.setHeader('Location','/')`

# Day3

## npm

- 包管理工具
- 常用命令
    - `npm install --global npm`升级npm
    - `npm init`生成package.json
        - `npm init -y`快速生成
    - `npm install`全部下载
        - `npm i` 简写
    - `npm install 包名`下载包        
    - `npm install --save 包名`下载并保存依赖项到`package.json`
    - `npm uninstall 包名`删除包，有依赖项会依然保存 
    - `npm uninstall --save 包名`删除包，会删除依赖项
    - `npm help`查看帮助
    - `npm 命令 --help`查看具体命令的使用帮助
- npm镜像`https://npm.taobao.org/`
    - 通过`npm install --global cnpm`把淘宝镜像安装到全局
    - 以后就可以使用`cnpm`命令了
    - 或者可以通过`npm install -g cnpm --registry=https://registry.npm.taobao.org`来使用淘宝的服务器来下载（不用安装cnpm）
    -  `npm config list`查看npm配置信息


## Package.json 包描述文件

- 建议每一个项目都有一个package.json文件
- 在项目目录下通过`npm init`命令创建
- 使用`npm install --save 包名`来把第三方包的描述信息写入`package.json`
- `npm install`命令可以自动安装全部依赖包


## Express

- 文件操作路径中的/ 和模块标识路径中的/
    - 文件操作中的相对路径可以省略./
        - `./data/a.txt`    相对于当前目录下
        - `data/a.txt`  相对于当前目录
        - `/data/a.txt` 绝对路径，当前文件模块所处磁盘根目录
        - `c:/../..`    绝对路径
    - 在模块加载中，相对路径中的./不能省略

- 优点
    - 第三方Web开发框架
    - 高度封装了http模块
    - 更加专注于业务，而非底层细节

- 安装
    - `npm install --save express`

- 在express中配置使用art-template
    - `npm install --save express-art-template`安装
    - 关键语法
        - `app.engine('art', require('express-art-template'))`
        - `res.render('xx.art',{})`
        - 如果希望修改默认的`views`师徒渲染存储目录，修改：
            - `app.set('views',目录路径)`
        - `redirect()`重定向

- 在express中获取get表单数据
    - `req.query`直接获取get请求体数据

- 在express中获取post表单数据
    - 没有内置获取post请求的API
    - `npm install --save body-parser`
    - 引包
    - ``` app.use(bodyParser.urlencoded({ extended:false})) app.use(bodyParser.json())```
    - `req.body`获取post请求体数据

## 修改完代码自动重启

- nodemon 基于node.js开发的第三方命令行工具
    - `npm install --global nodemon`安装
    - `nodemon xxx.js` 自动重启

## 基本路由 

- 请求方法
- 请求路径
- 请求处理函数
