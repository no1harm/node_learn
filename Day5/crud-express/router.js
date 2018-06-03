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
/**
 * 查
 */
// router.get('/students',function(req,res){
//     Students.find(function(err,students){
//         if (err) {
//             return res.status(500),send('server error')
//         }
//         res.render('index.html',{
//             students:students
//         })  
//     })
// })

//使用Promis来代替以上回调函数
router.get('/students',function(req,res){
    Students.find()
        .then(function(data){
            res.render('index.html',{
                students:data
            })
        },function(err){
            return res.status(500),send('server error')            
        })
})

/**
 * 增
 */
router.get('/students/new',function(req,res){
    res.render('new.html')
})

router.post('/students/new',function(req,res){

    new Students(req.body).save(function(err){
        if (err) {
            return res.status(500),send('server error')            
        }
        res.redirect('/students')
    })
})

/**
 * 改
 */
router.get('/students/edit',function(req,res){

    Students.findById(req.query.id.replace(/"/g,''),function(err,student){
        if (err) {
            return res.status(500),send('server error')            
        }
        res.render('edit.html',{
            student:student
        }) 
    })    
})

router.post('/students/edit',function(req,res){
    Students.findByIdAndUpdate(req.body.id,req.body,function(err){
        if (err){
            return res.status(500),send('server error')                        
        }
        res.redirect('/students')
    })
})

/**
 * 删
 */
router.get('/students/delete',function(req,res){
    Students.findByIdAndRemove(req.query.id.replace(/"/g,''),function(err){
        if (err) {
            return res.status(500),send('server error')                                    
        }
        res.redirect('/students')        
    })
})

router.post('/students/delete',function(req,res){
    
})


//3.把router导出
module.exports = router