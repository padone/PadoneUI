var changeIdentityURL = "http://140.121.196.23:3390/Padone/SwitchIdentityServlet";
var getFamilyURL = "";
function changeIdentity(){
	var userID;
	userID = sessionStorage.getItem('msg');
	var identity;
	identity = sessionStorage.getItem('identity');
	$.ajax({
			type: "POST",
			url : changeIdentityURL,
			data : {
				userID : userID,
				previous : identity,
				next : $("#identity").val()
			},
			dataType : "json",
			success : function(response) {
				console.log(response.result);
				console.log(response.reason);
				if(response.reason == '成功找到家屬身分'){
					window.location.href = 'http://140.121.196.23:3390/PadoneUI0521/Family/FamilyHome.html';
				}
				else if(response.reason == '成功找到助理身分'){
					window.location.href = 'http://140.121.196.23:3390/PadoneUI0521/Secretary/SecretaryHome.html';
				}
				else if(response.reason == '成功找到病患身分'){
					alert("現在已是病患身分");
				}
			},
			error : function() {
				alert("失敗");
			},
	});
}

$(document).ready(function() {
	var userID;
	userID = sessionStorage.getItem('msg');
	$.ajax({
		type: "GET",
		url : getFamilyURL,
		data : {
				userID : userID,
			},
		dataType : "json",
		success : function(response) {
			for(var i = 0; i < response.length; i++){
				$("#myFamilyPatient").append(
					'<option></option>'			
				);
			}
		},
		error : function() {
			alert("失敗");
		}
	});
});