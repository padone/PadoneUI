var url = "http://140.121.196.23:3390/Padone/LoginServlet";

$(document).ready(function() {
	$("#login").click(function() {
			$.ajax({
				type: "POST",
				url : url,
				data : {
					account : $("#id").val(),
					Password : $("#password").val(),
				},
				dataType : "json",
				success : function(response) {
					if(response.result == '登入成功')
					{
						var str = response.userID;
						sessionStorage.setItem('msg', str);
						var name = response.name;
						sessionStorage.setItem('name', name);
						window.location.href = 'PatientHome.html';
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