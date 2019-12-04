var url = "http://140.121.196.23:3390/PadoneAS/SpecificArticleListServlet";
var urlhospital = "http://140.121.196.23:3390/HospitalCrawler/HospitalServlet";
var id = "";
var author123 = "";
var name123 = "";
var greatStatus = "";
var trackStatus = "";
var dataOfHospital = new Array();
var countOfPicture = new Array("First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth","Ninth","Tenth");
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
			articleID = sessionStorage.getItem('patientdepartmentarticleid');
			var author;
			author = sessionStorage.getItem('patientdepartmentauthor');
			var name;
			name = sessionStorage.getItem('name');
			var identity;
			identity = sessionStorage.getItem('identity');
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
			userID : userID,
			articleID : id,
			identity : identity
		},
		dataType : "json",
		success : function(response) {
			console.log(articleID);
			console.table(response);
			if(response[0].ifEvaluted == true){
				greatStatus = '收回讚';
			}
			else{
				greatStatus = '讚';
			}
			if(response[0].ifTracked == true){
				trackStatus = '取消追蹤';
			}
			else{
				trackStatus = '追蹤';
			}
			$("#Article").append(
				'<div class="row">' + 
					'<div class="col-6">' + 
						'<div class="card" id="card">' + 
							'<div class="card-body" id="cardbody">' + 
								'<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">' + 
									'<ol class="carousel-indicators" id=inputPicture>' + 
									'</ol>' + 
									'<div class="carousel-inner" id="setPicture">' + 
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
								'<strong style="float:right">'+ response[0].hospital +'</strong><br>' +
								'<strong style="float:right">'+ response[0].tag +'</strong>' +
								'<h5 class="card-title" style="text-align:left; font-size:72px">'+ response[0].title +'</h5>' +
							'</div>' + 
							'<div style="text-align:center">' + 
								'<input type="button" class="btn btn-outline-light btn-sm" style="float:right;background-color:#BF9D7A" id="s2" value="' + greatStatus + ' '+ response[0].great +'" onclick="great();">' + 
								'<span style="float:right">&nbsp;</span>' + 
								'<input type="button" class="btn btn-outline-light btn-sm" style="float:right;background-color:#BF9D7A" id="s1" value="'+ trackStatus +'" onclick="trackArticle();">' + 
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
			for(var g=0;g<response[0].imageNum;g++)
			{
				if(g == 0)
				{
					$("#inputPicture").append(
						'<li data-target="#carouselExampleIndicators" data-slide-to="'+g+'" class="active"></li>'
					);
					$("#setPicture").append(
						'<div class="carousel-item active">' + 
							'<img class="d-block w-100" src="'+ response[0].imageURL[g] +'" alt="'+countOfPicture[g]+' slide">' + 
						'</div>'
					);
				}
				else
				{
					$("#inputPicture").append(
						'<li data-target="#carouselExampleIndicators" data-slide-to="'+g+'"></li>'
					);
					$("#setPicture").append(
						'<div class="carousel-item">' + 
							'<img class="d-block w-100" src="'+ response[0].imageURL[g] +'" alt="'+countOfPicture[g]+' slide">' + 
						'</div>'
					);
				}
			}
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
//追蹤
var url5 = "http://140.121.196.23:3390/PadoneAS/TrackArticleServlet";
function trackArticle(){
	var userID;
	userID = sessionStorage.getItem('msg');
	var articleID;
	articleID = sessionStorage.getItem('patientdepartmentarticleid');
	var identity;
	identity = sessionStorage.getItem('identity');
	console.log(articleID);
	$.ajax({
			type: "GET",
			url : url5,
			data : {
				userID : userID,
				articleID : articleID,
				identity : identity,
				tableName : "trackarticle"
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
var urlGreat = "http://140.121.196.23:3390/PadoneAS/GreatServlet";
function great(){
	/*var btnVal=document.getElementById("s2");
	if(btnVal.value=="讚")
	{
		btnVal.value="收回讚";
	}
	else
		btnVal.value="讚";*/
	var userID;
	userID = sessionStorage.getItem('msg');
	var articleID;
	articleID = sessionStorage.getItem('patientdepartmentarticleid');
	$.ajax({
			type: "POST",
			url : urlGreat,
			data : {
				userID : userID,
				articleID : articleID
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
	articleID = sessionStorage.getItem('patientdepartmentarticleid');
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
			for(var i = 0; i < response.length; i++){
				if(response[i].authorID == userID){
				$("#getfeedback").append(
					'<tr class="text-center" >' +
						'<td style="width:5%"><button class="btn btn-light" onclick="surelyDelete('+response[i].feedbackID+')">X</button><td style="width:10%">' + response[i].author + '</td></td>' +
						'<td style="vertical-align:middle;text-align:left">' + response[i].message + '<td style="width:8%">' + response[i].updateTime + '</td></td>' +
					'</tr>'
				);}
				else{
					$("#getfeedback").append(
					'<tr class="text-center" >' +
						'<td style="width:5%">'+ countOtherFeedBack +'<td style="width:10%">' + response[i].author + '</td></td>' +
						'<td style="vertical-align:middle;text-align:left">' + response[i].message + '<td style="width:8%">' + response[i].updateTime + '</td></td>' +
					'</tr>'
				);countOtherFeedBack++;}
			}
		},
		error : function() {
			alert("失敗");
		}
	});
});


//刪留言
function surelyDelete(feedbackID) {
	var temp = confirm("確定刪除此留言嗎?");
	if (temp == true){
		deleteFeedback(feedbackID);
	}
	else{
		
	}
}
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