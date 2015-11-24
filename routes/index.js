
/**
 * 
 * Author:Liuchang
 * Date:2015-11-18
 * Email:lc9401@gmail.com
 *
 */


var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var user = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login', { title: '样式写到吐血啊喂！'});
});


/*login*/
router.get('/login', function(req, res, next) {
	res.render('login', { title: '注意登陆用的post不写下面的就404啊喂！'});
});
router.post('/login', function(req, res, next){

	var name_ = req.body.account;
	var md5 = crypto.createHash("md5");
	/* 暂时不用密码加密 如若使用注释取消掉 把下面req.body.pwd换成pwd_就行 */
	//var pwd_ = md5.update(req.body.pwd).digest("base64");  

	user.get(name_, function(err, user_, fields){
		if(!user_){
			console.log("用户不存在");
			res.send(false);
		}else{			
			if(user_.password!=req.body.pwd){
				console.log("密码错误");
				res.send(false);
			}else{
				req.session.user = user_;
				res.send(true);
		}
		}
	});
});


router.get('/home', function(req, res, next) {
	res.render('index', { title: '后端码农啊界面纯手写啊喂布局好难啊不知道怎么才算好看啊喂！'});
});


module.exports = router;
