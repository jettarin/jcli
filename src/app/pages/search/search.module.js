/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.search', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.search', {
        url: '/search',
        templateUrl: 'app/pages/search/search.html',
        title: 'Patient',
        sidebarMeta: {
          icon: 'ion-search',
          order: 0,
        },
        authenticate: true,
        controller: 'SearchCtrl'
      });
  }

})();
