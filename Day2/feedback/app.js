var http = require('http')
var fs = require('fs')
// 处理静态资源：存放在public文件夹中
// 如果请求路径是以/public/开头，则默认要获取public中的资源

var http = require('http');
var server = http.createServer()
server.on('request',function(req,res){
    var url = req.url
    if (url === '/'){
        fs.readFile('./views/index.html',function(err,data){
            if (err) {
                console.log('Document is NOT found...')
            }
            res.end(data)
        })
    }else if(url === '/post'){
        fs.readFile('./views/post.html',function(err,data){
            if(err) {
                res.end('404.html is 404')
            }
            res.end(data)
        })
    }else if(url.indexOf('/public/') === 0) {   //如果用户请求的路径中包含静态资源,即路径中以/public/开头
        fs.readFile('.'+ url, function(err,data){   
            if (err) {
                return res.end('404 not found...')
            }
            res.end(data)
        })
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
