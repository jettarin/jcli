/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardCtrl', DashboardCtrl);

  /** @ngInject */
  function DashboardCtrl($scope, $http, $timeout, $element, $log, $state ,localStorage) {
    $log.info("DashboardCtrl Enter");



  }
})();
