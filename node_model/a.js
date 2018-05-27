//加载第三方模块/自己编写的模块
//require作用：
        // 1.加载文件模块并执行里面的代码
        // 2.拿到被加载文件模块导出的接口对象
        // 在每个文件模块中都提供一个对象：exports
//相对路径必须加 ./
var foo = 'aaa'
console.log('start A');
var bExports = require('./b.js')
console.log("end A")
console.log("foo的值是："+ foo )
console.log(bExports.foo)