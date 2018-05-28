//
//构建服务器
//node核心模块http
//

//加载http模块
var http = require('http');

//使用http.createServer()方法创建一个Web服务器
//返回一个server实例
var server = http.createServer()

//发请求/接受请求/处理请求/反馈
//注册request请求事件
//当客户端请求过来，会自动触发服务器的request请求事件，然后执行回调函数
server.on('request',function(){
    console.log("收到请求")
})

//绑定端口号，启动服务器
server.listen(3000,function(){
    console.log("服务器启动成功，可以通过http://127.0.0.1:3000/ 来进行访问")
})


