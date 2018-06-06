var express = require('express')
var User = require('../models/user.js')
var router = express.Router()
var md5 = require('blueimp-md5')

router.get('/',function(req,res){
    res.render('index.html',{
        user:req.session.user
    })
})

router.get('/login',function(req,res){
    res.render('login.html',{})
})
router.post('/login',function(req,res){
    // 1.获取表单数据
    // 2.查询数据库
    // 3.发送响应数据
    var body = req.body
    User.findOne({
        email:body.email,
        password:md5(md5(body.password))
    },function(err,user){
        if (err){
            return res.status(500).json({
                err_code:500,
                message:'服务端错误'
            })
        }
        if (!user){
            return res.status(200).json({
                err_code:1,
                message:'邮箱或者昵称无效'
            })
        }
        //用户存在，登录成功，记录session
        req.session.user = user
        res.status(200).json({
            err_code:0,
            message:'ok'
        })
    })
})

router.get('/register',function(req,res){
    res.render('register.html',{})
})
router.post('/register',function(req,res){
    // 1.获取表单提交的数据
    //     req.body
    // 2.操作数据库
    //     判断用户是否存在
    // 3.发送响应  
    var body = req.body
    User.findOne({
        $or:[
            {
                email:body.email,
            },
            {
                nickname:body.nickname,
            }
        ]
    },function(err,data){
        if (err){
            return res.status(500).json({
                err_code:500,
                message:'服务端错误'
            })
        }
        if(data){
            //如果邮箱密码已存在
            return res.status(200).json({
                err_code:1,
                message:'邮箱或者昵称已存在'
            })
        }
        //对密码进行MD5重复加密
        body.password = md5(md5(body.password))
        
        new User(body).save(function(err,user){
            if (err) {
                return res.status(500).json({
                    err_code:500,                    
                    message:'服务端错误',
                })
            }
            // 用户注册成功，使用session记录用户的登录状态
            req.session.user = user
            res.status(200).json({
                err_code:0,
                message:'ok'
            })
        })
        
    })
    // User.findOne({
    //     $or:[
    //         {
    //             nickname:body.nickname
    //         },
    //         {
    //             email:body.email
    //         }
    //     ]
    // })
    //     .then(function(data){
    //         if(data){
    //             return res.status(200).json({
    //                 err_code:1,
    //                 message:"邮箱或昵称已存在"
    //             })
    //             // res.render('register.html',{
    //             //     err_message:'邮箱已被注册',
    //             //     form:body,
    //             // })
    //         }else{
    //             body.password = md5(md5(body.password))
    //             // console.log(body)
    //             return new User(body).save()                      
    //         }
    //     },function(err){
    //         console.log(err)
    //     })
    //     .then(function(data){
    //         req.session.user = user
    //         return res.status(200).json({
    //             err_code:0,
    //             message:"注册成功",
    //             // user:data
    //         })
    //         // res.redirect('/')
    //     },function(err){
    //         console.log(err)            
    //     })   
})
router.get('/logout',function(req,res){
    //清楚登录状态
    //重定向
    req.session.user = null
    res.redirect('/')
})
module.exports = router
