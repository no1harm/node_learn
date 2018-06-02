//引包
const mongoose = require('mongoose');

// 连接MongoDB数据库
mongoose.connect('mongodb://localhost/test');

// 创建一个模型
const Cat = mongoose.model('Cat', { name: String });

// 实例化一个Cat
const kitty = new Cat({ name: 'Zildjian' });

//持久化保存实例
kitty.save().then(() => console.log('meow'));

