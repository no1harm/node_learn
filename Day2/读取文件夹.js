var fs = require('fs')

var wwwDir = 'c:/project/node.js_learn/day2/www'

fs.readdir(wwwDir,function(err,files){
    if (err) {
        return console.log('Not Found.')
    }
    console.log(files)
})