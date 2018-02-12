/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages', [
      'ui.router',
      'BlurAdmin.pages.services',
      // 'BlurAdmin.pages.config',
      'BlurAdmin.pages.main',
      'BlurAdmin.pages.dashboard',
      'BlurAdmin.pages.search',
      // 'BlurAdmin.pages.ui',
      // 'BlurAdmin.pages.components',s
      // 'BlurAdmin.pages.form',
      // 'BlurAdmin.pages.tables',
      // 'BlurAdmin.pages.charts',
      // 'BlurAdmin.pages.maps',
      // 'BlurAdmin.pages.profile',

      'BlurAdmin.pages.patient',



      'BlurAdmin.pages.authSignIn',
      'BlurAdmin.pages.authSignUp',
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/authSignIn');



    if(localStorage.dataUser){
      var c = JSON.parse(localStorage.dataUser);
      console.log(c);
    }
    // baSidebarServiceProvider.addStaticItem({
    //   title: 'Menu Level 1',
    //   icon: 'ion-ios-more',
    //   subMenu: [{
    //     title: 'Menu Level 1.1',
    //     disabled: true
    //   }, {
    //     title: 'Menu Level 1.2',
    //     subMenu: [{
    //       title: 'Menu Level 1.2.1',
    //       disabled: true
    //     }]
    //   }]
    // });


  }

})();
