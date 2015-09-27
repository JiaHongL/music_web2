var $key,$channelId,$youtube_api;
$key = 'AIzaSyCfmi2Rsd5cjHV_-cW0avDqn5Nzq1k7EDA';  // V3 需要key才能使用api
$youtube_api = 'https://www.googleapis.com/youtube/v3'; //youtube api
$channelId ='UCNjmu0sCgPqyK8GnsFfPKFw';  //測試
// $channelId2 = 'UCQHthJbbEt6osR39NsST13g';
// $channelId = 'UCyxa_MccoDQwPTlRBC0CYkg';  //被訂閱者ID
var now_total = 12;   //目前載入&收尋顯示筆數
var next_Items = 12;  //每下一頁顯示的筆數
var part = "snippet";//向api要得資料
var part2="snippet,statistics"
var part3="snippet,contentDetails"




myApp.controller('searchedCtrl', function($scope,$location, $routeParams, $http) {		
	// $scope.time_temp = [];
	//載入的時候
	var videoId = $routeParams.videoId;
	var next = $routeParams.next;
	var prev = $routeParams.prev;
	var search=$routeParams.search;

	$http({
		url:$youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&part="+part+"&pageToken="+next+"&maxResults="+next_Items+"&order="+order+"&type=video&q="+search,
		method: 'get',
		cache: false
		}).success(function(data, status, headers, config) {
			var prev_p = data.prevPageToken;
				$http({
					 url:$youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&part="+part+"&pageToken="+prev_p+"&maxResults="+next_Items+"&order="+order+"&type=video&q="+search,
					 method: 'get',
					 cache: false
					   }).success(function(data, status, headers, config) {
					   		start_Quantity=0;
							$scope.lists = data.items;
							$scope.next = data.nextPageToken;
							$scope.prev = data.prevPageToken;
							$scope.search=search;
							$scope.play2(videoId);							
					});	
		});


	//觀看次數
	$scope.statistics = function(id){

	 $http({
			url: $youtube_api+"/videos?part=" + part2 + "&id=" + id +"&key=" + $key,
			method: 'get',
			cache: false
		   }).success(function(data, status, headers, config) {
		   	$scope.views = data.items[0].statistics.viewCount;
		   	$scope.likecount = data.items[0].statistics.likeCount;
		   	$scope.page_title = data.items[0].snippet.title;
		   	$scope.likes = data.items[0].statistics.likeCount;
		   	$scope.dislikes = data.items[0].statistics.dislikeCount;
		   	// console.log($youtube_api+"/videos?part=" + part2 + "&id=" + id +"&key=" + $key);
		});
	}

	

	
	//下一頁
	$scope.next_page = function(next){
		console.log(next);
     	 $http({
			 url:$youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&part="+part+"&pageToken="+next+"&maxResults="+next_Items+"&order="+order+"&type=video&q="+search,
			 method: 'get',
			 cache: false
			   }).success(function(data, status, headers, config) {
			   	start_Quantity=0;
				$scope.next = data.nextPageToken;
				$scope.prev = data.prevPageToken;
				$scope.search = search;
				$scope.lists = data.items;
				console.log(data);
        		$location.path("/search/"+search+"/"+data.items[0].id.videoId+"/"+data.nextPageToken+"/"+data.prevPageToken);
			});
	}


	//上一頁
	$scope.prev_page = function(prev){
     	 $http({
			 url:$youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&part="+part+"&pageToken="+prev+"&maxResults="+next_Items+"&order="+order+"&type=video&q="+search,	
			 method: 'get',
			 cache: false
			   }).success(function(data, status, headers, config) {
			   	start_Quantity=0;
				$scope.next= data.nextPageToken;
				$scope.prev= data.prevPageToken;
				$scope.search=search;
				$scope.lists =data.items;	
        		$location.path("/search/"+search+"/"+data.items[0].id.videoId+"/"+data.nextPageToken+"/"+data.prevPageToken);
			});
	}

	//收尋
	$scope.sing_sub=function(){
		$location.path('/search/'+ $("#sing_text").val());
	}

		//播放
	$scope.play2 = function(id) {
		start_Quantity=0;
		$('body,html').animate({scrollTop:0},400);
		$scope.url=id;
		$scope.statistics(id);
		$scope.start_time="?autoplay=1";
		start_Quantity=0;
	}


	//滑鼠移入換圖
	$scope.mouseover = function() {
		 $("#sing_sub").css('background-image', 'url(img/purple.jpg)');
	}

	//滑鼠移出換圖
	$scope.mouseout = function() {
		$("#sing_sub").css('background-image', 'url(img/blue.jpg)');
	}


	// //滑鼠移入
	$scope.mouseover2 = function() {
 	this.look=true;
	}
	 // ng-mouseover="look=true"

	//滑鼠移出
	$scope.mouseout2 = function() {
	this.look=false;
	}

	
		//播放
	$scope.startplay=function(){

		if (start_Quantity==0)
			{	
			// console.log("start...");
			$scope.start_time="?autoplay=1";
			start_Quantity=1;
			$scope.$apply();	
			}
			else
			{
			// console.log("end...");
			$scope.start_time="";
			start_Quantity=0;
			$scope.$apply();	
			}
	}

	// //播放time
	// $scope.time_data = function(data){
		
	// 	var lists = data.items.length;
	// 	for (var i in data.items){
	// 	 $http({
	// 			url: $youtube_api+"/videos?part=" + part3 + "&id=" + data.items[i].id.videoId +"&key=" + $key,
	// 			method: 'get'
	// 		   }).success(function(data, status, headers, config) {
	// 		   	 	$scope.time_temp.push($scope.time_fromat(data.items[0].id));
	// 		   	    $scope.time_temp.push($scope.time_fromat(data.items[0].contentDetails.duration));
	// 		   	 	console.log($scope.lists);
	// 		   	 	console.log($scope.time_temp);
	// 		   	 	if ($scope.time_temp.length == lists * 2) {
	// 					for (var j = 0; j <= 11; j++) {
	// 			   	 		for (var k = 0; k <= lists * 2; k += 2) {
	// 			   	 			console.log(k);
	// 					   	 	if ($scope.lists[j].id.videoId == $scope.time_temp[k]) {

	// 					   	 		console.log($scope.lists[j].id.videoId);
	// 					   	 		console.log("yes");
	// 					   	 	};
	// 				   	 	};
	// 				   	};
	// 		   	 	}
	// 		});
	// 	  }
	// }

	// //時間格式轉換
	// $scope.time_fromat = function(time){
	// var new_time 
	// new_time=time.replace(/PT/, " ").replace(/M/,":").replace(/S/,"")
	// return new_time;	
	// }

// //本頁點的這首歌
	// $scope.thispage = function(next){
 //     	 $http({
	// 		 url:$youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&part="+part+"&pageToken="+next+"&maxResults="+next_Items+"&type=video",
	// 		 method: 'get',
	// 		 cache: false
	// 		   }).success(function(data, status, headers, config) {
	// 			var prev_p = data.prevPageToken;
	// 			$http({
	// 				 url:$youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&part="+part+"&pageToken="+prev_p+"&maxResults="+next_Items+"&type=video",
	// 				 method: 'get',
	// 				 cache: false
	// 				   }).success(function(data, status, headers, config) {
	// 					$scope.lists = data.items;
	// 					$scope.next= data.nextPageToken;
	// 					$scope.prev= data.prevPageToken;
	// 					$scope.play2(videoId);	
	// 				});	
	// 		});
	// }


});