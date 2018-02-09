/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .controller('PageTopCtrl', PageTopCtrl);

  /** @ngInject */
  function PageTopCtrl($scope, $http, $sce, $state, $location, $log, localStorage, toastr) {
    $log.info("PageTopCtrl Enter");

    $scope.userObj = localStorage.getObject('dataUser')




  $scope.signout = function (){
    toastr.success(' ออกจากระบบเรียบร้อย', {})
  }
  }
})();
