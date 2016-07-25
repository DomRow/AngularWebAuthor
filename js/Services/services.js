myApp.factory("PagesFactory", function($resource){
	return $resource("http://localhost/angProj/api/pages", {},{
		query:{ method:'GET', isArray: false },
		create:{ method: "POST" }
	})
});

myApp.factory("PageFactory", function($resource){
	return $resource("http://localhost/angProj/api/pages/:pageId", {},{
		get: { method: 'GET' },
		update: { method: 'PUT' },
		delete: { method: 'DELETE', params: {id:'@id'} }
	})

})


myApp.factory("BroadCastFactory", function($rootScope){
	var sharedEvent = {};

	sharedEvent.prepForBroadcast = function(e,msg){
		this.event = e;
		this.message = msg;
		this.broadcastItem(e, msg);
	};

	sharedEvent.broadcastItem = function(e,msg){
		$rootScope.$broadcast(e, msg);
	};

	return sharedEvent;
});