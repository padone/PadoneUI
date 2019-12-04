var url = "http://140.121.196.23:3390/PadoneAS/AuthorArticleListServlet";
var dataOfPatientArticleID = new Array();
var dataOfPatientAuthor = new Array();
$(document).ready(function() {
	var personID;
	personID = sessionStorage.getItem('familySideGetPersonID');
	var personName;
	personName = sessionStorage.getItem('familySideGetPersonName');
	
	$.ajax({
		type: "GET",
		url : url,
		data : {
			id : personID,
		},
		dataType : "json",
		success : function(response) {
			console.log(response);
			$("#person").append(
					personName		 
				);
			for(var i = 0; i < response.length; i++){
				$("#FamilyOtherlist").append(
					'<a class="list-group-item list-group-item-action">' + 
						'<div class="d-flex w-100 justify-content-between">' + 
							'<h5 class="mb-1"><strong href="#" onclick="saveArticleID(' + response[i].articleID + ');">' + response[i].title + '</strong></h5>' + 
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
function saveArticleID(num){
	var str = num;
	//var author = dataOfAuthor[num];
	sessionStorage.setItem('familyarticleid', str);
	//sessionStorage.setItem('familyauthor', author);
	window.location.href="FamilyArticleSide.html";
}