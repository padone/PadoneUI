var url = "http://140.121.196.23:3390/PadoneAS/WriteArticleServlet";
var url2 = "http://140.121.196.23:3390/HospitalCrawler/HospitalServlet";
var userID;
var tag = new Array();
var imgArray = new Array();
var cityEmp = '';
var cityEmpCount = 0;
var temp;
userID = sessionStorage.getItem('msg');
function makeRequest(){
  xhr = new XMLHttpRequest();
  xhr.open( 'POST','https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDIHHXeYB_Hsf21AAaQX8qd5Y2NDsckUbI');
  xhr.onload = function(){
    // do something
    var response = JSON.parse(this.responseText);
    console.log(response)
  }
  xhr.send();
}
makeRequest();
var lat;
var lon;
function getWeather() {
  xhr = new XMLHttpRequest();

  xhr.onload = function() {
    var response = JSON.parse(this.responseText);
   // var city = response.city.name + ", " + response.city.country;
	var city = response.city.name;
    var weatherTitle = response.list[0].weather[0].main;
    var temp = response.list[0].main.temp + "C";
	sessionStorage.setItem('city', city);
    /*var weatherContainer = document.querySelector("#weather");
    weatherContainer.innerHTML = city + "<br/>" + weatherTitle + "<br/>" + temp;*/
  };
  xhr.open(
    "GET",
    "https://api.openweathermap.org/data/2.5/forecast?APPID=9c39fa3ce9d953fdd507d7d9f77093ef&units=metric" +
      lat +
      lon,
    true
  );
  xhr.send();
}

function getLocation() {
  xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDIHHXeYB_Hsf21AAaQX8qd5Y2NDsckUbI",
    true
  );
  xhr.onload = function() {
    // do something
    var response = JSON.parse(this.responseText);
    lat = "&lat=" + response.location.lat;
    lon = "&lon=" + response.location.lng;
    getWeather();
  };
  xhr.send();
}
getLocation();
$(document).ready(function() {
	cityEmp = sessionStorage.getItem('city');
	if (cityEmp == 'Keelung'){cityEmp = '基隆市'}
	else if(cityEmp == 'New Taipei'){cityEmp = '新北市'}
	else if(cityEmp == 'Taipei'){cityEmp = '台北市'}
	else if(cityEmp == 'Yilan'){cityEmp = '宜蘭市'}
	else if(cityEmp == 'Taoyuan'){cityEmp = '桃園市'}
	else if(cityEmp == 'Hsinchu'){cityEmp = '新竹市'}
	else if(cityEmp == 'Miaoli'){cityEmp = '苗栗縣'}
	else if(cityEmp == 'Taichung'){cityEmp = '台中市'}
	else if(cityEmp == 'Changhua'){cityEmp = '彰化縣'}
	else if(cityEmp == 'Nantou'){cityEmp = '南投縣'}
	else if(cityEmp == 'Yunlin'){cityEmp = '雲林縣'}
	else if(cityEmp == 'Chiayi'){cityEmp = '嘉義縣'}
	else if(cityEmp == 'Tainan'){cityEmp = '台南市'}
	else if(cityEmp == 'Kaohsiung'){cityEmp = '高雄市'}
	else if(cityEmp == 'Pingtung'){cityEmp = '屏東縣'}
	else if(cityEmp == 'Taitung'){cityEmp = '台東縣'}
	else if(cityEmp == 'Hualien'){cityEmp = '花蓮縣'}
	else if(cityEmp == 'Penghu'){cityEmp = '澎湖縣'}
	else if(cityEmp == 'Kinmen'){cityEmp = '金門縣'}
	else if(cityEmp == 'Lianchiang'){cityEmp = '連江縣'}
	console.log(cityEmp);
	$.ajax({
		url : url2,
		dataType : "json",
		success : function(response) {
			for(var u = 0; u < response.length; u++){
				for(var v = 0; v < response.length - 1 - u; v++){
					if(response[v].count > response[v+1].count){
						temp = response[v];
						response[v] = response[v + 1];
						response[v + 1] = temp;
					}
				}
			}
			for(var i = 0; i < response.length; i++){
				if (cityEmp == response[i].county && cityEmpCount == 0){
					$("#location").append(
						'<option selected>' + response[i].county + '' + response[i].hospitalName + '</option>'
					);
					cityEmpCount ++;
					console.log(cityEmp);
				}
				else {
					$("#location").append(
						'<option>' + response[i].county + '' + response[i].hospitalName + '</option>'
					);
					//console.log(cityEmp);
				}
			}
			$("#location").append(
				'<option>無</option>'
			);
		},
		error : function() {
			alert("失敗");
		}
	});
});
$(document).ready(function() {
	//tag = ['1','2','3','4'];
	$("#post").click(function() {
		var totalTag = $("#tag").val();
		tag = totalTag.split("#");
			$.ajax({
				type: "POST",
				url : url,
				dataType : "json",
				//traditional: true,
				data : {
					title : $("#title").val(),
					hospital : $("#location").val(),
					description : $("#description").val(),
					picture : JSON.stringify(imgArray),
					department : $("#class").val(),
					tag : JSON.stringify(tag),
					authorID : userID
				},
				success : function(response) {
					console.log(tag);
					alert("新增成功！");
					window.location.href = 'PatientHome.html';
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

