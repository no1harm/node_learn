/**
 * student.js
 * 数据操作文件模块
 */

 var fs = require('fs')

 var dbPath = './db.json'
 /**
  * 更新
  */
exports.updateById = function(){

}
  /**
  * 查找
  */
exports.find = function(callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if (err) {
            return callback(err)
        }
        //callback中的参数：第一个是err,第二个是结果
        callback(null,JSON.parse(data).students)
    })
}
  /**
  * 保存
  */
 //回调函数初步理解：函数告诉库/or something else接下来该怎么执行这个函数
//  如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取
exports.save = function (student, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}
		//callback中的参数：第一个是err,第二个是结果
		var students = JSON.parse(data).students
		student.id = students[students.length - 1].id + 1
		students.push(student)
		var fileData = JSON.stringify({
			students: students
		})
		fs.writeFile(dbPath, fileData, function (err) {
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}
/**
* 删除
*/
exports.delete = function (student, callback) {
	fs.readFile(dbPath,'utf8',function(err,data){
		if (err) {
			return callback(err)
		}

	})
}