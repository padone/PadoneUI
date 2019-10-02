var url = "http://140.121.196.23:3390/PadoneAS/WriteArticleServlet";
var url2 = "http://140.121.196.23:3390/HospitalCrawler/HospitalServlet";
var userID;
var tag = new Array();
userID = sessionStorage.getItem('msg');
$(document).ready(function() {
	$.ajax({
		url : url2,
		dataType : "json",
		success : function(response) {
			for(var i = 0; i < response.length; i++){
				$("#location").append(
					'<option value="'+ i +'">' + response[i].county + '' + response[i].hospitalName + '</option>'
				);
			}
		},
		error : function() {
			alert("失敗");
		}
	});
});
$(document).ready(function() {
	var totalTag = $("#tag").val();
	tag = totalTag.split("#");
	$("#post").click(function() {
			$.ajax({
				type: "POST",
				url : url,
				data : {
					title : $("#title").val(),
					hospital : $("#location").val(),
					description : $("#description").val(),
					picture : $("#curlLabel").html(),
					department : $("#class").val(),
					tag : JSON.stringify(tag),
					authorID : userID
				},
				dataType : "json",
				success : function(response) {
					alert("新增成功！");
					window.location.href = 'FamilyHome.html';
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