var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/user')

var Schema = mongoose.Schema

var userSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    nickname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    user_created_time:{
        type:Date,
        //不是Date.now()
        default:Date.now,
    },
    last_modified_time:{
        type:Date,
        default:Date.now,
    },
    avatar:{
        type:String,
        default:'/pubic/img/avatar-default.png'
    },
    bio:{
        type:String,
        default:''
    },
    gender:{
        type:Number,
        enum:[-1,0,1]
    },
    birtthday:{
        type:Date,
    },
    status:{
        type:Number,
        enum:[0,1,2],
        default:0,
    }
})


module.exports = mongoose.model('User',userSchema)