/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.patient', [])
      .config(routeConfig)

  /** @ngInject */
  function routeConfig($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('main.patient', {
          url: '/patient/:hn',
          templateUrl: 'app/pages/patient/patient.html',
          title: 'Patient',
          sidebarMeta: {
            icon: 'ion-person',
            order: 0,
          },
          controller: 'PatientCtrl',
          authenticate: true,
        });
  }





})();
