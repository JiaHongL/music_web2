// var $key,$channelId,$youtube_api;
// $key = 'AIzaSyCfmi2Rsd5cjHV_-cW0avDqn5Nzq1k7EDA';  // V3 需要key才能使用api
// //$channelId = 'UCQHthJbbEt6osR39NsST13g';
// //$channelId = 'UCyxa_MccoDQwPTlRBC0CYkg';  //被訂閱者ID
// $channelId ='UCCsUQXwhDj4iVlhG4VCq6Kg';
// $youtube_api = 'https://www.googleapis.com/youtube/v3'; //youtube api
// var nextPageToken;  //下一頁token
// var totalResults;   //總筆數
// var now_total=9;    //目前顯示筆數
// var next_Items=3;   //每下一頁顯示的筆數
// var part="snippet"; //向api要得資料
// var query;

// $(document).ready(function(){
//  $.ajax({
//     type: "GET",      //型態
//      url: $youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&maxResults="+now_total+"&part="+part+"&type=video",  
//     //data:,  //傳送到伺服器資料
//     success: function(msg){
//        	//成功後做的事
//         //console.log(msg);
//         nextPageToken=msg.nextPageToken;
//         totalResults=msg.pageInfo.totalResults;
//         for (var i in msg.items)
//         {
//         //抓nextPageToken、圖片、標題、影片id
//         //alert(msg.nextPageToken);
//         //alert(msg.items[i].snippet.thumbnails.default.url);
//         //alert(msg.items[i].snippet.title);
//         //alert(msg.items[i].id.videoId);

//       // div、圖片、標題、影片id
//        var divs=('<div id="div'+i+'" class="divs" width="50%"></div>')
//        var img=('<img class="imgclick img'+i+'" src="'+msg.items[i].snippet.thumbnails.default.url+'"height="128" width="228" >')
//        var title=('<li class="title'+i+'">'+msg.items[i].snippet.title+'</li>');
//        var urls_id=msg.items[i].id.videoId;
//        $("#divlist").append(divs);
//        $("#div"+i).append(img);

//       $(".img"+i).data("geturl_id", urls_id);
//       $(".img"+i).data("url_title",msg.items[i].snippet.title);

//       $("#div"+i).append(title);
//        }
//         }, 
//     error:function(response,errorType,errorMessage)
//          {
//          //失敗時做的事
//       alert(errorMessage);
// 	 }
// 	 });
// });


// //查詢功能
// $(document).on("click", '#sing_sub', function(e) {

//   $(".divs").remove(); //移除所有歌曲
//   now_total=9;
//   query=$("#sing_text").val();
//   $.ajax({
//        type: "GET",      //型態
//       url: $youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&part="+part+"&maxResults="+now_total+"&type=video&q="+ query+"&OrderBy=rating",  
//       success: function(msg){
//          //console.log(msg);
//          nextPageToken=msg.nextPageToken;  //取得下一頁的token
//          totalResults=msg.pageInfo.totalResults;

//          for (var i in msg.items)
//         {
//         var divs=('<div id="div'+i+'" class="divs" width="50%"></div>')
//         var img=('<img class="imgclick img'+i+'" src="'+msg.items[i].snippet.thumbnails.default.url+'"height="128" width="228" >')
//         var title=('<li class="title'+i+'">'+msg.items[i].snippet.title+'</li>');
//         var urls_id=msg.items[i].id.videoId;
//        $("#divlist").append(divs);
//        $("#div"+i).append(img);
//        $(".img"+i).data("geturl_id", urls_id);
//        $(".img"+i).data("url_title",msg.items[i].snippet.title);
//        $("#div"+i).append(title);
//         }              }, 
//   error:function(response,errorType,errorMessage)
//         {
//            //失敗時做的事
//         alert(errorMessage);
//         }
//     });
// });



// 下一頁功能
// $(function(){
// $("#next_page").click(function(e){
//   if (totalResults>now_total)  //總筆數 大於 現在的筆數 再執行
//     {
//     $.ajax({
//          type: "GET",      //型態
//          url: $youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&part="+part+"&pageToken="+nextPageToken+"&maxResults="+next_Items+"&type=video",  
//          success: function(msg){
//        //console.log(msg);
//          nextPageToken=msg.nextPageToken;  //取得下一頁的token

//          for (var i in msg.items)
//         {
//            a=parseInt(i)+parseInt(now_total);  
//           if(totalResults>=a)   //總筆數 大於或等於 目前累加的筆數 再執行
//            {
//             var divs=('<div id="div'+a+'" class="divs" width="50%"></div>')
//             var img=('<img class="imgclick img'+a+'" src="'+msg.items[i].snippet.thumbnails.default.url+'"height="128" width="228" >')
//             var title=('<li class="title'+a+'">'+msg.items[i].snippet.title+'</li>');
//             var urls_id=msg.items[i].id.videoId;
//             $("#divlist").append(divs);
//             $("#div"+a).append(img);
//             $(".img"+a).data("geturl_id", urls_id);
//             $(".img"+a).data("url_title",msg.items[i].snippet.title);
//             $("#div"+a).append(title);
//           }
//         }
//       now_total=parseInt(now_total)+next_Items  //下一頁後的 現在筆數
//                       }, 
//   error:function(response,errorType,errorMessage)
//        {
//          //失敗時做的事
//      alert(errorMessage);
//       }
//    });
//   }
// });
// });


//滑鼠移入&移出換Button圖片
// $(function(){
// $("#sing_sub").mouseover(function(){
//   $("#sing_sub").css('background-image', 'url(img/purple.jpg)');
//   // $("p").css("background-color","yellow");
//   //alert(nextPageToken);
//  });
// $("#sing_sub").mouseout(function(){
//   $("#sing_sub").css('background-image', 'url(img/blue.jpg)');
//   //prompt("視窗內之文字", $youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&part="+part+"&maxResults=50&type=video&q=" + query )  
//   });
// });



//點選圖片，更新播放器和頁面捲動
// $(document).on("click", '.imgclick', function(e) {
//    $('body,html').animate({scrollTop:0},400); //回頂部
//      //抓那圖片存的ID
//      var newurl_id=$(this).data("geturl_id");
//      var newurl_title=$(this).data("url_title");
//      //換撥放器網址的ID(換屬性)
//      $('#player').attr("src","//www.youtube.com/embed/"+newurl_id+"?autoplay=1");
//      $('title').html(newurl_title);
// });

  //回到頂部的元素
// $(function(){
//     $("#divlist").click(function(e) {
//               //以0.1秒的間隔返回頂部
//     $('body,html').animate({scrollTop:0},500);
//     });
// });



//alert($("#sing_text").val());
//alert($("li:contains(田)").text());

// alert($("li:contains("+search+")").text());

//$("li").filter($("li:contains("+search+")")).css("background", "#c8ebcc");

 //$("li").filter($("li:contains("+search+")")).hide();
// alert( $("li").filter($("li:contains("+search+")")).html() );

  // $("li").each(function(){
  //   alert($(this).text())
  // });
