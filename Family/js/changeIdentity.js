var changeIdentityURL = "http://140.121.196.23:3390/Padone/SwitchIdentityServlet";
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
				console.log(response.reason)
			},
			error : function() {
				alert("失敗");
			},
	});
}