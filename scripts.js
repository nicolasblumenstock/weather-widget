$(document).ready(function(){
	var canvas = $('#weather-canvas');
	var context = canvas[0].getContext('2d');
	var mainUrl = `http://api.openweathermap.org/data/2.5/weather?zip=`
	var forecastUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?zip=`
	var dates = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];

	function animateCircle(maths,currentTemp){
		context.fillStyle = '#582b11';
		context.beginPath();
		context.arc(250,175,70,Math.PI*0, Math.PI*2);
		context.fill();
		context.closePath();

		context.lineWidth = 15;
		context.strokeStyle = '#AF125A';
		context.beginPath();
		context.arc(250,175,75,Math.PI*1.5,(Math.PI*2*(maths/100))+ Math.PI*1.5);
		context.stroke();
		context.closePath();		
		maths++;
		if (maths < currentTemp){
		requestAnimationFrame(function(){
			animateCircle(maths,currentTemp);
		});
		}
	}

	animateCircle(0,0);


	$('.weather-submit').submit(function(event){
		context.clearRect(0,0,500,500);
		event.preventDefault();
		var location = $('#weather-location').val()
		var url = `${mainUrl}${location},us&units=imperial&appid=${apiKey}`
		var multidayUrl = `${forecastUrl}${location},us&units=imperial&cnt=5&appid=${apiKey}`
		$.getJSON(url,(data)=>{
			var currTemps = {
				curr: data.main.temp,
				high: data.main.temp_max,
				low: data.main.temp_min,
			}
			var locationName = data.name;
			var currWeather = data.weather[0].description;
			var currIcon = data.weather[0].icon + '.png';
			var currDate = new Date((data.dt)*1000);




			animateCircle(0,currTemps.curr);

			$('#day1').html(dates[currDate.getDay()])
			$('.icon').html(`<img src="http://openweathermap.org/img/w/${currIcon}" />`);
			$('.locale').html(locationName);
			$('.temp-in-f').html(currTemps.curr);
			$('.weather-type').html(currWeather);


		})

		$.getJSON(multidayUrl,(otherData)=>{
			for (let i = 1; i < otherData.list.length; i++){
				var dailyMin = otherData.list[i].temp.min;
				var dailyMax = otherData.list[i].temp.max;
				var dailyWeather = otherData.list[i].weather[0].main;
				var dailyIcon = otherData.list[i].weather[0].icon;

				$('#tabday'+(i+1)).html("hello. is it me you're looking for.")
			}
		})

	})


})