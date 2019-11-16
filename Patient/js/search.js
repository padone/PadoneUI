var searchUserURL = "http://140.121.196.23:3390/PadoneCommunity/FuzzySearchUser";
var dataOfArticleID = new Array();
var dataOfAuthor = new Array();
//搜尋用戶
function searchUser(){
	$.ajax({
			type: "POST",
			url : searchUserURL,
			data : {
				keyword : $("#searchInput").val()
			},
			dataType : "json",
			success : function(response) {
				console.log(response)
				document.getElementById("block").innerHTML = "";
				for(var i = 0; i < response.length; i++){
					$("#block").append(
					'<div class="col-md-3">' + 
						'<div class="card" id="card">' + 
							'<div class="card-body" id="cardbody">' + 
								'<strong style="float:left">'+ response[i].gender +'</strong><br>' +
								'<strong style="float:left">'+ response[i].id +'</strong>' +
								'<button class="btn btn-light" style="float:right" onclick="beFamily('+response[i].id+');">成為家屬</button><br>' +
								'<h1 style="font-size:36px">'+ response[i].name +'</h1>' +
							'</div>' + 
						'</div>' + 
					'</div>'
					);
				}
				alert("成功");
			},
			error : function() {
				alert("失敗");
			},
	});
}
var beFamilyURL = "http://140.121.196.23:3390/Padone/PatientRelationshipServlet";
function beFamily(id){
	var userID;
	userID = sessionStorage.getItem('msg');
	$.ajax({
			type: "POST",
			url : beFamilyURL,
			data : {
				familyID : userID,
				patientID : id,
				identity : '病患'
			},
			dataType : "json",
			success : function(response) {
				console.log(response)
				alert("成功");
			},
			error : function() {
				alert("失敗");
			},
	});
}
var searchArticleURL = "http://140.121.196.23:3390/PadoneCommunity/FuzzySearchArticleServlet";
//用標題搜尋文章
function useTitleSearchArticle(){
	$.ajax({
			type: "POST",
			url : searchArticleURL,
			data : {
				mode : 'title',
				keyword : $("#searchInput").val()
			},
			dataType : "json",
			success : function(response) {
				console.log(response)
				document.getElementById("block").innerHTML = "";
				for(var i = 0; i < response.length; i++){
					dataOfArticleID[i] = response[i].articleID;
					dataOfAuthor[i] = response[i].author;
					$("#block").append(
						'<a class="list-group-item list-group-item-action">' + 
							'<div class="d-flex w-100 justify-content-between">' + 
								'<h5 class="mb-1"><strong href="#" onclick="saveArticleID(' + i + ');">' + response[i].title + '</strong></h5>' + 
								'<small>' + response[i].authorName + '</small>' + 
							'</div>' + 
							'<p class="mb-1">' + response[i].description + '</p>' + 
							'<small style="float:right;">' + response[i].postTime + '</small>' + 
						'</a>'			
					);
				}
				alert("成功");
			},
			error : function() {
				alert("失敗");
			},
	});
}
//用內容搜尋文章
function useContentSearchArticle(){
	$.ajax({
			type: "POST",
			url : searchArticleURL,
			data : {
				mode : 'content',
				keyword : $("#searchInput").val()
			},
			dataType : "json",
			success : function(response) {
				console.log(response)
				document.getElementById("block").innerHTML = "";
				for(var i = 0; i < response.length; i++){
					dataOfArticleID[i] = response[i].articleID;
					dataOfAuthor[i] = response[i].author;
					$("#block").append(
						'<a class="list-group-item list-group-item-action">' + 
							'<div class="d-flex w-100 justify-content-between">' + 
								'<h5 class="mb-1"><strong href="#" onclick="saveArticleID(' + i + ');">' + response[i].title + '</strong></h5>' + 
								'<small>' + response[i].authorName + '</small>' + 
							'</div>' + 
							'<p class="mb-1">' + response[i].description + '</p>' + 
							'<small style="float:right;">' + response[i].postTime + '</small>' + 
						'</a>'			
					);
				}
				alert("成功");
			},
			error : function() {
				alert("失敗");
			},
	});
}
//用標籤搜尋文章
function useTagSearchArticle(){
	$.ajax({
			type: "POST",
			url : searchArticleURL,
			data : {
				mode : 'tag',
				keyword : $("#searchInput").val()
			},
			dataType : "json",
			success : function(response) {
				console.log(response)
				document.getElementById("block").innerHTML = "";
				for(var i = 0; i < response.length; i++){
					dataOfArticleID[i] = response[i].articleID;
					dataOfAuthor[i] = response[i].author;
					$("#block").append(
						'<a class="list-group-item list-group-item-action">' + 
							'<div class="d-flex w-100 justify-content-between">' + 
								'<h5 class="mb-1"><strong href="#" onclick="saveArticleID(' + i + ');">' + response[i].title + '</strong></h5>' + 
								'<small>' + response[i].authorName + '</small>' + 
							'</div>' + 
							'<p class="mb-1">' + response[i].description + '</p>' + 
							'<small style="float:right;">' + response[i].postTime + '</small>' + 
						'</a>'			
					);
				}
				alert("成功");
			},
			error : function() {
				alert("失敗");
			},
	});
}
//用用戶搜尋文章
function useUserSearchArticle(){
	$.ajax({
			type: "POST",
			url : searchArticleURL,
			data : {
				mode : 'user',
				keyword : $("#searchInput").val()
			},
			dataType : "json",
			success : function(response) {
				console.log(response)
				document.getElementById("block").innerHTML = "";
				for(var i = 0; i < response.length; i++){
					dataOfArticleID[i] = response[i].articleID;
					dataOfAuthor[i] = response[i].author;
					$("#block").append(
						'<a class="list-group-item list-group-item-action">' + 
							'<div class="d-flex w-100 justify-content-between">' + 
								'<h5 class="mb-1"><strong href="#" onclick="saveArticleID(' + i + ');">' + response[i].title + '</strong></h5>' + 
								'<small>' + response[i].authorName + '</small>' + 
							'</div>' + 
							'<p class="mb-1">' + response[i].description + '</p>' + 
							'<small style="float:right;">' + response[i].postTime + '</small>' + 
						'</a>'			
					);
				}
				alert("成功");
			},
			error : function() {
				alert("失敗");
			},
	});
}
function saveArticleID(num){
	var str = dataOfArticleID[num];
	var author = dataOfAuthor[num];
	sessionStorage.setItem('articleid', str);
	sessionStorage.setItem('author', author);
	window.location.href="PatientArticleSide.html";
}