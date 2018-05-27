console.log("start B")
require('./c.js')
console.log("end B")

var foo = 'bbb'

// 相当于提供一个接口，传输对象
exports.foo = foo