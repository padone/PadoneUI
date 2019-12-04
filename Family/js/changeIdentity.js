var changeIdentityURL = "http://140.121.196.23:3390/Padone/SwitchIdentityServlet";
var getFamilyPatientURL = "http://140.121.196.23:3390/Padone/FamilyGetPatientServlet";
var getFamilyIDAndName = new Array();
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
				if(response.reason == '成功找到病患身分'){
					window.location.href = 'http://140.121.196.23:3390/PadoneUI0521/Patient/PatientHome.html';
				}
				else if(response.reason == '成功找到助理身分'){
					window.location.href = 'http://140.121.196.23:3390/PadoneUI0521/Secretary/SecretaryHome.html';
				}
				else if(response.reason == '成功找到家屬身分'){
					alert("現在已是家屬身分");
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
		url : getFamilyPatientURL,
		data : {
				userID : userID,
			},
		dataType : "json",
		success : function(response) {
			console.log(response);
			for(var i = 0; i < response.length; i++){
				$("#myFamilyPatient").append(
					'<option>'+response[i].patientName+' '+response[i].patientID+'</option>'			
				)
			}
		},
		error : function() {
			alert("失敗");
		}
	});
});

function goToFamily(){
	var who;
	who = $("#myFamilyPatient").val();
	getFamilyIDAndName = who.split(" ",2);
	console.log(getFamilyIDAndName);
	sessionStorage.setItem('familyLookPatientID', getFamilyIDAndName[1]);
	sessionStorage.setItem('familyLookPatientName', getFamilyIDAndName[0]);
	window.location.href="familyLookPatientSide.html";
}