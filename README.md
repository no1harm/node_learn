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

# Day3 + Day4

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


## package.json / package-lock.json

- 建议每一个项目都有一个package.json文件
- 在项目目录下通过`npm init`命令创建
- 使用`npm install --save 包名`来把第三方包的描述信息写入`package.json`
    - npm5以后的版本安装包不需要加`--save`，会自动保存依赖信息
- `npm install`命令可以自动安装全部依赖包
- 不升级node的情况下，单独升级npm`npm i --global npm`
- `package-lock.json`会保存`node_modules`中所有包的信息
 - `lock`的意思是锁定版本

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
        - `app.engine('art', require('express-art-template'))`挂载模板引擎
        - `res.render('xx.art',{})` 渲染模板
        - 如果希望修改默认的`views`视图渲染存储目录，修改：
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

## 设置数据库

- 项目目录下创建`db.json`文件
- 设置
- `fs.readFile`读取json文件
- `JSON.parse()`把读取出来的文件转成数组
- 模板渲染

## 修改完代码自动重启

- nodemon 基于node.js开发的第三方命令行工具
    - `npm install --global nodemon`全局安装
    - `nodemon xxx.js` 自动重启

## 基本路由 

- 请求方法
- 请求路径
- 请求处理函数
- 路由模块的提取
    - 把路由提取出来，放在同目录下的`router.js`统一管理
    - `router.js`创建路由容器`var router = express.Router()`
    - 把路由都挂载到路由容器中
    - `module.exports = router`把router导出
    - `app.use(router)`在`app.js`把`router.js`路由容器挂载进来
    - 

## 回调函数

- 感觉理解起来有点困难
- 异步API都伴随有回调函数
- ```类A调用类B的方法b（传入相关信息），类B的方法在执行完后，会将结果写到（再回调）类A的方法a，完成动作```
    - 具体到这个案例就是
    - `router.js`中的`find()`传入参数调用`student.js`中的`find()`，`student.js`中的`find()`执行完后，再将结果回调到`router.js`中的`find()`的方法中
        - `student.js`中有一个`find()`函数，函数中中有一个参数`callback`(形参/即回调函数)
        - `find()`主要是读取某一个文件中数据然后将异步结果用`callback`返回
        - 在`router.js`中可以调用`student.js`中的`find()`函数，直接使用`find()`函数中通过`callback`返回的数据
- 完成增删查改

# Day5

## MongoDB

- mongodb
    - 概念
        - 关系型数据库 / 非关系型数据库 区别
            + 所有的关系型数据库都需要通过`sql`语言来操作
            + 所有的关系型数据库在操作之前都需要设计表结构
            + 非关系型数据库非常灵活
        - MongoDB不需要设计表结构
            +没有结构性

    - 安装
        + 官方网站
        + 加入环境变量
        + 命令行输入`mongod --version`确认是否安装

    - 启动
        + MongoDB默认使用执行`mongod`命令所处盘符根目录下的 `/data/db` 作为自己的数据存储目录
        + 所以要先在所需盘符根目录下新建`/data/db`
        + 开启：命令行输入`mongod`
        + 关闭：`ctrl+c` / 关闭服务控制台

    - 使用数据库
        + 另开命令行
        + 连接数据库
            - 输入`mongo` 
                + 默认连接本机的MongoDB服务
        + 使用数据库
            - `show dbs`
                + 查看显示所有数据库
            - `db`
                + 查看当前操作数据库
            - `use 数据库名称`
                + 切换到指定数据库/没有则新建

    - 退出
        + 输入`exit`

- 在node中使用MongoDB
    + 使用官方的`mongodb`包操作
    + 使用第三方`mongoose`来操作
        - `http://mongoosejs.com/·`
        - `mongoose`基于MongoDB官方的`mongodb`包再一次进行封装
        - 安装 `npm i --save mongoose`
        - 1.连接数据库
            + `mongoose.connect('mongodb://localhost/xxxx')`
        - 2.设置文档结构（表结构）
            + `var blogSchema = new Schema({})`
        - 3.将文档结构发布为模型
            + `var Blog = mongoose.model('Blog',blogSchema)`
        - 存储数据
            + `save()`
        - 查询数据
            + `find()`按条件查询所有
            + `findOne()`按条件查询第一条
        - 删除数据
            + `remove()`按条件删除
            + `findByIdAndRemove('',{},function(err,ret){})`根据Id删除           
            + `findOneAndRemove({},function(err,ret){})`根据查询条件删除
        - 更新数据
            + `findByIdAndUpdate('',{},function(err,ret){})`根据Id更新
            + `findOneAndUpdate({},{},function(err,ret){})`根据查询条件更新

## Promise

- `Ecmascript 6` 中的API
- 一个构造函数
- `Promise`本身不是异步，但内部往往封装一个异步任务
- 使用
    + 创建一个`Promise`容器
        - `new  Promise(function(resolve,reject){})`
    + 实例化一个`Promise`容器
        - `var promise = new  Promise(function(resolve,reject){})`
    + 通过`then()`方法来获取容器状态/结果
        - `promise.then(function(){},function(){})`
            + 第一个函数对应`resolve`
            + 第二个函数对应`reject`
- 关于嵌套
    + `then()`可以接受并返回另一个`Promise`实例的结果`(resolve/reject)`在接下来的`then()`中
    + ```javascript   
        pro
            .then(function(data){
                console.log(data)
                //这里的return返回的相当于是又一个resolve
                //下面的then获取的就是这个return
                // return 123
                return pro2
                //这里的return的是pro2的resolve
            },function(err){
                console.log(err)
            })
            .then(function(data){
                console.log(data)
                return pro3
            },function(err){
                console.log(err)
                console.log('pro2 is not find')
            })
            .then(function(data){
                console.log(data)
            },function(err){
                console.log(err)
                console.log('pro3 is not find')
            })
        ```

# Day6

## Path路径模块理解

- `http://nodejs.cn/api/path.html`
- `http://javascript.ruanyifeng.com/nodejs/path.html`
    + `path.join()`
        - 方法用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是”/“，Windows系统是”\“
    + `path.resolve()`
        - 用于将相对路径转为绝对路径。可以接受多个参数，依次表示所要进入的路径，直到将最后一个参数转为绝对路径。如果根据参数无法得到绝对路径，就以当前所在路径作为基准。除了根目录，该方法的返回值都不带尾部的斜杠。
    + `path.relative()`
        - 方法接受两个参数，这两个参数都应该是绝对路径。该方法返回第二个路径相对于第一个路径的那个相对路径。
    + `path.parse()`
        - 可以返回路径各部分的信息
            + ```javascript
                var myFilePath = '/someDir/someFile.json';
                path.parse(myFilePath).base
                // "someFile.json"
                path.parse(myFilePath).name
                // "someFile"
                path.parse(myFilePath).ext
                // ".json"
            ```
- 在文件操作中，使用相对路径是不可靠的，因为在node中文件操作的路径被设计为相对于执行node命令所处的路径
    - `__dirname`和`__filename`是不受执行node命令所属路径影响的
    - `__dirname`
        + 可用来获取当前文件模块所属目录的绝对路径
    - `__filename`
        + 可用来获取当前文件的绝对路径
    
## 使用模板引擎2

- `http://aui.github.io/art-template/zh-cn/docs/syntax.html#模板继承`
    - 子模板
        + 在html中嵌入所需要的部分`{{ include './xxx.html'}}`

    - 模板继承
        + 主模板A.html预留位置`{{ block 'a'}}aaa{{ /block }}`
        + 副模板B.html继承 `{{ extend './A.html'}}`
            - 修改默认 `{{ block 'a'}}bbb{{ /block }}`

## 把回调函数改写为Promise,加强记忆

## 通过session保存登录状态

- `session` 和 `cookie` 区别
    + Session是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中
    + Cookie是客户端保存用户信息的一种机制，用来记录用户的一些信息，也是实现Session的一种方式

- 使用
    + 引包
        - `var session = require('express-session')`
    + 配置session
        - ```javascript
            app.use(session({
            secret:'keyboard cat',
            resave:false,
            saveUninitialized:true,
            }))
            ``` 
    + 设置session
        - `req.session.xx = xx`
    + 获取session
        - `req.session.xx`
    + 清除session
        - `req.session.xx = null`
    + 持久化session存储

# Day7

- 中间件理解
    + 解析、处理用户请求信息
    + 中间件本身是一个方法，该方法接收三个参数
        - `Request` 请求对象
        - `Response` 响应对象
        - `next` 下一个中间件
    + 当一个请求进入一个中间件之后，如果不调用`next`t则会停留在当前中间件
        - 所以`next`是一个用来调用下一个中间件的方法 
            + 当请求进来，会从第一个中间件开始匹配
            + 如果匹配，则进来
            + 如果不匹配，则继续判断，匹配下一个中间件