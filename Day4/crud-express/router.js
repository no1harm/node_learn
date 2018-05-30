/**
 * router.js 路由模块
 *  处理路由
 *  根据不同的请求方法+请求路径设置具体路由
 */

var fs = require('fs')
var Students = require('./student.js')

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
    Students.find(function(err,students){
        if (err) {
            return res.status(500),send('server error')
        }
        res.render('index.html',{
            students:students
        })  
    })
})

/**
 * 增
 */
router.get('/students/new',function(req,res){
    res.render('new.html')
})

router.post('/students/new',function(req,res){
    var student = req.body
    Students.save(student,function(err){
        if (err) {
            return res.status(500),send('server error')            
        }
        console.log(student)
        res.redirect('/')
    })
})

/**
 * 改
 */
router.get('/students/edit',function(req,res){
    
})

router.post('/students/edit',function(req,res){
    
})

/**
 * 删
 */
router.get('/students/delete',function(req,res){
    
})

router.post('/students/delete',function(req,res){
    
})


//3.把router导出
module.exports = router