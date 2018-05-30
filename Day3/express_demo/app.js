// 引包
var express = require('express')
var fs = require('fs')
var template = require('art-template')
var bodyParser = require('body-parser')

var comments = [
    {
        name:'李四',
        message:'today is wonderful.',
        dataTime:'2018-5-29'
    }
]

// 创建服务器应用程序
var app = express()

//公开指定目录
//可以通过/public/..的方式访问public目录中的所有资源
// 当省略第一个参数时，则可以通过省略/public/访问资源
app.use('/public/',express.static('./public'))

// 当渲染以 .art结尾的文件的时候，使用art-template模板引擎
app.engine('html',require('express-art-template'))

// 配置body-parser中间件（插件，专门用来解析表单POST请求体）
app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

// express为response相应对象提供了一个方法：render
// render方法默认是不可以使用，但是如果配置了模板引擎就可以了
// render第一个参数默认去项目中的views目录中查找

app.get('/',function(req,res){  //请求首页
    res.render('index.html',{
        comments:comments,
    })   
})

app.get('/post',function(req,res){  //请求Post
    res.render('post.html')
})

// app.get('/pinglun',function(req,res){
//     var comment = req.query
//     comment.dataTime = '2018-5-30'
//     comments.unshift(comment)
//     //重定向
//     // 之前的方法：res.statusCode = 302
//     // res.setHeader('Location','/')
//     res.redirect('/')
// })
//当以POST请求/post的时候，执行指定函数
// 可以利用不同的请求方法让不同的请求路径使用多次
app.post('/post',function(req,res){
    // 1.获取表单POST请求数据
    // 2.处理
    // 3.响应信息
    var comment = req.body
    comment.dataTime = '2018-5-30'
    comments.unshift(comment)
    res.redirect('/')
})

app.get('/login',function(req,res){ //请求Login
    res.send('login page is here')
})


app.listen(3000,function(){
    console.log('app is running at port 3000...')
})