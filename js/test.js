myApp.controller('TableFilterCtrl',function ($scope, $http) {
	var limit = 20,
		page = 1;
	$http({
		url:'http://media.karaokecloud.com/songs?limit='+limit+'&page='+page,
		method: 'get',
		cache: true
	}).success(function(data, status, headers, config) {
		$scope.lists = data.data;
	});



	$scope.nextpage=function(){
		page = page + 1;
		$http({
			url:'http://media.karaokecloud.com/songs?limit='+limit+'&page='+page,
			method: 'get',
			cache: true
		}).success(function(data, status, headers, config) {
			$scope.lists = data.data;
		});
	}

	$scope.previouspage=function(){
		page = page - 1;
		$http({
			url:'http://media.karaokecloud.com/songs?limit='+limit+'&page='+page,
			method: 'get',
			cache: true
		}).success(function(data, status, headers, config) {
			$scope.lists = data.data;
		});
	}

	$scope.anypage=function(anypage_count){
		page = anypage_count ;
		$http({
			url:'http://media.karaokecloud.com/songs?limit='+limit+'&page='+page,
			method: 'get',
			cache: true
		}).success(function(data, status, headers, config) {
			$scope.lists = data.data;
		});
	}
})