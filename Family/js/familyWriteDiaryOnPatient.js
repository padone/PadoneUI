var url = "http://140.121.196.23:3390/PadoneAS/WritePatientDiaryServlet";
var url2 = "http://140.121.196.23:3390/PadoneAS/GetPatientDiaryServlet";
var url3 = "http://140.121.196.23:3390/PadoneAS/WriteFamilyDescription"
var userID;
userID = sessionStorage.getItem('msg');
var identity;
identity = sessionStorage.getItem('identityGet');
var imgArray = new Array();
var countOfPicture = new Array("First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth","Ninth","Tenth");
$(document).ready(function() {
	$("#diarySearch").click(function() {
		var personID;
		personID = sessionStorage.getItem('familyLookPatientID');
		var date;
		date = $("#date").val();
		console.log(personID);
		console.log(identity);
		console.log(date);
		$.ajax({
			type: "GET",
			url : url2,
			data : {
				date : date,
				userID : personID
			},
			dataType : "json",
			success : function(response) {
				document.getElementById('diaryPicture').innerHTML="";
				document.getElementById('familyDiary').innerHTML="";
				document.getElementById('patientDiary').innerHTML="";
				console.log(response);
				$("#familyDiary").append(
					response.familyDescription
				);
				if(response.patientDescription == undefined){
					$("#patientDiary").append(
						'<img src="patientPicture/DiaryEmpty.png;" style="height:450px;width:1000px;"></img><br>'
					);
					console.log(456);
				}
				else{
						$("#patientDiary").append(
							'<textarea class="form-control" placeholder="日記內容" style="height:300px;width:1000px;" readonly>'+response.patientDescription+'</textarea>'
						);
						$("#diaryPicture").append(
						'<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">' + 
							'<ol class="carousel-indicators" id=inputPicture>' + 
							'</ol>' + 
							'<div class="carousel-inner" id="setPicture">' + 
							'</div>' +
							'<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">' + 
								'<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
								'<span class="sr-only">Previous</span>' + 
							'</a>' + 
							'<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">' + 
								'<span class="carousel-control-next-icon" aria-hidden="true"></span>' + 
								'<span class="sr-only">Next</span>' + 
							'</a>' + 
					'</div>'
					);
					for(var g=0;g<(response.imageURL).length;g++)
					{
						if(g == 0)
						{
							$("#inputPicture").append(
								'<li data-target="#carouselExampleIndicators" data-slide-to="'+g+'" class="active"></li>'
							);
							$("#setPicture").append(
								'<div class="carousel-item active">' + 
									'<img class="d-block w-100" src="'+ response.imageURL[g] +'" alt="'+countOfPicture[g]+' slide">' + 
								'</div>'
							);
						}
						else
						{
							$("#inputPicture").append(
								'<li data-target="#carouselExampleIndicators" data-slide-to="'+g+'"></li>'
							);
							$("#setPicture").append(
								'<div class="carousel-item">' + 
									'<img class="d-block w-100" src="'+ response.imageURL[g] +'" alt="'+countOfPicture[g]+' slide">' + 
								'</div>'
							);
						}
					}
				}
			},
			error : function() {
				alert("失敗");
			},
		});
	});
});

$(document).ready(function() {
	var personID;
	personID = sessionStorage.getItem('familyLookPatientID');
	var userID;
	userID = sessionStorage.getItem('msg');
	$("#diaryPost").click(function() {
			$.ajax({
				type: "GET",
				url : url3,
				data : {
					date : $("#date").val(),
					familyDescription : $("#familyDiary").val(),
					userID : personID,
					familyID : userID
				},
				dataType : "json",
				success : function(response) {
					alert("新增成功！");
					window.location.href = 'FamilyAndPatientDiary.html';
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
    for (var count in $('#myFile').prop('files')) {

        let file;
        let notiLabel;
        let urlLabel;

        if (para == "class") {
            file = $('#myFile').prop('files')[count];
            notiLabel = $("#cnoti");
            urlLabel = $("#curlLabel");
        } else { //pare = set
            file = $('#newSetFile').prop('files')[count];
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
            imgArray[count] = JSON.parse(res).data.link;
        });
    }
    console.log(imgArray);
}