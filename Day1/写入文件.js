var fs = require('fs');

//参数1 文件路径
//参数2 文件内容
//参数3 回调函数
//  error
//      成功：
//          文件写入成功
//          error是null
//      失败：
//          文件写入失败
//          error 是错误对象
fs.writeFile('./data/hello.md','hello everyone',function(error){
    if (error) {
        console.log('数据写入失败');
    }else{
        console.log('数据写入成功')
    }
})