var url = "http://140.121.196.23:3390/Padone/PatientProfileServlet";
$(document).ready(function() {
	var userID;
	userID = sessionStorage.getItem('msg');
	$.ajax({
		type: "GET",
		url : url,
		data : {
			userID : userID,
		},
		dataType : "json",
		success : function(response) {
			console.log(response);
			$("#getprofile").append(
				'<div class="form-group">' +
					'<label>姓名</label>' +
					'<div style="width:350px" class="form-control" id="name">' + response.name +'</div>' +
				'</div>' +
				'<div class="form-group">' +
					'<label>Gmail</label>' +
					'<div style="width:350px" class="form-control" id="mail">' + response.mail +'</div>' +
				'</div>' +
				'<div class="form-group">' +
					'<label>生日</label>' +
					'<div style="width:350px" class="form-control" id="birthday">' + response.birthday +'</div>' +
				'</div>' +
				'<div class="form-group">' +
					'<label>自我介紹</label>' +
					'<div style="height:200px" class="form-control" id="introduction">' + response.introduction +'</div>' +
				'</div>'	
			);
		},
		error : function() {
			alert("失敗");
		},
	});
});
$(document).ready(function() {
	var userID;
	userID = sessionStorage.getItem('msg');
	$("#patientSaveProfile").click(function() {
		$.ajax({
			type: "POST",
			url : url,
			data : {
				userID : userID,
				name : $("#name").val(),
				mail : $("#mail").val(),
				birthday : $("#birthday").val(),
				introduction : $("#introduction").val()
			},
			dataType : "json",
			success : function() {
				alert("成功");
				sessionStorage.setItem('name', $("#name").val());
				window.location.href = 'PatientProfile.html';
			},
			error : function() {
				alert("失敗");
			},
		});
	});
});