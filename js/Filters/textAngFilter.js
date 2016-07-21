myApp.filter('htmlToPlain', function(){
	return function(text){
		return text ? String(text).replace(/(<([^>]+)>)/ig) : '';
	}
})