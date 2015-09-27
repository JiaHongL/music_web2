// var $key,$channelId,$youtube_api;
// $key = 'AIzaSyCfmi2Rsd5cjHV_-cW0avDqn5Nzq1k7EDA';  // V3 需要key才能使用api
// $youtube_api = 'https://www.googleapis.com/youtube/v3'; //youtube api
//  $channelId ='UCCsUQXwhDj4iVlhG4VCq6Kg';  //測試
// // $channelId = 'UCQHthJbbEt6osR39NsST13g';
// // $channelId = 'UCyxa_MccoDQwPTlRBC0CYkg';  //被訂閱者ID
// var nextPageToken;   //下一頁token
// var prevPageToken;   //上一頁token
// var now_total = 12;   //目前載入&收尋顯示筆數
// var next_Items = 12;  //每下一頁顯示的筆數
// var totalResults;
// var part = "snippet";//向api要得資料
// var part2="snippet,statistics"
// var part3="snippet,contentDetails"
// var query; //收尋字
// var order = "viewCount"; //排序 
// var temp_search ;  //暫存收尋字
// var check_search_nextpage = false; //判斷是載入or查詢的下一頁



// myApp.controller('TableFilterCtrl', function($scope, $routeParams, $http) {		
// 	// $scope.time_temp = [];
// 	//載入的時候
// 	var videoId = $routeParams.videoId;
// 	var next = $routeParams.next;
// 	var prev = $routeParams.prev;
// 	// '/videos/:videoId/next=:next/prev=:prev'
// 	console.log(videoId);
// 	console.log(next);
// 	console.log(prev);
// 	$http({
// 		url:$youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&maxResults="+now_total+"&part="+part+"&type=video",
// 		method: 'get',
// 		cache: false
// 	}).success(function(data, status, headers, config) {
// 		if (typeof(videoId) == 'undefined' || videoId == null)  {
// 		$scope.first_page();
// 		console.log("111");
// 		}
// 		else
// 		{
// 		console.log("");
// 		}
// 	});

// 	//觀看次數
// 	$scope.statistics = function(id){

// 	 $http({
// 			url: $youtube_api+"/videos?part=" + part2 + "&id=" + id +"&key=" + $key,
// 			method: 'get',
// 			cache: false
// 		   }).success(function(data, status, headers, config) {
// 		   	$scope.views=data.items[0].statistics.viewCount;
// 		   	$scope.likecount=data.items[0].statistics.likeCount;
// 		});
// 	}


// 	//第一次載入
// 	$scope.first_page = function(){
// 	$http({
// 		url:$youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&maxResults="+now_total+"&part="+part+"&type=video",
// 		method: 'get',
// 		cache: false
// 	}).success(function(data, status, headers, config) {
// 		nextPageToken = data.nextPageToken;
// 		$scope.next= data.nextPageToken;
// 		$scope.prev= data.prevPageToken;
//         $scope.lists = data.items;   //要做迴圈要到那項目的陣列 items[1,2,3]
//         $scope.page_title = data.items[0].snippet.title;
//         $scope.url=data.items[0].id.videoId;
//         totalResults=data.pageInfo.totalResults
//         $scope.look=false;
//         $scope.playing=false;
//         $scope.statistics(data.items[0].id.videoId);
//         // $scope.time_data(data);
// 	});
// 	}

// 	//下一頁
// 	$scope.next_page = function(next){
//      	 $http({
// 			 url:$youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&part="+part+"&pageToken="+nextPageToken+"&maxResults="+next_Items+"&type=video",
// 			 method: 'get',
// 			 cache: false
// 			   }).success(function(data, status, headers, config) {
// 				 nextPageToken = data.nextPageToken;
// 				 prevPageToken = data.prevPageToken;
// 				 $scope.next= data.nextPageToken;
// 				$scope.prev= data.prevPageToken;
// 				$scope.lists = data.items;	
// 			});
// 	}


// 	//上一頁
// 	$scope.prev_page = function(prev){
//      	 $http({
// 			 url:$youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&part="+part+"&pageToken="+prevPageToken+"&maxResults="+next_Items+"&type=video",
// 			 method: 'get',
// 			 cache: false
// 			   }).success(function(data, status, headers, config) {
// 				nextPageToken = data.nextPageToken;
// 				prevPageToken = data.prevPageToken;
// 				$scope.next= data.nextPageToken;
// 				$scope.prev= data.prevPageToken;
// 				$scope.lists =data.items;	
// 				 check_Loading=false
// 			});
// 	}



// 	//播放
// 	$scope.play = function(id,title) {
// 		$('body,html').animate({scrollTop:0},400);
// 		$scope.url=id;
// 		$scope.page_title = title;
// 		 $scope.statistics(id);
// 	}



// 	//滑鼠移入換圖
// 	$scope.mouseover = function() {
// 		 $("#sing_sub").css('background-image', 'url(img/purple.jpg)');
// 	}

// 	//滑鼠移出換圖
// 	$scope.mouseout = function() {
// 		$("#sing_sub").css('background-image', 'url(img/blue.jpg)');
// 	}


// 	// //滑鼠移入
// 	$scope.mouseover2 = function() {
//  	this.look=true;
// 	}
// 	 // ng-mouseover="look=true"

// 	//滑鼠移出
// 	$scope.mouseout2 = function() {
// 	this.look=false;
// 	}

// 	// //播放time
// 	// $scope.time_data = function(data){
		
// 	// 	var lists = data.items.length;
// 	// 	for (var i in data.items){
// 	// 	 $http({
// 	// 			url: $youtube_api+"/videos?part=" + part3 + "&id=" + data.items[i].id.videoId +"&key=" + $key,
// 	// 			method: 'get'
// 	// 		   }).success(function(data, status, headers, config) {
// 	// 		   	 	$scope.time_temp.push($scope.time_fromat(data.items[0].id));
// 	// 		   	    $scope.time_temp.push($scope.time_fromat(data.items[0].contentDetails.duration));
// 	// 		   	 	console.log($scope.lists);
// 	// 		   	 	console.log($scope.time_temp);
// 	// 		   	 	if ($scope.time_temp.length == lists * 2) {
// 	// 					for (var j = 0; j <= 11; j++) {
// 	// 			   	 		for (var k = 0; k <= lists * 2; k += 2) {
// 	// 			   	 			console.log(k);
// 	// 					   	 	if ($scope.lists[j].id.videoId == $scope.time_temp[k]) {

// 	// 					   	 		console.log($scope.lists[j].id.videoId);
// 	// 					   	 		console.log("yes");
// 	// 					   	 	};
// 	// 				   	 	};
// 	// 				   	};
// 	// 		   	 	}
// 	// 		});
// 	// 	  }
// 	// }

// 	// //時間格式轉換
// 	// $scope.time_fromat = function(time){
// 	// var new_time 
// 	// new_time=time.replace(/PT/, " ").replace(/M/,":").replace(/S/,"")
// 	// return new_time;	
// 	// }


// });

