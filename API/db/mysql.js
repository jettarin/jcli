
let express = require('express'); // Web Framework
let app = express();
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '12345678',
  database        : 'cli_sys'
});


function login(req, res, next){

  res.setHeader('Access-Control-Allow-Origin', '*')
  let sql = 'SELECT * FROM doctor WHERE username = "'+req.query.username+'" and password = "'+req.query.password+'"'
  console.log(sql);
  pool.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.status(200)
      .json({
        status: 200,
        data: results[0],
        message: 'Check User HosXP Login'
      });
  });



}

module.exports = {
  login:login
};
