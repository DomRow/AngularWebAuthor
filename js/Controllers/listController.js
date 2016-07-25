/*
    Element List Area Ctrl
*/
myApp.controller("ElementListCtrl", ['$scope', 'BroadCastFactory','ModalService', function($scope, BroadCastFactory, ModalService) {

    $scope.models = {
        selected: null,
        lists: {"A": []}
    };

    $scope.show = {message : false};

    var tags = $scope.dataItems = ["Image"];

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

myApp.controller('YesNoController', ['$scope', function($scope){
    $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
 };
}])

/*
    Content Area Ctrl for Drop Elements
*/
myApp.controller("ContentElementCtrl",['$scope','PageFactory', '$routeParams',function($scope,PageFactory, $routeParams) {
    
    $scope.$on('cssToggle1', function(event,data){
        var newClass = $scope.newClass = data;
        console.log($scope.newClass);
        console.log("cssToggle1");
        

    })
    $scope.my = { message: false };
    $scope.toggleClass1 = function(){
        $scope.my.message   = !$scope.my.message;        
        console.log($scope.my.message);
    }

    $scope.my = { message2: false };
    $scope.toggleClass2 = function(){
        $scope.my.message   = !$scope.my.message;
        $scope.my.message2   = !$scope.my.message2;
        console.log("toggle 2");
    }

    $scope.my = { message3: false };
    $scope.toggleClass3 = function(){
        $scope.my.message2   = !$scope.my.message2;
        $scope.my.message3   = !$scope.my.message3;
        console.log("toggle 3");
    }

    $scope.tinyMceLoad = function(){
        console.log("Text Area Click");
        $scope.showMce = !$scope.showMce;
        console.log($scope.showMce);

    }

    $scope.$on('cssToggle2', function(event,data){
        var newClass2 = $scope.newClass2 = data;
        console.log($scope.newClass2);

    })

    $scope.$on('eventSend', function(event,data){
        
        var num = $scope.pageToLoad = data;
        
        //$scope.pageObject = $scope.pageArray[num];

        $scope.pageObj = PageFactory.get({pageId : data},
            function(page){
                $scope.pageObject = page.toJSON(page)
                console.log(page);
                //console.log($scope.pageObject.jsonObj);
                var jsonTest = $scope.pageObject.jsonObj;
                
                // console.log(JSON.stringify(jsonTest));
                var ting = $scope.pageObject = eval("("+jsonTest+')');
                return $scope.pageObject;
                console.log($scope.pageObject)      
        })
         


        $scope.showDiv = true;
    })

    $scope.$on('elementSend', function(event, data){
        console.log("Now work the tinymce visibility");
        $scope.mceVisibility = {boolean: true};

    })
    
    $scope.savePtext = function(){
        console.log("Clicked");
        var currentId = $scope.pageToLoad;
        var page = $scope.pageTree = {"page_number":"2","title":"hi","jsonObj":"[{nexus}]"};
        $scope.pText = PageFactory.update({id:4}, $scope.pageTree);
        console.log($scope.pText);
    }

    $scope.closeModal = function(){
        console.log("Closed");   
    }

    $scope.pageArray = [{
        jsonObjNo : 1,
        columns : [{
            items : [
            {
                id: 0,
                type : "image",
                image : {
                    src : "images/officeBuilding1.jpg",
                    width : 400,
                    height : 400,
                    align : "center"
                    //tag:"<img src='"+src+"' width='"+width+"' height='"+height+"' align='"+align+"'>"
                }
            },
            {
                id: 1,
                type: "text",
                text : "Listicle intelligentsia shabby chic banjo, authentic neutra wolf chambray aesthetic helvetica church-key fap. Intelligentsia 3 wolf moon humblebrag, beard godard VHS meggings hammock poutine. 90's small batch intelligentsia cardigan four dollar toast yr YOLO twee mixtape semiotics squid offal. Hashtag meh jean shorts tousled yr, waistcoat letterpress cold-pressed fixie plaid single-origin coffee. Shoreditch cornhole hella man bun, art party blue bottle poutine twee flexitarian chicharrones. Polaroid gastropub yr, tumblr thundercats pabst hammock schlitz. Fap green juice messenger bag cred, truffaut lo-fi occupy",
                size : 12,
                font: "Arial",
                headerStyle: "color:blue;margin-left:30px;",
                headerText: "Heading"

            }]
        }]
    },{
       jsonObjNo : 2,
        columns : [{
            items : [
            {
                id: 0,
                type : "image",
                image : {
                    src : "images/shipyard1.jpg",
                    width : 400,
                    height : 200,
                    align : "center"
                    //tag:"<img src='"+src+"' width='"+width+"' height='"+height+"' align='"+align+"'>"
                }
            },
            {
                id: 1,
                type: "text",
                text : "orem ipsum dolor sit amet, consectetur adipiscing elit. Duis tristique nisl quis enim semper condimentum. In vitae sem vel sapien facilisis euismod a vitae ipsum. Ut in ornare quam, non eleifend purus. Vivamus congue, velit eu efficitur bibendum, dui augue lobortis dui, nec pretium purus sem non tortor. Cras nec velit ante. Mauris dui sapien, lacinia quis turpis ut, mattis tincidunt justo. Proin malesuada mi id massa lacinia, vitae ullamcorper nisl sollicitudin. In odio sem, posuere ut lacus non, bibendum tincidunt dolor. Duis et tortor non nisl dignissim gravida ac eu tellus. Curabitur consequat augue massa, ac convallis ligula ornare eu. Praesent malesuada fermentum metus, id fringilla purus sagittis sed. Sed ac orci metus. Nunc dignissim eros tortor, eget vestibulum turpis cursus vel. Vestibulum ac vestibulum magna. Nunc egestas malesuada turpis, ac pulvinar neque auctor non. Integer lectus justo, pellentesque a facilisis ut, pharetra vel augue.",
                size : 12,
                font: "Arial",
                headerStyle: "color:blue;margin-left:30px;",
                headerText: "Heading"

            }]
        }]
    }]


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
    $scope.$watch('pageArray', function(pageArray) {
        $scope.modelAsJson = angular.toJson(pageArray, true);
        //console.log($scope.modelAsJson);
        //console.log($scope.pageArray);
    }, true);

}]);