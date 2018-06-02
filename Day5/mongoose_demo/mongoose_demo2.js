var mongoose = require('mongoose')


var Schema = mongoose.Schema

//1.连接数据库
mongoose.connect('mongodb://localhost/test')

//2.设置文档结构（表结构）
var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
});

//3.将文档结构发布为模型
var Blog = mongoose.model('Blog',blogSchema)

//4.增加数据
/**
var test_data = new Blog({
    title:"mongoose",
    author:"no1harm",
    body:"none yet.",
})
 */


//5.保存数据
/**
test_data.save(function(err,ret){
    if (err) {
        console.log('fail..')
    }else{
        console.log('success..')
        console.log(ret)
    }
})
 */

//6.查询数据
//      查询所有
// Blog.find(function(err,ret){
//     if (err){
//         console.log('fail..')
//     }else{
//         console.log('success..')
//         console.log(ret)
//     }
// })

//      查询个别
// Blog.find({
//     title:"mongoose"
// },function(err,ret){
//     if (err){
//         console.log('fail..')
//     }else{
//         console.log('success..')
//         console.log(ret)
//         console.log('Done')
//     }
// })
//      只显示一个
// Blog.findOne({
//     title:"mongoose"
// },function(err,ret){
//     if (err){
//         console.log('fail..')
//     }else{
//         console.log('success..')
//         console.log(ret)
//         console.log('Done')
//     }
// })

//7.删除数据
// Blog.findOneAndRemove({},function(err,ret){})
// Blog.remove(function(err,data){
//     if(err){
//         console.log('fail.')
//     }else{
//         console.log('deleted.')
//     }
// })

//8.更新数据
// Blog.findByIdAndUpdate('',{},function(err,ret){})
// Blog.findOneAndUpdate({},{},function(err,ret){})
