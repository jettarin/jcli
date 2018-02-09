(function() {
  'use strict';

  angular.module('BlurAdmin.pages.authSignIn')
    .controller('authSignInCtrl', authSignInCtrl);

  /** @ngInject */
  function authSignInCtrl($scope, localStorage, $state, toastr, $http, md5) {
    var vm = this;

    vm.logar = logar;

    init();





    function init() {
      localStorage.clear();
    }
    function logar() {
      var dadosUser = {
        user: vm.user,
        passWord: vm.password
    };

      let token = dadosUser.token
      console.log(token);

    let hash =   md5.createHash(vm.password).toUpperCase()

      console.log(hash);
      $http({
        url: APP.CONTEXT_PATH+'/api/login',
        method:'GET',
        params: {
          username:vm.user,
          password: hash
        }
      }).then(function (resp){

        $scope.authen = resp.data
        console.log($scope.authen);
        if($scope.authen.data){
          localStorage.setObject('dataUser', $scope.authen.data);
          $state.go('main.patient');
          toastr.success(' Success ', 'Login !', {})
        }else{
          toastr.error('  ', ' กรุณาตรวจสอบการกรอกใหม่ !', {})
        }
      })


    }
  }
})();
