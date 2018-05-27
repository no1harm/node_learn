//浏览器中的JavaScript是不能操作文件的
//node端的JavaScript是可以操作文件的

//fs是file-system简写，文件操作

//使用require方法加载fs核心模块
var fs = require('fs');

//读取文件
//第一个参数就是要读取的文件路径
//第二个参数就是一个回调函数
//      成功
//      data 数据
//      error null
//      失败
//      data undefined
//      error 错误对象
fs.readFile('./data/hello.txt',function(error,data){
    if(error){
        console.log('读取失败');
    } else {
    console.log(data.toString())        
    }
})