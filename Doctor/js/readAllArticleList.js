var url = "http://140.121.196.23:3390/PadoneAS/ArticleListServlet";
var dataOfArticleID = new Array();
var dataOfAuthor = new Array();
$(document).ready(function() {
	$.ajax({
		type: "GET",
		url : url,
		dataType : "json",
		success : function(response) {
			console.log(response);
			for(var i = 0; i < response.length; i++){
				dataOfArticleID[i] = response[i].articleID;
				dataOfAuthor[i] = response[i].author;
				$("#Doctorlist").append(
					'<a class="list-group-item list-group-item-action">' + 
						'<div class="d-flex w-100 justify-content-between">' + 
							'<h5 class="mb-1"><strong href="#" onclick="saveArticleID(' + i + ');">' + response[i].title + '</strong></h5>' + 
							'<small>' + response[i].author + '</small>' + 
						'</div>' + 
						'<p class="mb-1">' + response[i].description + '</p>' + 
						'<small style="float:right;">' + response[i].postTime + '</small>' + 
					'</a>'			
				);
			}
		},
		error : function() {
			alert("失敗");
		}
	});
});

function saveArticleID(num){
	var str = dataOfArticleID[num];
	var author = dataOfAuthor[num];
	sessionStorage.setItem('articleid', str);
	sessionStorage.setItem('author', author);
	window.location.href="DoctorArticleSide.html";
}