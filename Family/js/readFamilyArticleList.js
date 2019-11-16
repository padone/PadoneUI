var url = "http://140.121.196.23:3390/PadoneAS/AuthorArticleListServlet";
var url2 = "http://140.121.196.23:3390/PadoneAS/DeleteArticleServlet";
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
		},
		dataType : "json",
		success : function(response) {
			console.log(response);
			for(var i = 0; i < response.length; i++){
				$("#Familylist").append(
					'<a class="list-group-item list-group-item-action">' + 
						'<div class="d-flex w-100 justify-content-between">' + 
							'<h5 class="mb-1"><strong href="#" onclick="savePatientArticleID(' + response[i].articleID + ');">' + response[i].title + '</strong></h5>' + 
							'<button type="button" class="close" aria-label="Close" onClick ="surelyDelete(' + response[i].articleID + ')" data-dismiss="modal"><span aria-hidden="true">x</span></button>' + 
						'</div>' + 
						'<p class="mb-1">' + response[i].description + '</p>' + 
						'<small style="float:right;">' + response[i].author + '  ' + response[i].postTime + '</small>' + 
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
	//var author = dataOfPatientAuthor[num];
	sessionStorage.setItem('familyownarticleid', str);
	//sessionStorage.setItem('patientauthor', author);
	window.location.href="FamilyOwnArticleSide.html";
}

//刪除文章
function surelyDelete(ArticleID) {
	var temp = confirm("確定刪除此文章嗎?");
	if (temp == true){
		deleteArticle(ArticleID);
	}
	else{
		
	}
}
function deleteArticle(ArticleID) {
	var userID;
	userID = sessionStorage.getItem('msg');
	$.ajax({
			type: "POST",
			url : url2,
			data : {
				authorID: userID,
				articleID: ArticleID
			},
			dataType : "json",
			success : function() {
				window.location.href = 'Family.html';
				alert("成功");
			},
			error : function() {
				alert("失敗");
			},
		});
}