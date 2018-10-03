var express = require('express');
var router = express.Router();
var url = require("url");
var dbutil = require('./dbutil');
var sequelize = dbutil.sequelize;
var Sequelize = dbutil.Sequelize;
var employee = dbutil.employee;
 




router.post('/createData', function(req, res){
	var query = req.body;
	var dataObj = {employee_id:null, name: query.name, mobile: query.mobile, address:query.address , username:query.username, email:query.email, password:query.password }
	console.log("Input ==> "+ JSON.stringify(dataObj));
	var status = {"status":"ERROR", "message":"", "error":""};		
	employee.create(dataObj).then(task => {
		status.status = "SUCCESS";
		status.message = "Created Record !!";
	  	res.send(status);
	}).catch((err) => {
		status.message = "Error While creating data.";
		status.error = err;
		res.send(status);
	});
});



router.post('/updateData', function(req, res){
	var query = req.body;
	var dataObj = {employee_id:null, name: query.name, mobile: query.mobile, address:query.address , username:query.username, email:query.email, password:query.password }
	console.log("Input ==> "+ JSON.stringify(dataObj));
	var status = {"status":"ERROR", "message":"", "error":""};
	employee.findById(query.employee_id).then(obj => {
		console.log("Before Update task = "+obj);
		obj.update(dataObj).then(() => {
			status.status = "SUCCESS";
			status.message = "Updated data !!";
			res.send(status);
		 }).catch((err) => {
			status.message = "Error While updating data.";
			status.error = err;
			res.send(status);
		  });
	}).catch((err) => {
		status.message = "Error While getting data to update.";
		status.error = err;
		res.send(status);
	});
});

// http://localhost:3000/employee/deleteData?employee_id=1
router.get('/deleteData1', function(req, res){
	//var query = req.body;
	var query = url.parse(req.url,true).query;
	 var dataObj = {employee_id: query.employee_id}
	console.log("Input ==> "+ JSON.stringify(dataObj));
	var status = {"status":"ERROR", "message":"", "error":""};
	employee.destroy({where:{employee_id: query.employee_id}}).then(obj => {
		console.log("Before delete task = "+obj);
		obj.delete(dataObj).then(() => {
			status.status = "SUCCESS";
			status.message = "delete data !!";
			res.send(status);
		 }).catch((err) => {
			status.message = "Error While delete data.";
			status.error = err;
			res.send(status);
		  });
	}).catch((err) => {
		status.message = "Error While getting data to delete.";
		status.error = err;
		res.send(status);
	});
});

// http://localhost:3000/employee/deleteData?employee_id=1
router.post('/deleteData123', function(req, res){
	var query = req.body;
	//var query = url.parse(req.url,true).query;
	 var dataObj = {employee_id: query.employee_id}
	console.log("Input ==> "+ JSON.stringify(dataObj));
	var status = {"status":"ERROR", "message":"", "error":""};
	employee.destroy({where:{employee_id: query.employee_id}}).then(result => {
				res.send(result);
			  
	}).catch((err) => {
			res.send('Error While getting data:'+err);
	});
});

// http://localhost:3000/employee/deleteData?employee_id=1
router.post('/deleteData', function(req, res){
	var query = req.body;
	//var query = url.parse(req.url,true).query;
	 var dataObj = {employee_id: query.employee_id}
	console.log("Input ==> "+ JSON.stringify(dataObj));
	var status = {"status":"ERROR", "message":"Error While deleting record", "error":""};
	employee.destroy({where:{employee_id: query.employee_id}}).then(result => {
				status.status = "SUCCESS";
				status.message = "Deleted Record";
				res.send(status);
			  
	}).catch((err) => {
			status.error = err;
			res.send(status);
	});
});

//http://localhost:3000/employee/getAll
router.get('/getAll', function(req, res){
	employee.findAll().then(result => {
				if(result.length > 0){
					var jsonResult = [];	
					  for(var i=0; i < result.length; i++){
						  var obj = result[i].dataValues;
						  jsonResult.push(obj);
					  }
					  //return response;
					  res.send(jsonResult);
				}else{
					res.send("No data found !!");
				}
			  
	}).catch((err) => {
			res.send('Error While getting data:'+err);
	});
});

//http://localhost:3000/employee/getEmployeeByID
router.get('/getEmployeeByID', function(req, res){
	var query = url.parse(req.url,true).query;
	employee.findById(query.employee_id).then(result => {
		console.log("employee retried :: "+result);
				if(result != null && result != undefined){
					var jsonResult = result.dataValues;	
					  //return response;
					  res.send(jsonResult);
				}else{
					res.send("No data found !!");
				}
			  
	}).catch((err) => {
			res.send('Error While getting data:'+err);
	});
});
//export this router to use in our index.js
module.exports = router;
