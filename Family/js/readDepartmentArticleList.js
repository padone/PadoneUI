var url = "http://140.121.196.23:3390/PadoneAS/DepartmentArticleListServlet";
var dataOfArticleID = new Array();
var dataOfAuthor = new Array();
$(document).ready(function() {
	var departmentGet;
	departmentGet = sessionStorage.getItem('departmentNameInLocal');
	console.log(departmentGet);
	$.ajax({
		type: "GET",
		url : url,
		data : {
			department: departmentGet
		},
		dataType : "json",
		success : function(response) {
			console.log(response);
			for(var i = 0; i < response.length; i++){
				dataOfArticleID[i] = response[i].articleID;
				dataOfAuthor[i] = response[i].author;
				$("#departmentlist").append(
					'<a onclick="saveArticleID(' + i + ');" class="list-group-item list-group-item-action">' + 
						'<div class="d-flex w-100 justify-content-between">' + 
							'<h5 class="mb-1"><strong>' + response[i].title + '</strong></h5>' + 
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
	sessionStorage.setItem('familyarticleid', str);
	sessionStorage.setItem('familyauthor', author);
	window.location.href="FamilyArticleSide.html";
}