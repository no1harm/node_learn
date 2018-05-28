var http = require('http')
var fs = require('fs')

var server = http.createServer()

var wwwDir = 'c:/project/node.js_learn/day2/www'

server.on('request', function (req, res) {
    var url = req.url

    var filePath = '/index.html'

    // 如果用户访问的是除了首页之外其他的资源，则filePath变为用户访问的路径，即url
    if (url !== '/') {
        filePath = url
    }
    // console.log(filePath,wwwDir+filePath)

    fs.readFile(wwwDir + filePath, function (err, data) {
        if (err) {
            return res.end('404 Not Found.')
        } else {
            res.end(data)
        }
    })
})

server.listen(3000, function () {
    console.log('Server is runnning...')
})