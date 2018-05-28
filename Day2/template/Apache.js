var http = require('http')
var fs = require('fs')
var template = require('art-template')

var server = http.createServer()

server.on('request', function (req, res) {
    
    var url = req.url

    fs.readFile('use_art_template.html', function (err, data) {
        if (err) {
            console.log('读取失败...')
        }
        // 2.把获取的html转化为字符串
        data = data.toString()
        // 3.把转化后的数据传给template渲染
        var ret = template.render(data,{
            name:'Jack',
            age: 18,
            hobbe: 'fit',
        })
        console.log(ret)
        res.end(ret)
    })
})

server.listen(3000, function () {
    console.log('Server is runnning...')
})