var template = require('art-template')
var fs = require('fs')

// 1.读取html模板文件
fs.readFile('user_art_template.html',function(err,data){
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
})

