/**
 * app.js 入门模块
 *  创建服务
 *  做一些服务相关配置
 *  模板引擎
 *  body-parser解析表单post请求体
 *  提供静态资源服务
 *  挂载路由
 *  监听端口启动服务
 */
var express = require('express')
var template = require('art-template')
var bodyParser = require('body-parser')
var router = require('./router.js')

var app = express()

app.engine('html',require('express-art-template'))  //启用模板引擎

app.use(router)     //把路由容器挂载到app服务中

app.use('/node_modules/',express.static('./node_modules'))  //公开资源
app.use('/public/',express.static('./public'))

app.use(bodyParser.urlencoded({ extended:false}))   //获取post请求体数据的设置
app.use(bodyParser.json())


app.listen(3000,function(){
    console.log('server is running..')
})

module.exports = app