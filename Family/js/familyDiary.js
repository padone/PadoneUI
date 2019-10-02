var url = "http://140.121.196.23:3390/PadoneAS/WriteFamilyDiaryServlet";
var url2 = "http://140.121.196.23:3390/PadoneAS/GetFamilyDiaryServlet";
var userID;
userID = sessionStorage.getItem('msg');
var identity;
identity = sessionStorage.getItem('identityGet');

$(document).ready(function() {
	$("#diarySearch").click(function() {
		var userID;
		userID = sessionStorage.getItem('msg');
		var date;
		date = $("#date").val();
		$.ajax({
			type: "GET",
			url : url2,
			data : {
				date : date,
				userID : userID
			},
			dataType : "json",
			success : function(response) {
				console.log(response);
				$("#description").append(
					response.description
				);
			},
			error : function() {
				alert("失敗");
			},
		});
	});
});

$(document).ready(function() {
	$("#diaryPost").click(function() {
			$.ajax({
				type: "GET",
				url : url,
				data : {
					date : $("#date").val(),
					picture : $("#curlLabel").html(),
					description : $("#description").val(),
					userID : userID
				},
				dataType : "json",
				success : function(response) {
					alert("新增成功！");
					window.location.href = 'FamilyDiary.html';
				},
				error : function() {
					alert("失敗");
				}
			});
	});
});

//上傳圖片
function makeImgurUrl(para) {
	const id = 'cd39c2181d056c8'; // 填入 App 的 Client ID
	const token = 'd31ada64e270338e2c9508b655df8306bba3c403'; // 填入 token
	const album = 'i9gCUlp'; // 若要指定傳到某個相簿，就填入相簿的 ID

	let file;
	let notiLabel;
	let urlLabel;

	if (para == "class") {
		file = $('#myFile').prop('files')[0];
		notiLabel = $("#cnoti");
		urlLabel = $("#curlLabel");
	} else {	//pare = set
		file = $('#newSetFile').prop('files')[0];
		notiLabel = $("#snoti");
		urlLabel = $("#surlLabel");
	}

	let settings = {
		async: false,
		crossDomain: true,
		processData: false,
		contentType: false,
		type: 'POST',
		url: 'https://api.imgur.com/3/image',
		headers: {
			Authorization: 'Bearer ' + token
		},
		mimeType: 'multipart/form-data'
	};
	let form = new FormData();
	form.append('image', file);
	form.append('album', album); // 有要指定的相簿就加這行

	settings.data = form;

	$.ajax(settings).done(function(res) {
		notiLabel.html("成功上傳摟～");
		urlLabel.html(JSON.parse(res).data.link);
	});
}