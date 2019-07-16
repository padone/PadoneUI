var url = "http://140.121.196.23:3390/Padone/PatientRegisterServlet";
var url2 = "http://140.121.196.23:3390/Padone/DoctorRegisterServlet";
//病患
$(document).ready(function() {
	$("#patientRegister").click(function() {
		if(checkPatientRegister()){	//檢查註冊*/
			$.ajax({
				type: "POST",
				url : url,
				data : {
					account : $("#id").val(),
					Password : $("#password").val(),
					name : $("#name").val(),
					gender : $("#sex").val(),
					mail : $("#mail").val()
				},
				dataType : "json",
	
				success : function(response) {
					if(response.result == '註冊成功')
					{
						alert("註冊成功");
						window.location.href = 'Patientlogin.html';
					}
					else if (response.result == '已有此使用者')
					{
						alert("已有使用者");
						window.location.reload();
					}
					else if (response.result == '註冊失敗')
					{
						alert("註冊失敗");
						window.location.reload();
					}
				},
				error : function() {
					alert("註冊失敗");
				}
			});
		}
	});
});

//醫生
/********************************************************************************/
$(document).ready(function() {
	$("#doctorRegister").click(function() {
		if(checkDoctorRegister()){	//檢查註冊*/
			$.ajax({
				type: "POST",
				url : url2,
				data : {
					account : $("#id2").val(),
					Password : $("#password2").val(),
					name : $("#name2").val(),
					gender : $("#sex2").val(),
					mail : $("#mail2").val(),
					phone : $("#phone2").val(),
					backUpPhone : $("#backUpPhone2").val()
				},
				dataType : "json",
	
				success : function(response) {
					if(response.result == '註冊成功')
					{
						alert("註冊成功");
						window.location.href = 'Patientlogin.html';
					}
					else if (response.result == '已有此使用者')
					{
						alert("已有使用者");
						window.location.reload();
					}
					else if (response.result == '註冊失敗')
					{
						alert("註冊失敗");
						window.location.reload();
					}
				},
				error : function() {
					alert("註冊失敗");
				}
			});
		/*}*/
	});
});
//病患檢查註冊
function checkPatientRegister(){
	if($("#id").val() == ""){
		alert("請輸入帳號");
		return false;
	}
	else if($("#name").val() == ""){
		alert("請輸入姓名");
		return false;
	}
	else if($("#password").val() == ""){
		alert("請輸入密碼");
		return false;
	}
	else if($("#mail").val() == ""){
		alert("請輸入信箱");
		return false;
	}
	else if($("#check").val() == ""){
		alert("請輸入確認密碼");
		return false;
	}
	else if(!isIDCard($("#id").val())){
		alert("身分證字號格式錯誤");
		return false;
	}
	else if($("#password").val() != $("#check").val()){
		alert("確認密碼錯誤");
		return false;
	}
	else if(!checkEnNum($("#password").val())){
		alert("密碼請輸入英文或數字");
		return false;
	}
	else if(!checkCnEnNum($("#name").val())){
		alert("姓名請輸入中文、英文或數字");
		return false;
	}
	return true;
}

//醫生檢查註冊
function checkDoctorRegister(){
	if($("#id2").val() == ""){
		alert("請輸入帳號");
		return false;
	}
	else if($("#name2").val() == ""){
		alert("請輸入姓名");
		return false;
	}
	else if($("#password2").val() == ""){
		alert("請輸入密碼");
		return false;
	}
	else if($("#mail2").val() == ""){
		alert("請輸入信箱");
		return false;
	}
	else if($("#check2").val() == ""){
		alert("請輸入確認密碼");
		return false;
	}
	else if(!isIDCard($("#id2").val())){
		alert("身分證字號格式錯誤");
		return false;
	}
	else if($("#password2").val() != $("#check2").val()){
		alert("確認密碼錯誤");
		return false;
	}
	else if(!checkEnNum($("#password2").val())){
		alert("密碼請輸入英文或數字");
		return false;
	}
	else if(!checkCnEnNum($("#name2").val())){
		alert("姓名請輸入中文、英文或數字");
		return false;
	}
	return true;
}
/********************************************************************************/

//判斷是否為身分證字號
function isIDCard(string){
	var re = /^[A-Z]\d{9}$/;
	if (!re.test(string))	//是否輸入開頭大寫+9個數字
		return false;
	if(string.charAt(1)!="1" && string.charAt(1)!="2")	//第二個字元不等於1或2
		return false;
	if(!checkTwID(string))	//最後一碼驗證碼是否正確
		return false;
	return true;
}

function checkTwID(id){
    //建立字母分數陣列(A~Z)
    var city = new Array(1,10,19,28,37,46,55,64,39,73,82, 2,11,20,48,29,38,47,56,65,74,83,21, 3,12,30)
    id = id.toUpperCase();
    // 使用「正規表達式」檢驗格式
    if (id.search(/^[A-Z](1|2)\d{8}$/i) == -1) {
        alert('基本格式錯誤');
        return false;
    } else {
        //將字串分割為陣列(IE必需這麼做才不會出錯)
        id = id.split('');
        //計算總分
        var total = city[id[0].charCodeAt(0)-65];
        for(var i=1; i<=8; i++){
            total += eval(id[i]) * (9 - i);
        }
        //補上檢查碼(最後一碼)
        total += eval(id[9]);
        //檢查比對碼(餘數應為0);
        if ((total%10 == 0 ))
			return true;
		else
			return false;
    }
}
function checkMail(string)
{
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(!regex.test(string)) {
		return false;
	}else{
		return true;
	}
}
//只能輸入英文數字
function checkEnNum(string) {
	var re = /^[a-zA-Z\d]+$/;
	if (!re.test(string))
		return false;
	return true;
}

//只能輸入中文英文數字
function checkCnEnNum(string) {
	var re = /^[a-zA-Z\d\u4E00-\u9FA5]+$/;
	if (!re.test(string))
		return false;
	return true;
}