
myApp.directive("goFor", function(){
  return function($scope, element, attrs){
    element.bind("click", function(){
      console.log("directive call");
      $scope.$apply('fun.start()')
    })
  }    
})


// myApp.directive('classTest', function(){
//   return{
//     restrict: 'E',
//     scope:{
//       value: "="
//     },
//     template:
//       '<div class=' +value[0] + '>Test</div>',
//     replace: true  
//   }
// });

myApp.directive('classRem', function(){
 return function(scope, element, attrs) {
  
  scope.$watch(attrs.classRem, function(newVal) {
    if (newVal) {
      element.removeClass(element[0].className);
      
      //element.addClass("defaultClass2")
    } else {
      //console.log("Nothing perfomred");
    }
  })
}
})


/*--------Directives-----------------------*/

myApp.directive("addPage", ['Page', function(popupService){
  return{
    restrict: "A",
    link: function (scope, element, attrs){
      element.bind("click", function() {
        console.log("addPage")
        //popupService.addPage;
        //ADD NEW <li> to page list
      });
    }
  }
}]);

/*----------------------------------------------*/








/*----------------------------------------------*/


myApp.directive('myDraggable', ['$document', function($document) {
  return {
    templateUrl: 'templates/temp1.html',
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      element.css({
       position: 'relative',
       border: '1px solid red',
       backgroundColor: 'lightgrey',
       cursor: 'pointer'
     });

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}]);





