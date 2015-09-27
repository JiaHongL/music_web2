var $key,$channelId,$youtube_api;
$key = 'AIzaSyCfmi2Rsd5cjHV_-cW0avDqn5Nzq1k7EDA';  // V3 需要key才能使用api
$youtube_api = 'https://www.googleapis.com/youtube/v3'; //youtube api
$channelId ='UCNjmu0sCgPqyK8GnsFfPKFw';  //測試
var now_total = 12;   //目前載入&收尋顯示筆數
var next_Items = 12;  //每下一頁顯示的筆數
var part = "snippet";//向api要得資料
var part2="snippet,statistics"
var part3="snippet,contentDetails"
var start_Quantity=0;




myApp.controller('LoadingCtrl', function($scope, $location, $routeParams, $http) {		
	var videoId = $routeParams.videoId;
	var next = $routeParams.next;
	var prev = $routeParams.prev;

	$http({
		url:$youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&maxResults="+now_total+"&part="+part+"&type=video",
		method: 'get',
		cache: false
	}).success(function(data, status, headers, config) {
		start_Quantity=0;
		$scope.next= data.nextPageToken;
		$scope.prev= data.prevPageToken;
        $scope.lists = data.items;   //要做迴圈要到那項目的陣列 items[1,2,3]
        $scope.page_title = data.items[0].snippet.title;
        $scope.url = data.items[0].id.videoId;
        totalResults = data.pageInfo.totalResults
        $scope.look = false;
        $scope.playing = false;
        $scope.statistics(data.items[0].id.videoId);
        // $scope.time_data(data);
        // console.log(data);
	});

	//觀看次數
	$scope.statistics = function(id){
	 $http({
			url: $youtube_api+"/videos?part=" + part2 + "&id=" + id +"&key=" + $key,
			method: 'get',
			cache: false
		   }).success(function(data, status, headers, config) {
		   	$scope.views = data.items[0].statistics.viewCount;
		   	$scope.likes = data.items[0].statistics.likeCount;
		   	$scope.dislikes =  data.items[0].statistics.dislikeCount;
		   	$scope.page_title = data.items[0].snippet.title;
		   	// console.log($youtube_api+"/videos?part=" + part2 + "&id=" + id +"&key=" + $key);
		});
	}

	// 			//播放time
	// $scope.time_data = function(data){
	// var time_temp = [];
	// console.log(data);	
	// for (var i in data.items){
	//  $http({
	// 		url: $youtube_api+"/videos?part=" + part3 + "&id=" + data.items[i].id.videoId +"&key=" + $key,
	// 		method: 'get',
	// 		cache: true
	// 	   }).success(function(data, status, headers, config) {
	// 	   	 	console.log(data);
	// 	   	 	console.log($scope.time_fromat(data.items[0].contentDetails.duration));
	// 	   	 	time_temp.push($scope.time_fromat(data.items[0].contentDetails.duration));
	// 	   		if ((time_temp.length -1) == i) {
	// 	   			// console.log('last...finsh...');
	// 	   			// console.log(time_temp);
	// 	   			for (var j in time_temp) {
	// 	   				$scope.lists[j].time_duration = time_temp[j]
	// 	   				if ((time_temp.length -1) == j) {
	// 	   					console.log($scope.lists);
	// 	   				}
	// 	   			}
	// 	   		}
	// 	});
	//   }
	// // console.log(time_temp);
	// }

	// 	//時間格式轉換
	// $scope.time_fromat = function(time){
	// var new_time 
	// new_time=time.replace(/PT/, " ").replace(/M/,":").replace(/S/,"")
	// return new_time;	
	// }

	//下一頁
	$scope.next_page = function(next){
		console.log(next);
     	 $http({
			 url:$youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&part="+part+"&pageToken="+next+"&maxResults="+next_Items+"&type=video",
			 method: 'get',
			 cache: false
			   }).success(function(data, status, headers, config) {
			   	start_Quantity=0;
				$scope.next = data.nextPageToken;
				$scope.prev = data.prevPageToken;
				$scope.lists = data.items;
				$location.path("/videos/"+data.items[0].id.videoId+"/"+data.nextPageToken+"/"+data.prevPageToken);	
			});
	}


	//上一頁
	$scope.prev_page = function(prev){
     	 $http({
			 url:$youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&part="+part+"&pageToken="+prev+"&maxResults="+next_Items+"&type=video",
			 method: 'get',
			 cache: false
			   }).success(function(data, status, headers, config) {
			   	start_Quantity=0;
				nextPageToken = data.nextPageToken;
				prevPageToken = data.prevPageToken;
				$scope.next = data.nextPageToken;
				$scope.prev = data.prevPageToken;
				$scope.lists = data.items;	
				 check_Loading = false
				 $location.path("/videos/"+data.items[0].id.videoId+"/"+data.nextPageToken+"/"+data.prevPageToken);
			});
	}

		//播放
	$scope.play2 = function(id) {
		start_Quantity=0;
		$('body,html').animate({scrollTop:0},400);
		$scope.url = id;
		$scope.start_time="?autoplay=1";
		console.log("play...");
		$scope.statistics(id);
	}

	$scope.sing_sub = function(){
		$location.path('/search/'+ $("#sing_text").val());
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
 	this.look = true;
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
			$scope.apply();	
			}
			else
			{
			// console.log("end...");
			$scope.start_time="";
			start_Quantity=0;
			$scope.apply();	
			}
	}

});

