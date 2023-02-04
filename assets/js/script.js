var APIkey = "d9f33c7e6c4bc9f6d8b69aa6426ef777";
var cityName = "";
var today = dayjs();

// Date and time Formatting for header
var currentDate = today.format('MMMM D, YYYY h:mm:ss a ');
$("#currentDay").text(currentDate);

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// Fetch request for weather based on city name
function getWeather( city ) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk' + cityName + '&appid=' + APIkey;

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })
    .catch(function(){
        // catch any errors
    });
}

window.onload = function(){
    getWeather();
}