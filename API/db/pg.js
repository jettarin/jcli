let express = require('express'); // Web Framework
let app = express();
let promise = require('bluebird');
let fs = require('fs');
let jwt = require('jsonwebtoken');



let options = {
  // Initialization Options
  promiseLib: promise
};

let pgp = require('pg-promise')(options);

const cn = {
  host: '192.168.0.40',
  port: 5432,
  user: 'saskt',
  password: 'skt@$hosxpxe',
  database: 'hosxp_skt'
};
// You can check for all default values in:
const db = pgp(cn); // database instance;








  function login(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*')

    let query = "SELECT * FROM officer o \
                 LEFT JOIN officer_picture op ON op.officer_id = o. officer_id \
                 LEFT JOIN doctor d ON o.officer_doctor_code = d.code \
                 WHERE officer_login_name = '"+req.query.username+"' and officer_login_password_md5 = '"+req.query.password+"' \
                 AND officer_active = 'Y'"

    console.log(query);
    db.any(query)
      .then(function (data) {

          res.status(200)
            .json({
              status: 200,
              data: data[0],
              message: 'Check User HosXP Login'
            });


      }).catch(function (err) {
        console.log(err);
        return next(err);
      });
  }

  function getPicture(req, res, next){
    let query = "SELECT op.officer_picture_blob from officer o left join officer_picture op on op.officer_id = o. officer_id where officer_login_name = '"+req.query.username+"' and officer_login_password_md5 = '"+req.query.password+"'"
    console.log(query);
    db.any(query)
      .then(function (data) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.contentType("arraybuffer");
        res.status(200)
          .json({
            status: 'success',
            data: data[0],

          });
      }).catch(function (err) {
        console.log(err);
        return next(err);
      });
  }

  function getAN(req, res, next){
    let query = "SELECT an,cast(substr(an, 1 ,2) as int) AS year_an FROM ipt WHERE hn = '"+req.params.hn+ "' AND cast(substr(an, 1 ,2) as int) < 60 order by an"
    console.log(query);
    db.any(query)
      .then(function (data) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL puppies'
          });
      }).catch(function (err) {
        console.log(err);
        return next(err);
      });
  }


  function getImageScan(req, res, next){
  let queryi = "SELECT doc.name,ovs.doctor"
      queryi += " ,(select count( DISTINCT vn) from ovst "
  queryi += " where doctor = ovs.doctor "
  queryi += " and vstdate between '2017-09-16' and '2017-09-30' "
  queryi += " ) as chn_sep "
  queryi += " ,( "
	queryi += " select count(DISTINCT ov.vn) from opdscreen_doctor_pe pe "
  queryi += " left join ovst ov on ov.vn = pe.vn "
	queryi += " where doctor_code = ovs.doctor "
	queryi += " and ov.vstdate between '2017-09-16' and '2017-09-30' "
	queryi += " and (pe_ga is not null "
	queryi += " or pe_heent is not null "
	queryi += " or pe_heart is not null "
	queryi += " or pe_chest is not null "
  queryi += " or pe_ab is not null "
	queryi += " or pe_pv is not null "
	queryi += " or pe_pr is not null "
	queryi += " or pe_gen is not null "
	queryi += " or pe_neuro is not null "
	queryi += " or pe_ext is not null "
	queryi += " or pe_ga_text is not null "
	queryi += " or pe_heent_text is not null "
	queryi += " or pe_heart_text is not null "
	queryi += " or pe_chest_text is not null "
	queryi += " or pe_ab_text is not null "
	queryi += " or pe_pv_text is not null "
	queryi += " or pe_pr_text is not null "
	queryi += " or pe_gen_text is not null "
	queryi += " or pe_neuro_text is not null "
	queryi += " or pe_ext_text is not null "
	queryi += " or pe is not null) "
  queryi += " ) as p_ex_sep "
  queryi += " ,(select count(DISTINCT vn) from patient_history_hpi "
	queryi += " where doctor_code = ovs.doctor "
  queryi += " and entry_date between '2017-09-16' and '2017-09-30') as hpi_sep "


  queryi += ", (select count(DISTINCT pe.vn) as hpe from opdscreen_doctor_pe pe "
  queryi += " inner join patient_history_hpi hpi on pe.vn = hpi.vn "
  queryi += " inner join ovst ov on pe.vn = ov.vn "
  queryi += " where pe.doctor_code = ovs.doctor "
  queryi += " and vstdate between '2017-09-16' and '2017-09-30' "
  queryi += " and hpi.hpi_text is not null "
  queryi += " and (pe_ga is not null "
	queryi += " or pe_heent is not null "
	queryi += " or pe_heart is not null "
	queryi += " or pe_chest is not null "
  queryi += " or pe_ab is not null "
	queryi += " or pe_pv is not null "
	queryi += " or pe_pr is not null "
	queryi += " or pe_gen is not null "
	queryi += " or pe_neuro is not null "
	queryi += " or pe_ext is not null "
	queryi += " or pe_ga_text is not null "
	queryi += " or pe_heent_text is not null "
	queryi += " or pe_heart_text is not null "
	queryi += " or pe_chest_text is not null "
	queryi += " or pe_ab_text is not null "
	queryi += " or pe_pv_text is not null "
	queryi += " or pe_pr_text is not null "
	queryi += " or pe_gen_text is not null "
	queryi += " or pe_neuro_text is not null "
	queryi += " or pe_ext_text is not null "
	queryi += " or pe is not null) "
  queryi += " ) hpe_sep "

 queryi += " ,(select count( DISTINCT vn) from ovst "
 queryi += " where doctor = ovs.doctor "
 queryi += " and vstdate between '2017-10-01' and '2017-10-31' "
 queryi += " ) as chn_otc "
 queryi += " ,( "
 queryi += " select count(DISTINCT ov.vn) from opdscreen_doctor_pe pe "
 queryi += " left join ovst ov on ov.vn = pe.vn "
 queryi += " where doctor_code = ovs.doctor "
 queryi += " and ov.vstdate between '2017-10-01' and '2017-10-31' "
 queryi += " and (pe_ga is not null "
 queryi += " or pe_heent is not null "
 queryi += " or pe_heart is not null "
 queryi += " or pe_chest is not null "
 queryi += " or pe_ab is not null "
 queryi += " or pe_pv is not null "
 queryi += " or pe_pr is not null "
	queryi += " or pe_gen is not null "
	queryi += " or pe_neuro is not null "
	queryi += " or pe_ext is not null "
	queryi += " or pe_ga_text is not null "
	queryi += " or pe_heent_text is not null "
	queryi += " or pe_heart_text is not null "
	queryi += " or pe_chest_text is not null "
	queryi += " or pe_ab_text is not null "
	queryi += " or pe_pv_text is not null "
	queryi += " or pe_pr_text is not null "
	queryi += " or pe_gen_text is not null "
	queryi += " or pe_neuro_text is not null "
	queryi += " or pe_ext_text is not null "
	queryi += " or pe is not null) "
  queryi += " ) as p_ex_otc "
  queryi += " ,(select count(DISTINCT vn) from patient_history_hpi "
  queryi += " where doctor_code = ovs.doctor "
  queryi += " and entry_date between '2017-10-01' and '2017-10-31') as hpi_otc "

  queryi += ", (select count(DISTINCT pe.vn) as hpe from opdscreen_doctor_pe pe "
  queryi += " inner join patient_history_hpi hpi on pe.vn = hpi.vn "
  queryi += " inner join ovst ov on pe.vn = ov.vn "
  queryi += " where pe.doctor_code = ovs.doctor "
  queryi += " and vstdate between '2017-10-01' and '2017-10-31' "
  queryi += " and hpi.hpi_text is not null "
  queryi += " and (pe_ga is not null "
	queryi += " or pe_heent is not null "
	queryi += " or pe_heart is not null "
	queryi += " or pe_chest is not null "
  queryi += " or pe_ab is not null "
	queryi += " or pe_pv is not null "
	queryi += " or pe_pr is not null "
	queryi += " or pe_gen is not null "
	queryi += " or pe_neuro is not null "
	queryi += " or pe_ext is not null "
	queryi += " or pe_ga_text is not null "
	queryi += " or pe_heent_text is not null "
	queryi += " or pe_heart_text is not null "
	queryi += " or pe_chest_text is not null "
	queryi += " or pe_ab_text is not null "
	queryi += " or pe_pv_text is not null "
	queryi += " or pe_pr_text is not null "
	queryi += " or pe_gen_text is not null "
	queryi += " or pe_neuro_text is not null "
	queryi += " or pe_ext_text is not null "
	queryi += " or pe is not null) "
  queryi += " ) hpe_otc "

  queryi += " ,(select count( DISTINCT vn) from ovst "
  queryi += " where doctor = ovs.doctor "
  queryi += " and vstdate between '2017-11-01' and '2017-11-08' "
  queryi += " ) as chn_nov "
  queryi += " ,( "
  queryi += " select count(DISTINCT ov.vn) from opdscreen_doctor_pe pe "
  queryi += " left join ovst ov on ov.vn = pe.vn "
	queryi += " where doctor_code = ovs.doctor "
	queryi += " and ov.vstdate between '2017-11-01' and '2017-11-08' "
	queryi += " and (pe_ga is not null "
	queryi += " or pe_heent is not null "
	queryi += " or pe_heart is not null "
	queryi += " or pe_chest is not null "
  queryi += " or pe_ab is not null "
	queryi += " or pe_pv is not null "
	queryi += " or pe_pr is not null "
	queryi += " or pe_gen is not null "
	queryi += " or pe_neuro is not null "
	queryi += " or pe_ext is not null "
	queryi += " or pe_ga_text is not null "
	queryi += " or pe_heent_text is not null "
	queryi += " or pe_heart_text is not null "
	queryi += " or pe_chest_text is not null "
	queryi += " or pe_ab_text is not null "
	queryi += " or pe_pv_text is not null "
	queryi += " or pe_pr_text is not null "
	queryi += " or pe_gen_text is not null "
	queryi += " or pe_neuro_text is not null "
	queryi += " or pe_ext_text is not null "
	queryi += " or pe is not null) "
  queryi += " ) as p_ex_nov "

  queryi += " ,(select count(DISTINCT vn) from patient_history_hpi "
  queryi += " where doctor_code = ovs.doctor "
  queryi += " and entry_date between '2017-11-01' and '2017-11-08') as hpi_nov "

  queryi += ", (select count(DISTINCT pe.vn) as hpe from opdscreen_doctor_pe pe "
  queryi += " inner join patient_history_hpi hpi on pe.vn = hpi.vn "
  queryi += " inner join ovst ov on pe.vn = ov.vn "
  queryi += " where pe.doctor_code = ovs.doctor "
  queryi += " and vstdate between '2017-11-01' and '2017-11-08' "
  queryi += " and hpi.hpi_text is not null "
  queryi += " and (pe_ga is not null "
	queryi += " or pe_heent is not null "
	queryi += " or pe_heart is not null "
	queryi += " or pe_chest is not null "
  queryi += " or pe_ab is not null "
	queryi += " or pe_pv is not null "
	queryi += " or pe_pr is not null "
	queryi += " or pe_gen is not null "
	queryi += " or pe_neuro is not null "
	queryi += " or pe_ext is not null "
	queryi += " or pe_ga_text is not null "
	queryi += " or pe_heent_text is not null "
	queryi += " or pe_heart_text is not null "
	queryi += " or pe_chest_text is not null "
	queryi += " or pe_ab_text is not null "
	queryi += " or pe_pv_text is not null "
	queryi += " or pe_pr_text is not null "
	queryi += " or pe_gen_text is not null "
	queryi += " or pe_neuro_text is not null "
	queryi += " or pe_ext_text is not null "
	queryi += " or pe is not null) "
  queryi += " ) hpe_nov "


 queryi += " from ovst ovs "

 queryi += " left join doctor doc on doc.code = ovs.doctor "
 queryi += " where ovs.vstdate between '2017-09-16' and '2017-10-31' "
 queryi += " and ovs.doctor is not null "
 queryi += " and doc.provider_type_code = '01' "
 queryi += " and doc.active = 'Y' "

 queryi += " group by doc.name,ovs.doctor "
 queryi += " ORDER BY chn_nov DESC"
 queryi += " limit 100 "
  console.log(queryi);
  db.any(queryi)
    .then(function (data) {
      console.log(data);
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        });
    }).catch(function (err) {
      console.log(err);
      return next(err);
    });


}





  function getDoctorVNOTC(req, res, next){
    let query = "select vn from ovst where vstdate between '2017-10-01' and '2017-10-31' and doctor = '"+req.params.doctor+ "' GROUP BY vn "
    console.log(query);
    db.any(query)
      .then(function (data) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL puppies'
          });
      }).catch(function (err) {
        console.log(err);
        return next(err);
      });
}



  module.exports = {
    login:login,
    getAN: getAN,
    getImageScan : getImageScan,
    getDoctorVNOTC : getDoctorVNOTC,
    login:login,
    getPicture:getPicture
  };
