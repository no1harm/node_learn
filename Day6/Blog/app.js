var express = require('express')
var path = require('path')
var router = require('./routers/router.js')
var bodyParser = require('body-parser')
var session = require('express-session')
var app = express()



//path.join()用于连接路径
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views'))

app.use(bodyParser.urlencoded({ extended:false})) 
app.use(bodyParser.json())

// 配置session，一定要在配置router之前
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
}))
app.use(router)

app.listen(3000,function(){
    console.log('Server is running...')
})