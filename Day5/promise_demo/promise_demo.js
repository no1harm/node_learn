var fs = require('fs')


// console.log(1)
// 实例化一个Promise
var pro = new Promise(function(resolve,reject){
    // console.log(2)
    // 读取文件
            // 成功则容器状态为 reject
            // 失败则容器状态为resolve
    fs.readFile('a.txt','utf8',function(err,data){
        // console.log('here')
        if (err){
            // console.log(4)
            reject(err)
        }else{
            // console.log(3)  
            resolve(data)
        }
    })
})

// 当pro成功后，then采取指定的操作
// then方法接受的function就是容器中的resolve函数
var pro2 = new Promise(function(resolve,reject){
    // console.log(2)
    // 读取文件
            // 成功则容器状态为 reject
            // 失败则容器状态为resolve
    fs.readFile('b.txt','utf8',function(err,data){
        // console.log('here')
        if (err){
            // console.log(4)
            reject(err)
        }else{
            // console.log(3)  
            resolve(data)
        }
    })
})
var pro3 = new Promise(function(resolve,reject){
    // console.log(2)
    // 读取文件
            // 成功则容器状态为 reject
            // 失败则容器状态为resolve
    fs.readFile('c.txt','utf8',function(err,data){
        // console.log('here')
        if (err){
            // console.log(4)
            reject(err)
        }else{
            // console.log(3)  
            resolve(data)
        }
    })
})

pro
    .then(function(data){
        console.log(data)
        //这里的return返回的相当于是又一个resolve
        //下面的then获取的就是这个return
        // return 123
        return pro2
        //这里的return的是pro2的resolve
    },function(err){
        console.log(err)
    })
    .then(function(data){
        console.log(data)
        return pro3
    },function(err){
        console.log(err)
        console.log('pro2 is not find')
    })
    .then(function(data){
        console.log(data)
    },function(err){
        console.log(err)
        console.log('pro3 is not find')
    })