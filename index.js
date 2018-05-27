var http = require('http')
var fs = require('fs')

var server = http.createServer()

server.on('request',function(req,rep){
    var url = req.url;
    if (url === '/') {
        fs.readFile('./resource/index.html',function(error,data){
            if (error){
                rep.setHeader('Content-Type','text/plain;charset=utf-8');
                rep.end("文件读取失败")
                console.log('file is no find...')
            }else{
                rep.setHeader('Content-Type','text/html;charset=utf-8');
                console.log('file is ready')
                rep.end(data)
            }
        })
    }
})

server.listen(3000,function(){
    console.log('Server is running...')
})