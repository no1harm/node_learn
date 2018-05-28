var http = require('http')
var fs = require('fs')

var server = http.createServer()

var wwwDir = 'c:/project/node.js_learn/day2/www'
//实现类似Apace服务，存放在某个目录中的资源都可以访问
server.on('request',function(req,res){
    var url = req.url
    if(url === '/'){
        fs.readFile(wwwDir + '/index.html',function(err,data){
            if(err){
                res.end('404 not found...')
            }else{
                res.end(data)
            }
        })
    }else if (url === '/hello.txt') {
        fs.readFile( wwwDir + '/hello.txt',function(err,data){
            if(err){
                res.end('404 not found...')
            }else{
                res.end(data)
            }
        })
    }else{
        res.end('404 not found.')
    }
})

server.listen(3000,function(){
    console.log('Server is runnning...')
})