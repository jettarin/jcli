var express = require('express');
var router = express.Router();

var mysql = require('../db/mysql');





 router.get('/api/login' , mysql.login)







module.exports = router;
