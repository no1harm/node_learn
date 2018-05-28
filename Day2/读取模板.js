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

    fs.readFile( wwwDir + filePath, function (err, data) {
        if (err) {
            return res.end('404 Not Found.')
        }
        // 1.得到wwwDir中文件名及目录名
        //      fs.readdir
        // 2.得到的文件名及目录名替换到template中
        fs.readdir(wwwDir,function(err,files){
            if (err) {
                return console.log('Not Found Dir.')
            }
            // 3.创建变量以便于替换到模板中
            var content = ''

            files.forEach(function(item){
                content += `
                <h1>${item}</h1>
                `
            })
            // 4.处理获取的模板信息，转化为字符串
            data = data.toString()
            // 5.把模板里的字符替换成之前设置的变量
            data = data.replace('^-^',content)
            // 6.响应处理后的信息
            res.end(data)
        })
    })
})

server.listen(3000, function () {
    console.log('Server is runnning...')
})