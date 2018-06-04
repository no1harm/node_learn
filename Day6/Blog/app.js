var express = require('express')
var path = require('path')
var router = require('./routers/router.js')

var app = express()



//path.join()用于连接路径
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views'))

app.use(router)

app.listen(3000,function(){
    console.log('Server is running...')
})