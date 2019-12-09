var url = "http://140.121.196.23:3390/PadoneCommunity/FamilyTrackingArticleListServlet";
var url2 = "http://140.121.196.23:3390/PadoneAS/DeleteTrackArticleServlet";
var dataOfPatientArticleID = new Array();
var dataOfPatientAuthor = new Array();
$(document).ready(function() {
	var userID;
	userID = sessionStorage.getItem('msg');
	$.ajax({
		type: "GET",
		url : url,
		data : {
			id : userID,
			tableName : "suggestArticle"
		},
		dataType : "json",
		success : function(response) {
			console.log(response);
			for(var i = 0; i < response.length; i++){
				$("#Suggestlist").append(
					'<a class="list-group-item list-group-item-action">' + 
						'<div class="d-flex w-100 justify-content-between">' + 
							'<h5 class="mb-1"><strong href="#" onclick="savePatientArticleID(' + response[i].articleID + ');">' + response[i].title + '</strong></h5>' + 
							'<button type="button" class="close" aria-label="Close" onClick ="surelyDelete(' + response[i].articleID + ')" data-dismiss="modal"><span aria-hidden="true">x</span></button>' + 
						'</div>' + 
						'<p class="mb-1">' + response[i].description + '</p>' + 
						'<small style="float:right;">' + response[i].authorName + '  ' + response[i].postTime + '</small>' + 
					'</a>'			 
				);
			}
		},
		error : function() {
			console.log(userID);
			alert("失敗");
		}
	});
});

function savePatientArticleID(num){
	var str = num;
	var author = dataOfPatientAuthor[num];
	sessionStorage.setItem('familysuggestarticleid', str);
	sessionStorage.setItem('familysuggestauthor', author);
	window.location.href="FamilySuggestArticleSide.html";
}

//刪除建議文章
function surelyDelete(ArticleID) {
	var temp = confirm("確定取消建議此文章嗎?");
	if (temp == true){
		deleteSuggestArticle(ArticleID);
	}
	else{
		
	}
}
function deleteSuggestArticle(ArticleID) {
	var userID;
	userID = sessionStorage.getItem('msg');
	console.log(ArticleID);
	$.ajax({
			type: "POST",
			url : url2,
			data : {
				userID: userID,
				articleID: ArticleID,
				tableName : "suggestArticle"
			},
			dataType : "json",
			success : function() {
				window.location.href = 'SuggestPost.html';
				alert("成功");
			},
			error : function() {
				alert("失敗");
			},
		});
}