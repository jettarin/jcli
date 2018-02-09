var express = require('express'); // Web Framework
var app = express();
var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

const cn = {
  host: '192.168.0.38',
  port: 5432,
  user: 'hos',
  password: 'sa',
  database: 'hosxp_image'
};
// You can check for all default values in:
const db = pgp(cn); // database instance;



function getContOPDscanSep(req, res, next){
    var queryi = "select count(DISTINCT ov.vn) from ovst ov "

          queryi += " inner join opdscan ops on ops.vn = ov.vn "

queryi += " where ov.vstdate between '2017-09-16' and '2017-09-30' "
 queryi += " and ov.doctor = '"+req.params.dc+"' "
  console.log(queryi);
  db.any(queryi)
    .then(function (data) {
      console.log(data);
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(200)
        .json({
          status: 'success',
          data: data[0],
          message: 'Retrieved ALL puppies'
        });
    }).catch(function (err) {
      console.log(err);
      return next(err);
    });
}

function getContOPDscanOtc(req, res, next){
    var queryi = "select count(DISTINCT ov.vn) from ovst ov "

          queryi += " inner join opdscan ops on ops.vn = ov.vn "

queryi += " where ov.vstdate between '2017-10-01' and '2017-10-31' "
 queryi += " and ov.doctor = '"+req.params.dc+"' "
  console.log(queryi);
  db.any(queryi)
    .then(function (data) {
      console.log(data);
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(200)
        .json({
          status: 'success',
          data: data[0],
          message: 'Retrieved ALL puppies'
        });
    }).catch(function (err) {
      console.log(err);
      return next(err);
    });
}

function getContOPDscanNov(req, res, next){
    var queryi = "select count(DISTINCT ov.vn) from ovst ov "

          queryi += " inner join opdscan ops on ops.vn = ov.vn "

queryi += " where ov.vstdate between '2017-11-01' and '2017-11-08' "
 queryi += " and ov.doctor = '"+req.params.dc+"' "
  console.log(queryi);
  db.any(queryi)
    .then(function (data) {
      console.log(data);
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(200)
        .json({
          status: 'success',
          data: data[0],
          message: 'Retrieved ALL puppies'
        });
    }).catch(function (err) {
      console.log(err);
      return next(err);
    });
}




  module.exports = {
    getContOPDscanSep: getContOPDscanSep,
    getContOPDscanOtc: getContOPDscanOtc,
    getContOPDscanSep: getContOPDscanSep

  };
