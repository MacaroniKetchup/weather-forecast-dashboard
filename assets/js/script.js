var APIkey = "d9f33c7e6c4bc9f6d8b69aa6426ef777";
var cityName = "";
var today = dayjs();

var cityNameEl = document.querySelector(".cityName");
var cityNameDateEL = document.querySelector(".cityNameDate");
var cityWeatherIconEl = document.querySelector(".cityWeatherIcon");
var cityTempEl = document.querySelector(".cityTemp");
var cityWindEl = document.querySelector(".cityWind");
var cityHumidEl = document.querySelector(".cityHuimd");


// Date and time Formatting for header
var currentDate = today.format('YYYY/DD/MM h:mm a ');
$("#currentDay").text(currentDate);

// Fetch request for weather based on city name
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
function getWeather(city) {
    //CANT GET CITY NAME VARIABLE TO WORK IN QUERY USING LONDON, UK FOR NOW TO GRAB THE API FETCH TO GET WEATHER TO DISPLAY 
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + APIkey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // weather.city = data.name;
            // weather.date = data.dt;
            // weather.iconId = data.weather[0].icon;
            // weather.temp = data.main.temp - IMPERIAL;
            // weather.wind = data.wind_speed;
            // weather.humindity = data.main.humidity;
            console.log("first-fetch", data)
            displayWeather(data);
        })

        var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=' +APIkey;

        fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then (function(data) {
            console.log("forecast-fetch",data);
            displayForecast(data);
        })
        .catch(function () {
            // catch errors
        })
        .catch(function () {
            // catch errors
        });

}

// function getForecast(city) {
// }

// Attempting to display info on screen
function displayWeather(weather) {
    cityNameEl.textContent = weather.name;
    cityNameDateEL.textContent = weather.dt;
    // cityWeatherIconEl.textContent = weather.id.icon;
    cityTempEl.textContent = weather.main.temp.toString();
    cityWindEl.textContent = weather.wind.speed.toString();
    cityHumidEl.textContent = weather.main.humidity.toString();
}

// 5 Day Forecast Pull








// ------------------------------------------------------------------------------------------------------
// window.onload = function () {
//     getWeather(cityName);

// }

// var cityName = data.name;
// var cityNameDate = data.current.dt;
// var cityWeatherIcon = data.current.weather[0].icon;
// var cityTemp = data.current.temp;
// var cityWind = data.current.wind_speed;
// var cityHumid = data.current.humidity;


// ------------------------------------------------------------------------------------------------------
// Display current weather
// .then(function (data) {
// Display current weather
// var currentWeatherEl = $('#currentWeather');
// currentWeatherEl.addClass('border border-success');

// // City Name and Display
// var cityName = data.current.name
// var currentweather = document.createElement('h2');
// var cityNameEl = $('<h2>');
// cityNameEl.text(cityName);
// currentWeatherEl.append(cityNameEl);


// // Date
// var cityNameDate = data.current.dt;
// cityNameDate = today.unix(cityNameDate).format("MM/DD/YYYY");
// var currentDateEl = $('<div>');
// currentDateEl.text(`(${currentDate}) `);
// cityNameEl.append(currentDateEl);

// // Icon
// var cityWeatherIcon = data.current.weather[0].icon;
// var cityWeatherIconEl = $('<img>');
// cityWeatherIconEl.attr("src", "http://openweathermap.org/img/wn/" + cityWeatherIcon + ".png")
// cityNameEl.append(cityWeatherIconEl);

// // Temp
// var cityTemp = data.current.temp;
// var cityTempEl = $('<p>')
// cityTempEl.text(`T: ${cityTemp}°F`)
// currentWeatherEl.append(cityTempEl);
// // Wind
// var cityWind = data.current.wind_speed;
// var cityWindEl = $('<p>');
// cityWindEl.text(`Wind: ${cityWind} MPH`);
// currentWeatherEl.append(cityWindEl);
// // Humidity
// var cityHumid = data.current.humidity;
// var cityHumidEl = $('<p>');
// cityHumid.text(`Huimdity: ${cityHumid}`);
// currentWeatherEl.append(cityHumidEl);
// })

//----------------------------------------------------------------------------------------------------------
//Storage
// Click Function to search button on #searchBtn
$('#searchBtn').on('click', function (event) {
    event.preventDefault();

    cityName = $('#city-search').val();
    if (cityName === '') {
        return alert('Please Enter Valid City Name ');

    }
    getWeather(cityName);

    // localStorage.setItem(cityName);
});