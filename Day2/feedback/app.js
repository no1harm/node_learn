var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')
// 处理静态资源：存放在public文件夹中
// 如果请求路径是以/public/开头，则默认要获取public中的资源
var comments = [
    {
        name:'sum',
        message:'5697',
        dataTime:'2018-5-29'
    },{
        name:'sum',
        message:'5697',
        dataTime:'2018-5-29'
    },{
        name:'sum',
        message:'5697',
        dataTime:'2018-5-29'
    },{
        name:'sum',
        message:'5697',
        dataTime:'2018-5-29'
    }
]

var http = require('http');
var server = http.createServer()
server.on('request',function(req,res){
    // 使用url.parse方法将路径解析为一个方便操作的对象
    // 第二个参数true表示直接将查询字符串转为一个对象（通过qurey属性来访问）
    var parseObj = url.parse(req.url,true)

    var pathname = parseObj.pathname

    if (pathname === '/'){
        fs.readFile('./views/index.html',function(err,data){
            if (err) {
                console.log('Document is NOT found...')
            }
            data = data.toString()
            var ret = template.render(data,{
                comments:comments
            })
            res.end(ret)
        })
    }else if(pathname === '/post'){
        fs.readFile('./views/post.html',function(err,data){
            if(err) {
                res.end('404.html is 404')
            }
            res.end(data)
        })
    }else if(pathname.indexOf('/public/') === 0) {   //如果用户请求的路径中包含静态资源,即路径中以/public/开头
        fs.readFile('.'+ pathname, function(err,data){   
            if (err) {
                return res.end('404 not found...')
            }
            res.end(data)
        })
    }else if(pathname === '/pinglun'){      
        // res.end(JSON.stringify(parseObj.query))
        // 服务器拿到用户输入数据
        var comment = parseObj.query
        comment.dataTime = '2017-11-2 17:03:22'
        comments.push(comment)

        // 如何通过服务器让客户端重定向/让用户重新请求首页
        // 1.状态码设置为302 临时重定向
        // 2.在响应头中通过location告诉客户端往哪儿重定向
        res.statusCode = 302
        res.setHeader('Location','/')
        res.end()
    }else{
        fs.readFile('./views/404.html',function(err,data){
            if(err) {
                res.end('404.html is 404')
            }
            res.end(data)
        })
    }
})

//绑定端口号，启动服务器
server.listen(3000,function(){
    console.log("Server is running...")
})
