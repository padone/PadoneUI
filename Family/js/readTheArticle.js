var url = "http://140.121.196.23:3390/PadoneAS/SpecificArticleListServlet";
var urlhospital = "http://140.121.196.23:3390/HospitalCrawler/HospitalServlet";
var id = "";
var author123 = "";
var name123 = "";
var dataOfHospital = new Array();
$(document).ready(function() {
	$.ajax({
		url : urlhospital,
		dataType : "json",
		success : function(response2) {
			for(var i = 0; i < response2.length; i++){
				dataOfHospital[i] = response2[i].county + response2[i].hospitalName;
			}
			var userID;
			userID = sessionStorage.getItem('msg');
			var articleID;
			articleID = sessionStorage.getItem('articleid');
			var author;
			author = sessionStorage.getItem('author');
			var name;
			name = sessionStorage.getItem('name');
			if (userID)
			{
				console.log(userID);
				console.log(name);
				console.log(articleID);
				console.log(author);
				id = articleID;
				author123 = author;
				name123 = name;
			}
			else
			{
				alert("請先登入");
				window.location.href = 'Patientlogin.html';
			}
	$.ajax({
		type: "GET",
		url : url,
		data : {
			articleID : id
		},
		dataType : "json",
		success : function(response) {
			console.log(articleID);
			console.table(response);
			if(response[0].hospital == 'null'){
				dataOfHospital[response[0].hospital] = ' ';
			}
			$("#Article").append(
				'<div class="row">' + 
					'<div class="col-6">' + 
						'<div class="card" id="card">' + 
							'<div class="card-body" id="cardbody">' + 
								'<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">' + 
									'<ol class="carousel-indicators">' + 
										'<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>' + 
										'<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>' + 
										'<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>' + 
									'</ol>' + 
									'<div class="carousel-inner">' + 
										'<div class="carousel-item active">' + 
											'<img class="d-block w-100" src="patientPicture/789.jpg" alt="First slide">' + 
										'</div>' + 
										'<div class="carousel-item">' + 
											'<img class="d-block w-100" src="patientPicture/789.jpg" alt="Second slide">' + 
										'</div>' +
										'<div class="carousel-item">' + 
											'<img class="d-block w-100" src="patientPicture/789.jpg" alt="Third slide">' + 
										'</div>' +
									'</div>' + 
									'<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">' + 
										'<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
										'<span class="sr-only">Previous</span>' + 
									'</a>' + 
									'<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">' + 
										'<span class="carousel-control-next-icon" aria-hidden="true"></span>' + 
										'<span class="sr-only">Next</span>' + 
									'</a>' + 
								'</div>' +
								'<strong style="float:right">'+ response[0].postTime +'</strong><br>' +
								'<strong style="float:right">'+ dataOfHospital[(response[0].hospital)] +'</strong>' +
								'<h5 class="card-title" style="text-align:left; font-size:72px">'+ response[0].title +'</h5>' +
							'</div>' + 
							'<div style="text-align:center">' + 
								'<input type="button" class="btn btn-outline-light btn-sm" style="float:right;background-color:#BF9D7A" id="s2" value="讚" onclick="changeValue2();">' + 
								'<span style="float:right">&nbsp;</span>' + 
								'<input type="button" class="btn btn-outline-light btn-sm" style="float:right;background-color:#BF9D7A" id="s1" value="建議" onclick="trackArticle();">' + 
								'<button type="button" style="float:left" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">留言區</button>' + 
							'</div>' + 
						'</div>' + 
					'</div>' +
					'<div class="col-5" style="margin-left:50px;">' + 
						'<div class="card-text font-weight-bold" style="text-align:justify;font-size:24px;margin-bottom:100px;">'+ response[0].description  +'' + 
						'</div>' + 
					'</div>' + 
				'</div>' + 
				'<br><br><br>'								
			);
		},
		error : function() {
			alert("失敗");
		}
	});
		},
		error : function() {
			alert("失敗");
		}
	});
});

function hi(){
	alert("hi");
}
//建議
var url5 = "http://140.121.196.23:3390/PadoneAS/TrackArticleServlet";
function trackArticle(){
	var userID;
	userID = sessionStorage.getItem('msg');
	var articleID;
	articleID = sessionStorage.getItem('articleid');
	console.log(articleID);
	console.log(userID);
	$.ajax({
			type: "GET",
			url : url5,
			data : {
				userID : userID,
				articleID : articleID,
				tableName : "suggestarticle"
			},
			dataType : "json",
			success : function() {
				window.location.reload();
				alert("成功");
			},
			error : function() {
				alert("失敗");
			},
	});
}
//按讚
function changeValue2(){
	var btnVal=document.getElementById("s2");
	if(btnVal.value=="讚")
	{
		btnVal.value="收回讚";
	}
	else
		btnVal.value="讚";
}
//發留言
var url2 = "http://140.121.196.23:3390/PadoneAS/WriteFeedbackServlet";
function feedBack(){
	var userID;
	userID = sessionStorage.getItem('msg');
	$.ajax({
			type: "POST",
			url : url2,
			data : {
				authorID : userID,
				message : $("#thetext").val(),
				articleID : id
			},
			dataType : "json",
			success : function() {
				window.location.reload();
				alert("成功");
			},
			error : function() {
				alert("失敗");
			},
		});
}
//抓留言
var url3 = "http://140.121.196.23:3390/PadoneAS/GetFeedbackServlet"
$(document).ready(function() {
	var countOtherFeedBack = 0;
	var articleID;
	articleID = sessionStorage.getItem('articleid');
	var userID;
	userID = sessionStorage.getItem('msg');
	$.ajax({
		type: "GET",
		url : url3,
		data : {
			articleID : articleID
		},
		dataType : "json",
		success : function(response) {
			console.log(response);
			console.table(response);
			
			for(var i = 0; i < response.length; i++){
				if(response[i].authorID == userID){
				$("#getfeedback").append(
					'<tr class="text-center" >' +
						'<td style="width:5%"><button class="btn btn-light" onclick="deleteFeedback('+response[i].feedbackID+')">X</button><td style="width:10%">' + response[i].author + '</td></td>' +
						'<td style="vertical-align:middle;text-align:left">' + response[i].message + '<td style="width:8%">' + response[i].updateTime + '</td></td>' +
					'</tr>'
				);}
				else{
					$("#getfeedback").append(
					'<tr class="text-center" >' +
						'<td style="width:5%">'+ countOtherFeedBack +'<td style="width:10%">' + response[i].author + '</td></td>' +
						'<td style="vertical-align:middle;text-align:left">' + response[i].message + '<td style="width:8%">' + response[i].updateTime + '</td></td>' +
					'</tr>'
				);
				countOtherFeedBack++;}
			}
		},
		error : function() {
			alert("失敗");
		}
	});
});

//刪留言
var url4 = "http://140.121.196.23:3390/PadoneAS/DeleteFeedbackServlet"
function deleteFeedback(feedbackID) {
	var userID;
	userID = sessionStorage.getItem('msg');
	$.ajax({
			type: "POST",
			url : url4,
			data : {
				userID: userID,
				feedbackID: feedbackID
			},
			dataType : "json",
			success : function() {
				window.location.reload();
				alert("成功");
			},
			error : function() {
				alert("失敗");
			},
		});
}