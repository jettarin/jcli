/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.alerts', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('alerts', {
          url: '/alerts',
          templateUrl: 'app/pages/alerts/alerts.html'
        });
  }

})();