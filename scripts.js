$(document).ready(function(){
	var canvas = $('#weather-canvas');
	var context = canvas[0].getContext('2d');
	var mainUrl = `http://api.openweathermap.org/data/2.5/weather?zip=`

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
		$.getJSON(url,(data)=>{
			var locTemp = data.main.temp;
			var locTemps = {
				curr: data.main.temp,
				high: data.main.temp_max,
				low: data.main.temp_min,
			}
			var locLoc = data.name;
			var locWeath = data.weather[0].description;
			var locIcon = data.weather[0].icon + '.png';
			animateCircle(0,locTemps.curr);
			$('.icon').html(`<img src="http://openweathermap.org/img/w/${locIcon}" />`);
			$('.locale').html(locLoc);
			$('.temp-in-f').html(locTemps.curr);
			$('.weather-type').html(locWeath);
		})
	})
})