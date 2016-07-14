/*ContentPop broadcasts element information to other directives*/
myApp.directive('contentPop', function(){
	return	function($scope, element, attrs){
		element.bind('click', function(){
			var id = $scope.dataId = attrs.id;

		})
	}
})

myApp.directive('contentPush', function(){
	return{
		scope: {
			name: '@'
		},
		template:'{{ name }}',
		link: function ($scope, element, attrs){
			element.bind('click', function(){
				console.log(element);
			});
		}
	}
});

myApp.directive('elementPush', function(){
	return{
		scope:{
			tag: '@'
		},
		link: function ($scope, element, attrs){
			element.bind('click', function(){
				//console.log($scope.tag);
			});
		}
	}
})
