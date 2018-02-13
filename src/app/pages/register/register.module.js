/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.register', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.register', {
        url: '/register',
        templateUrl: 'app/pages/register/register.html',
        title: 'Register',
        sidebarMeta: {
          icon: 'ion-document-text',
          order: 0,
        },
        authenticate: true,
        controller: 'RegisterCtrl'
      });
  }

})();
