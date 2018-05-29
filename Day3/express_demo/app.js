// 引包
var express = require('express')
var fs = require('fs')
var template = require('art-template')
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
app.use('/public/',express.static('./public'))

// 当服务器收到get请求/的时候，执行回调函数
app.get('/',function(req,res){
    fs.readFile('./views/index.html',function(err,data){
        if (err) {
            console.log('Document is NOT found...')
        }
        data = data.toString()
        var ret = template.render(data,{
            comments:comments
        })
    res.end(data)
    })
})

app.listen(3000,function(){
    console.log('app is running at port 3000...')
})