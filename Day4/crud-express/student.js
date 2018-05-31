/**
 * student.js
 * 数据操作文件模块
 * 作用：操作文件中的数据，只处理数据，不关心业务
 */

 var fs = require('fs')

 var dbPath = './db.json'
 /**
  * 编辑更新学生
  */
//  student是传进去的一个参数
exports.updateById = function(student,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		//修改对象
		// Ecmascript6中的一个数组方法：find
		// 需要接受一个函数作为参数
		// 当某个遍历项符合item.id === student.id条件的时候，find会终止遍历，同时返回遍历项
		student.id = parseInt(student.id)
		var stu = students.find(function(item){
			return item.id === student.id
		})
		for (var key in student){
			stu[key] = student[key]
		}
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
  * 获取所有学生列表 
  * 
  * readFile()是异步的
  * 	方法的第一个参数是文件的路径
  * 	方法的第二个参数是读取完成后的回调函数
  * 
  * 当我们在router.js中调用find()方法的时候，我们希望直接能够处理从find()中得到的异步数据
  * 所以在此用回调函数
  * 
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
 * 
 * @param {number} id 
 * @param {function} callback 
 */
exports.findById = function(id,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
        if (err) {
            return callback(err)
        }
		//callback中的参数：第一个是err,第二个是结果
		var students = JSON.parse(data).students
		var ret = students.find(function(item){
			return item.id === id
		})
        callback(null,ret)
    })
}

  /**
  * 添加保存学生
  */
 //回调函数初步理解：函数告诉 库/or something else接下来该怎么执行这个函数
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
* 删除学生
*/
exports.deleteById = function (id, callback) {
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err) {
			return callback(err)
		}
		var students = JSON.parse(data).students

		//findIndex方法专门用来根据条件查找元素的下标
		var deleteId = students.findIndex(function(item){
			return item.id === parseInt(id)
		})

		//根据下标从数组中删除对应的学生对象
		students.splice(deleteId,1)
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