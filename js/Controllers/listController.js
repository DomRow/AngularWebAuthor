/*
    Element List Area Ctrl
*/
myApp.controller("ElementListCtrl", ['$scope', 'BroadCastFactory', function($scope, BroadCastFactory) {

    $scope.models = {
        selected: null,
        lists: {"A": []}
        //, "B": []
    };

    var tags = $scope.dataItems = ["Image", "Text"];

    // Generate initial model
    for (var i = 0; i <= tags.length; i++) {
        $scope.models.lists.A.push({label: tags[i]});
        //$scope.models.lists.B.push({label: "Text"});
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

    $scope.dropElement = function(e,ele){
        $scope.event = e = 'elementDrop';
        BroadCastFactory.prepForBroadcast(e,ele);
        console.log(BroadCastFactory);
    };

}]);


/*
    Content Area Ctrl for Drop Elements
*/
myApp.controller("ContentElementCtrl", function($scope) {

    $scope.toggleClass1 = function(){
        console.log("Toggle");
    }

    $scope.models = {
        selected: null,
        templates:[
            {type: "item", id: 2},
            {type: "container", id:1, columns:[[],[]]}
        ],
        dropzones:{
            "A":[
                {
                    "type": "container",
                    "id": 1,
                    "columns":[
                        {
                            "type": "item",
                            "id" : "1"
                        }
                    ]
                }
            ],
            "B":[
                {
                    "type": "container",
                    "id": 2,
                    "columns":[
                        {
                            "type": "item",
                            "id" : "1"
                        }
                    ]
                }
            ]
        }
    };


    // // Generate initial model
    // for (var i = 1; i <= 3; ++i) {
    //     $scope.models.lists.A.push({label: "Image" + i});
    //     //$scope.models.lists.B.push({label: "Item B" + i});
    // }



    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

});