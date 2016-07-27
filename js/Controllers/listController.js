/*
    Element List Area Ctrl
*/

myApp.controller('ElementCtrl', ['$scope','BroadCastFactory', function($scope, BroadCastFactory){
    $scope.elements = {
        1 : '<img>',
        2 : '<article></article>',
        3 : '<textarea ui-tinymce="tinymceOptions" ng-model="tinymceModel"></textarea>'
    }
    $scope.addElement = function(e,ele){
        $scope.event = e = 'elementSend';
        BroadCastFactory.prepForBroadcast(e,ele);
    };

}])

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


/*
    Content Area Ctrl for Drop Elements
*/
myApp.controller("ContentAreaCtrl",['$scope','PageFactory', '$routeParams',function($scope,PageFactory, $routeParams) {
    
    $scope.$on('cssToggle1', function(event,data){
        var newClass = $scope.newClass = data;
        console.log($scope.newClass);
        console.log("cssToggle1");    
    })

    $scope.my = { message: false };
    $scope.toggleClass1 = function(){
        console.log("toggle 1");
        $scope.pageObject.columns[0].items[0].cssClass = "defaultClass5";
        $scope.pageObject.columns[0].items[1].cssClass = "defaultClass6";
        //$scope.my.message = !$scope.my.message;        
        
    }

    $scope.my = { message2: false };
    $scope.toggleClass2 = function(){
        console.log("toggle 2");
        //$scope.my.message   = !$scope.my.message;
        //$scope.my.message2   = !$scope.my.message2;
        
        //cycle through classes array and bind new value to columns object
        $scope.pageObject.columns[0].items[0].cssClass = "defaultClass3";
        $scope.pageObject.columns[0].items[1].cssClass = "defaultClass4";

    }

    $scope.updateHtml = function(){
        console.log("update");
        //json component
        var jsonPage = $scope.pageObject;
        var jsonString = $scope.jsonString = JSON.stringify(jsonPage);
        //full object ie page/id/proj/jsonObj
        var fullPageObject = $scope.pageObj;
        $scope.pageClassToBeUploaded = {page_number:fullPageObject.page_number,title:fullPageObject.title, jsonObj:jsonString};
        $scope.pageWithNewClasses = PageFactory.update({id:$scope.pageObj.id}, $scope.pageClassToBeUploaded);
    };


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

        $scope.pageObj = PageFactory.get({id : data},
            function(page){
                $scope.pageLoad = page;
                $scope.pageObject = page.toJSON(page)
                console.log(page);
                //console.log($scope.pageObject.jsonObj);
                var jsonTest = $scope.pageObject.jsonObj;
                console.log(jsonTest);
                // console.log(JSON.stringify(jsonTest));

                var ting = $scope.pageObject = eval("("+jsonTest+")");
                console.log(ting);
                // console.log(ting.columns[0].items[0]);
                // console.log(ting.columns[0].items[1]);
                return $scope.pageObject;
                
        })
    })

    $scope.$on('elementSend', function(event, data){
        $scope.mceVisibility = {boolean: true};
    })
    
    $scope.savePtext = function(){
        alert("Are you sure?")
        var currentId = $scope.pageToLoad;
        console.log($scope.pageToLoad);
        //new empty text variable 
        var newText = $scope.nextTextBound = "";
        //Bind new text to variable
        var textToBeBound = $scope.htmlVariable;
        console.log(textToBeBound);
        //Bind back to JSON object's text value
        $scope.pageObject.columns[0].items[1].text = textToBeBound;
        //
        $scope.testString = JSON.stringify($scope.pageObject);
        console.log($scope.testString);
        $scope.pageToBeUploaded = {page_number:$scope.pageLoad.page_number,title:$scope.pageLoad.title, jsonObj:$scope.testString};
        console.log($scope.pageToBeUploaded);
        //Update data base 
        $scope.pText = PageFactory.update({id:$scope.pageToLoad}, $scope.pageToBeUploaded);
        //pageObject is just the json value
        
    }

    $scope.closeModal = function(){
        $scope.mceVisibility = {boolean: false};  
    }

    $scope.dropFunc = function(e){
        console.log(e.target.attributes.type);
        console.log(e.toElement);
    }

    // // Generate initial model
    // for (var i = 1; i <= 3; ++i) {
    //     $scope.models.lists.A.push({label: "Image" + i});
    //     $scope.models.lists.B.push({label: "Item B" + i});
    // }

    // // Model to JSON for demo purpose
    // $scope.$watch('pageArray', function(pageArray) {
    //     $scope.modelAsJson = angular.toJson(pageArray, true);
    //     console.log($scope.modelAsJson);
    //     console.log($scope.pageArray);
    // }, true);

}]);