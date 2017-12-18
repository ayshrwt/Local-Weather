var api = 'https://fcc-weather-api.glitch.me/api/current';
var tempIn = 'celcius';
var t;
$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(function(position) {
    showWeather(position.coords.latitude, position.coords.longitude);
  });

  function showWeather(lat, long) {
    $.ajax({
      url : api + '?lat='+ lat +'&lon=' + long
    }).done(function(data){
        t = data.main.temp;
        $('.box').html(`
          <h2>${data.name}</h2>
          <h3>${data.weather[0].main}</h3>
        `);

        $('#tempB').html(`
           ${data.main.temp}&deg;C
        `);

        $('.imW').html(`
            <img src=${data.weather[0].icon} alt='img-describing-weather'>
        `);
    });
  }

  $('#tempB').on('click',function(){
    if(tempIn=='celcius'){
      tempIn = 'faranite';
      t = (t*9)/5 + 32;
      $('#tempB').html(`
         ${t}&deg;F
      `);
    }else{
      tempIn='celcius';
      t = (t - 32)*5/9;
      $('#tempB').html(`
         ${t}&deg;C
      `);
    }
  });

});
