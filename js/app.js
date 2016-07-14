var myApp = angular.module('dropTests',['ngRoute','ngDragDrop', 'ngResource','ui.tinymce','dndLists']);

myApp.config(['$routeProvider',
  function($routeProvider) {
  $routeProvider.
  when('/pages',{
    templateUrl: 'templates/pageList.html',
    controller: 'GetListCtrl'
  }).
  when('/pages/new', {
  	templateUrl: 'templates/new-page.html',
  	controller: 'AddPageCtrl'
  }).
  when('/pages/:id', {
    templateUrl: 'templates/page-detail.html',
    controller: 'PageDetailCtrl'
  }).
  otherwise({
  	redirectTo: '/pages'
  });
}]);





