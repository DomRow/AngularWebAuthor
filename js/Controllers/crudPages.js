var mainURL = "http://localhost/BasicAngSlimPhph/api/pages";

myApp.controller('GlobalCtrl', ['$scope', '$window', 'PagesFactory','PageFactory',
	function($scope, $window, PagesFactory, PageFactory){
		$scope.pages = PagesFactory.query(function(data){
			$scope.pages = data.page;

			/*$on takes the scope info passed from $broadcast*/
			$scope.$on('emit', function(event, data){
				//console.log(data);
			})
		})
	}
	]);		

myApp.controller('GetListCtrl', ['$scope', '$window', 'PagesFactory','PageFactory',
	function($scope, $window, PagesFactory, PageFactory){
		$scope.editPage = function (pageId){
			$window.location.href = '#/page-detail/' + pageId;
		};

	// $scope.deletePage = function (pageId){
	// 	PageFactory.delete({ id: pageId });
	// 	$scope.pages = PagesFactory.query();
	// }

	$scope.newPage = function () {
		$window.location.href = ('#/pages/new');
	}
	/*This query (GET) is called twice, add 
		console.log(data);
		To print see*/
		$scope.pages = PagesFactory.query(function(data){
			$scope.pages = data.page;
		});
	}]);

myApp.controller('AddPageCtrl', ['$scope', '$window', '$routeParams', 'PagesFactory','BroadCastFactory',
	function($scope, $window, $routeParams, PagesFactory, BroadCastFactory) {
		if($routeParams.pageId === undefined){
			$scope.page = new PagesFactory();
		}
		else{
			console.log("else");
			$scope.page = PagesFactory.get({
				pageId : $routeParams.pageId},
				function(page){
					console.log("Page Retrieved: " +$scope.page);
				})	
		}

		$scope.addPage = function () {
			PagesFactory.save($scope.page, function(){
				console.log("Page save");
			}, function(err){
				console.log(err);
			});
			$window.location.href = '#/pages';
		}

		$scope.displayHtml = function(e, msg){
			$scope.event = e = 'eventSend';
			BroadCastFactory.prepForBroadcast(e,msg);
			console.log(BroadCastFactory);
		}

		$scope.$on('eventSend', function(){
			$scope.message = BroadCastFactory.message;
				//console.log($scope.message);
			})
	}]);

myApp.controller('PageDetailCtrl', ['$scope','$routeParams','PageFactory','$window',
	function($scope, $routeParams, PageFactory, $window){

		$scope.updatePage = function () {
			PageFactory.update($scope.page);
			$window.location.href = '#/pages';
		};

		$scope.cancelPage = function () {
			console.log("Cancel click");
			$window.location.href = '#/pages';
		};

		$scope.page = PageFactory.show({id: $routeParams.id});

	}]);


myApp.controller('ContentCtrl', ['$scope', 'PagesFactory','PageFactory',
	function($scope, PagesFactory, PageFactory){
		$scope.pagesContent = PagesFactory.query(function(data){
			$scope.pages = data.page;
				//console.log($scope);

				$scope.popHtml = function(pageNum){
					var pages = $scope.pages;

					for(i =0; i < pages.length; i++){
						if(pages[i].id == pageNum){
							var matched = $scope.matched = pages[i];
							console.log(matched.id);
							$scope.match = matched.innerHTML;
						 	//console.log($scope.match);
						 };
						}

					}

					$scope.$on('eventSend', function(event, data){
						var pageNum = $scope.pageNum = data;
						$scope.popHtml(pageNum);
					})

					$scope.$on('elementSend', function(event,data){
						var pop = $scope.popElement = data;
						$scope.match = $scope.match + $scope.popElement;
						
					})

					$scope.updateHtml = function(){
						console.log($scope.matched.id);
						//$scope.file = PageFactory.update({ id: $scope.matched.id }, function(){
							//console.log($scope.file.page);	}
							$scope.file = PageFactory.get({ id: $scope.matched.id });	
							$scope.test = $scope.file.innerHTML;
							$scope.file2 = PageFactory.update({ id:3},{"innerHTML":"<new>"});	
							console.log($scope.file2);
							//);
						
						//$scope.updatedHtml = PageFactory.update({id:2},);
					};
				})
	}])

myApp.controller('ElementCtrl', ['$scope','BroadCastFactory', function($scope, BroadCastFactory){
	$scope.elements = {
		1 : '<img>',
		2 : '<article></article>'
	}

	// $scope.addElement = function(e,ele){
	// 	$scope.event = e = 'elementSend';
	// 	BroadCastFactory.prepForBroadcast(e,ele);
	// 	console.log(BroadCastFactory);
	// };


}])