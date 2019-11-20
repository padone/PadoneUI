var url = "http://140.121.196.23:3390/Padone/LoginServlet";
var loginFamilyURL = "http://140.121.196.23:3390/Padone/SwitchIdentityServlet";
$(document).ready(function() {
	$("#login").click(function() {
			$.ajax({
				type: "POST",
				url : url,
				data : {
					account : $("#id").val(),
					Password : $("#password").val(),
					identity : $("#identity").val()
				},
				dataType : "json",
				success : function(response) {
					if(response.result == '登入成功')
					{
						if($("#identity").val() == 'patient')
						{
							var str = response.userID;
							sessionStorage.setItem('msg', str);
							var name = response.name;
							sessionStorage.setItem('name', name);
							var identity = $("#identity").val();
							sessionStorage.setItem('identity', identity);
							window.location.href = 'http://140.121.196.23:3390/PadoneUI0521/Patient/PatientHome.html';
						}
						else if($("#identity").val() == 'family')
						{
							var str = response.userID;
							sessionStorage.setItem('msg', str);
							var name = response.name;
							sessionStorage.setItem('name', name);
							var identity = $("#identity").val();
							sessionStorage.setItem('identity', identity);
							$.ajax({
								type: "POST",
								url : loginFamilyURL,
								data : {
									userID : str,
									previous : 'patient',
									next : '家屬'
								},
								dataType : "json",
								success : function(response) {
									if(response.result == "成功"){
										console.log(response.result);
										console.log(response.reason);
										window.location.href = 'http://140.121.196.23:3390/PadoneUI0521/Family/FamilyHome.html';
									}
									else{
										alert("沒有家屬身分");
									}
								},
								error : function() {
									alert("登入失敗");
								},
							});
						}
						else if($("#identity").val() == 'secretary')
						{
							var str = response.userID;
							sessionStorage.setItem('msg', str);
							var name = response.name;
							sessionStorage.setItem('name', name);
							var identity = $("#identity").val();
							sessionStorage.setItem('identity', identity);
							$.ajax({
								type: "POST",
								url : loginFamilyURL,
								data : {
									userID : str,
									previous : 'patient',
									next : '助理'
								},
								dataType : "json",
								success : function(response) {
									if(response.result == "成功"){
										console.log(response.result);
										console.log(response.reason);
										window.location.href = 'http://140.121.196.23:3390/PadoneUI0521/Secretary/SecretaryHome.html';
									}
									else{
										alert("沒有助理身分");
									}
								},
								error : function() {
									alert("登入失敗");
								},
							});
						}
						else if($("#identity").val() == 'doctor')
						{
							var str = response.userID;
							sessionStorage.setItem('msg', str);
							var name = response.name;
							sessionStorage.setItem('name', name);
							var identity = $("#identity").val();
							sessionStorage.setItem('identity', identity);
							window.location.href = 'http://140.121.196.23:3390/PadoneUI0521/Doctor/DoctorHome.html';
						}
					}
					else if (response.result == '沒有此使用者')
					{
						alert("沒有此使用者");
						window.location.reload();
					}
					else if (response.result == '密碼錯誤')
					{
						alert("密碼錯誤");
						window.location.reload();
					}
				},
				error : function() {
					alert("失敗");
					window.location.reload();
				}
			});
	});
});