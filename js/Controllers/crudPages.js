/*
	This file contains the 
*/
var mainURL = "http://localhost/angProj/api/pages";

/*
	Global control makes the page objects returned from the DB accessible by the other controllers.
	Thus acting as a parent scope
*/
myApp.controller('GlobalCtrl', ['$scope', '$window', 'PagesFactory','PageFactory',
	function($scope, $window, PagesFactory, PageFactory){
		$scope.pages = PagesFactory.query(function(data){
			$scope.pages = data.page;
		})
	}
]);		

myApp.controller('GetListCtrl', ['$scope', '$window', 'PagesFactory','PageFactory',
	function($scope, $window, PagesFactory, PageFactory){

	$scope.editPage = function (pageId){
		$window.location.href = '#/page-detail/' + pageId;
	};

	$scope.deletePage = function (pageId){
		console.log("Delete Page " +padeId);
	}

	$scope.newPage = function (e,ele) {
		$window.location.href = ('#/pages/new');
		$scope.showNewPage = {boolean:true};
		console.log($scope.showNewPage.boolean);
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

		$scope.reloadPages = function(){
			PagesFactory.query(function(data){
				$scope.pages = data.page;
			})
		}	

		$scope.addPage = function () {
			PagesFactory.save($scope.page, function(){
				console.log($scope.page);
				console.log("Page save");
				//reload pages
				$scope.reloadPages();
				$window.location.href = '#/pages';
			}, function(err){
				console.log(err);
				console.log($scope.page);
			});
		};

		$scope.$on('eventSend', function(event,data){
			console.log(data);
			
			console.log($scope.pageNumber);

		});

		$scope.pageNumber = 3;

		$scope.deletePage = function(){
			console.log("delete page clicked");
			//currentPage = ?
			//id = ?
			//factory.delete(id)
			//reloadPages()
		};

		$scope.displayHtml = function(e, msg){
			$scope.event = e = 'eventSend';
			BroadCastFactory.prepForBroadcast(e,msg);
			console.log(BroadCastFactory);
		}


		$scope.cancelPage = function () {
			console.log("Cancel click");
			$window.location.href = '#/pages';
		};

	}]);

myApp.controller('PageDetailCtrl', ['$scope','$routeParams','PageFactory','$window',
	function($scope, $routeParams, PageFactory, $window){

		$scope.updatePage = function () {
			PageFactory.update($scope.page);
			$window.location.href = '#/pages';
		};

		$scope.page = PageFactory.show({id: $routeParams.id});

	}]);


myApp.controller('ContentCtrl', ['$scope', 'PagesFactory','BroadCastFactory','PageFactory',
	function($scope, PagesFactory, BroadCastFactory, PageFactory){
		$scope.pagesContent = PagesFactory.query(function(data){
			$scope.pages = data.page;

			$scope.popHtml = function(pageNum){
				var pages = $scope.pages;
				for(i =0; i < pages.length; i++){
					if(pages[i].id == pageNum){
						var matched = $scope.matched = pages[i];
						$scope.match = matched.innerHTML;
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

			$scope.classesCss = ["default2","default3"];

			$scope.toggleClass1 = function(){
				$scope.cssEvent1 = e = 'cssToggle1';
				var classSend = $scope.classesCss[0]; 
				BroadCastFactory.prepForBroadcast(e, classSend);
				console.log(BroadCastFactory);
			}

			$scope.toggleClass2 = function(){
				$scope.cssEvent2 = e = 'cssToggle2';
				var classSend = $scope.classesCss[1]; 
				BroadCastFactory.prepForBroadcast(e, classSend);
				console.log(BroadCastFactory);
			}

		})
}])

