//var url = "http://140.121.196.23:3390/BBDPPatient/ArticleListServlet?pattern=author&name=Jacky";

$(document).ready(function() {
	var name;
	name = sessionStorage.getItem('name');
	var url = "http://140.121.196.23:3390/BBDPPatient/ArticleListServlet?pattern=author&name="+ name +"";
	$.ajax({
		type: "POST",
		url : url,
		data : {
			pattern : "author",
			author : name,
		},
		dataType : "json",
		success : function(response) {
			console.log(response);
			for(var i = 0; i < response.length; i++){
				$("#list").append(
					'<a href="PatientArticleSide.html" onclick="window.location.href="PatientArticleSide.html"" class="list-group-item list-group-item-action">' + 
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

