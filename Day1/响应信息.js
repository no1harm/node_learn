//
//构建服务器
//node核心模块http
//

//1.加载http模块
var http = require('http');

//2.使用http.createServer()方法创建一个Web服务器
//返回一个server实例
var server = http.createServer()

//request 请求事件处理函数，需要接受两个参数
//      request 请求对象
//          请求对象可以用来获取客户端的一些请求信息
//      response 响应对象
//          响应对象可以用来给客户发送响应信息

//发请求/接受请求/处理请求/反馈
//3.注册request请求事件
//当客户端请求过来，会自动触发服务器的request请求事件，然后执行回调函数
server.on('request',function(request,response){
    console.log("收到请求，请求路径是：" + request.url)
    var url = request.url
    //response 对象有一个方法：write可以用来给客户发送响应数据
    //响应内容只能是二进制数据或者字符串
    //write可以使用多次，但是最后一定要使用end来结束响应，否则客户端要一直等待
    if (url === '/index'){
        // response.write('index');
        // response.end()
        response.end("Index Here")
    }else if(url === '/'){
        // response.write('hello');
        // response.write('World');
        // response.end() 
        //更简洁方法
        //服务器默认发送的数据：UTF-8编码内容
        // 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
        // 中文操作系统默认是gbk
        // 在http协议中，Content-type就是用来告知对方我给你发送的数据内容是什么类型
        // plain:普通文本 html:html
        response.setHeader('Content-Type','text/plain;charset=utf-8')
        response.end("Hello 世界")
    }else if(url === '/products'){
        var prop = [
            {
                name:'apple',
                price:8899,
            },
            {
                name:'banana',
                price:8189,
            },
            {
                name:'pineapple',
                price:1900,
            }
        ]
        //把数组转成字符串JSON,stringfy
        response.end(JSON.stringify(prop))
    }
})

//4.绑定端口号，启动服务器
server.listen(3000,function(){
    console.log("服务器启动成功，可以通过http://127.0.0.1:3000/ 来进行访问")
})

