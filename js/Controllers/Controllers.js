/*--------Controllers-----------------------*/

function TestCtrl(){
  var self = this;

  self.start = function(){
    console.log("CLICKED MASSIVE");
  }
}
myApp.controller('TestCtrl', TestCtrl);

// myApp.controller('ContentCtrl', ['$scope', function($scope){
//   $scope.styleCh1 = false;
//   $scope.classArray = {
//     1:"default1",
//      2 : "styleCh1"
//    };
//   $scope.default1 = true;
//   $scope.toggleClass1 = function() {
//     console.log("clucked")  ;
//   }


//     $scope.boolean1 = function(){
//       console.log("boolean1");
//       $scope.boolean1 = !$scope.boolean1;
//     };

// }])

// myApp.controller('ContentCtrl2', ['$scope', function($scope){
//   $scope.styleCh1 = false;
//   $scope.default1 = true;
//   $scope.toggleClassCtrl2 = function() {
//     console.log("ContentCtrl2")  
//   }

// }])

// myApp.controller('FormatCtrl', ['$scope', function($scope){
//   $scope.button1 = false;
//   $scope.toggleCss = function(){
//     $scope.button1 = true;
//     console.log("Css button1:" + $scope.button1);
//   }
  
// }]);



myApp.controller('addHtmlCtrl', ['$scope','$sce', function($scope){
  $scope.pageTemp = '<li>Page</li>';
  $scope.boundHtml = $sce.trustAsHtml(pageTemp);
}])


// myApp.controller('ListCtrl', ['$scope', '$resource','$window' ,'Page',function($scope, $resource, $window, Page){
//   // $scope.pages = Page.query(function(data){
//   //   console.log('pages retieved: ' );
//   //   console.log(data);
//   // });
//   $scope.pages = popupService.pages;}])