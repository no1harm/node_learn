/**
 * router.js 路由模块
 *  处理路由
 *  根据不同的请求方法+请求路径设置具体路由
 */

var fs = require('fs')

// module.exports = function(app){
//     app.get('/',function(req,res){
//         //按照utf-8编码格式
//         fs.readFile('./db.json','utf-8',function(err,data){
//             if (err) {
//                 return res.status(500).send('Server error.')
//             }
//             res.render('index.html',{
//                 //data是字符串，需要把data转成数组 
//                 students:JSON.parse(data).students
//             })       
//         })
//     })
// }

var express = require('express')

// 1.创建一个路由容器
var router = express.Router()

// 2.把路由都挂载到路由容器中
router.get('/',function(req,res){
    fs.readFile('./db.json','utf-8',function(err,data){
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('index.html',{
            students:JSON.parse(data).students
        })
    })
})

//3.把router导出
module.exports = router