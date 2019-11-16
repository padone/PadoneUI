var url = "http://140.121.196.23:3390/Padone/LoginServlet";

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
							window.location.href = 'PatientHome.html';
						}
						else if($("#identity").val() == 'family')
						{
							var str = response.userID;
							sessionStorage.setItem('msg', str);
							var name = response.name;
							sessionStorage.setItem('name', name);
							var identity = $("#identity").val();
							sessionStorage.setItem('identity', identity);
							window.location.href = 'http://140.121.196.23:3390/PadoneUI0521/Family/FamilyHome.html';
						}
						else if($("#identity").val() == 'secretary')
						{
							var str = response.userID;
							sessionStorage.setItem('msg', str);
							var name = response.name;
							sessionStorage.setItem('name', name);
							var identity = $("#identity").val();
							sessionStorage.setItem('identity', identity);
							window.location.href = 'http://140.121.196.23:3390/PadoneUI0521/Secretary/SecretaryHome.html';
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