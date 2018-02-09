/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.patient')
      .controller('PatientCtrl', PatientCtrl);

  /** @ngInject */
  function PatientCtrl($scope, $http, $timeout, $element,$log,$state,baConfig,toastr) {
    $log.info('Enter PatientCtrl');
    $scope.homepath = APP.CONTEXT_PATH

    $scope.hn = $state.params.hn

    // get AN
    Number.prototype.pad = function(n) {
      if (n==undefined)
          n = 2;
      return (new Array(n).join('0') + this).slice(-n);
    }

    $scope.hn9 = parseInt($scope.hn).pad(9)
    $scope.chartList = []


    $scope.pdfName = 'Relativity: The Special and General Theory by Albert Einstein';
    $scope.transparent = baConfig.theme.blur;
    var dashboardColors = baConfig.colors.dashboard;
    var colors = [];
    for (var key in dashboardColors) {
      colors.push(dashboardColors[key]);
    }

    function getRandomColor() {
      var i = Math.floor(Math.random() * (colors.length - 1));
      return colors[i];
    }

    $scope.flage = function (k,obj){

      toastr.info(obj.length + ' เอกสาร ', 'พบ !', {})

      $scope.dateList = obj
    }

    if($scope.hn){
      $http({
        url:$scope.homepath+'/api/ipt/'+$scope.hn9,
        method:'GET'
      }).then(function (response){
        $scope.anList = response.data.data
        angular.forEach($scope.anList ,function (item){
          $http({
            url:$scope.homepath+'/api/old/ipd/chart',
            method:'GET',
            params:{
              an : Remove(item.an)
            }
          }).then(function (resp){
            item.an2 = resp.data
            angular.forEach(resp.data,function (i){
              $scope.chartList.push(i)
            })

          })
        })
      })



      let pathGetData = $scope.homepath+'/api/data/'+$scope.hn
      $http({
        url:pathGetData,
        method:'GET'
      }).then(function (resp){
        $scope.dataList = resp.data
        $scope.typeList = _.groupBy($scope.dataList, 'lov_name');
        angular.forEach($scope.dataList,function(item) {
          item.color = getRandomColor();
        });
      })

      $http({
        url: $scope.homepath+'/api/patient/'+$scope.hn,
        method:'GET'
      }).then(function (resp){
        $scope.historyList = resp.data
      })
    }


    $scope.getPdf = function (version,doc,fd,fn,y){
      $http({
        url:$scope.homepath+'/api/pdf',
        method:'GET',
        responseType: "blob",
        params:{
          hn:$scope.hn,
          ver:version,
          doc:doc,
          folder:fd,
          fileName:fn,
          y:y
        }
      }).then(function (resp){
        toastr.success( ' ', ' Open Success !', {})
        var currentBlob = new Blob([resp.data], {type: 'application/pdf'});
        $scope.pdfUrl = URL.createObjectURL(currentBlob);
      })
    }


    $scope.oldCard = function (){
      $http({
        url:$scope.homepath+'/api/old/opd/card',
        method:'GET',
        params: {
          hn:$scope.hn
        }

      }).then(function (resp){
        $scope.opdcardList = resp.data
        toastr.info($scope.opdcardList.length + ' เอกสาร ', 'พบ !', {})
        angular.forEach($scope.opdcardList,function(item) {
          item.color = getRandomColor();
        });
      })

    }
    $scope.oldChart = function (){
      toastr.info($scope.chartList.length + ' เอกสาร ', 'พบ !', {})
      angular.forEach($scope.chartList,function(item) {
        item.color = getRandomColor();
      });
    }



    function Remove(an) {
      var str = an;
      var ba = str.substring(3, 9);
      var fr = str.substring(0, 2);
      var f = ba.substring(1, 7);
      var a = fr+f
      return a
    }








    //$scope.httpHeaders = { 'Access-Control-Allow-Origin': '*' };
    $scope.pdfPassword = 'test';
    $scope.scroll = 0;


    $scope.getNavStyle = function(scroll) {
      if(scroll > 100) return 'pdf-controls fixed';
      else return 'pdf-controls';
    }

    $scope.onError = function(error) {
      // console.log(error);
    }

    $scope.onLoad = function(data) {
      $scope.loading = '';
    }


    $scope.onProgress = function (progressData) {

    };

    $scope.onPassword = function (updatePasswordFn, passwordResponse) {
      if (passwordResponse === PDFJS.PasswordResponses.NEED_PASSWORD) {
          updatePasswordFn($scope.pdfPassword);
      } else if (passwordResponse === PDFJS.PasswordResponses.INCORRECT_PASSWORD) {
          console.log('Incorrect password')
      }
};


  }
})();
