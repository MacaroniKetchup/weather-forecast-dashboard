var APIkey = "d9f33c7e6c4bc9f6d8b69aa6426ef777";
var cityName = "";
var today = dayjs();

var cityNameEl = document.querySelector(".cityName");
var cityNameDateEL = document.querySelector(".cityNameDate");
var cityWeatherIconEl = document.querySelector(".cityWeatherIcon");
var cityTempEl = document.querySelector(".cityTemp");
var cityWindEl = document.querySelector(".cityWind");
var cityHumidEl = document.querySelector(".cityHumid");

// Date and time Formatting for header
var currentDate = today.format('MM/DD/YYYY');
$("#currentDay").text(currentDate);
console.log(currentDate)

// Fetch request for weather based on city name
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
function getWeather(city) {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + APIkey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log("first-fetch", data)
            displayWeather(data);
        })

    // Geo Fetch

        // var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',appid=' + APIkey;
        // fetch(geoUrl)
        //     .then(function (response) {
        //         return response.json();
        //     })
        //     .then(function (geo) {
        //         console.log("geo-fetch", geo);
        //         displayGeo(geo);
        //     })
        //     .catch(function () {

        //     });


    // 5 Day Forecast Fetch

    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=' + APIkey;

    // geo forecast api fetch
    //'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIkey;
    
    // var lat = geo.coord.lat
    // var lon = geo.coord.lon
        
        fetch(forecastUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log("forecast-fetch", data);
                console.log(dayjs.unix(data.list[0].dt));
                displayForecast(data);
                // let days = data.list
                //     .filter(day => {
                //         return day.dt_txt.endsWith("15:00:00")
                //     })
            })
            .catch(function () {
                // catch errors
            });



}


// Displays Current Weather info on screen
function displayWeather(weather) {
    let exactTime = dayjs.unix(weather.dt);
    cityNameEl.textContent = weather.name;
    cityNameDateEL.textContent = exactTime;
    // cityWeatherIconEl.textContent = weather[0].icon;
    cityTempEl.textContent = "Temp: " + weather.main.temp.toString() + "°F";
    cityWindEl.textContent = "Wind: " + weather.wind.speed.toString() + "MPH";
    cityHumidEl.textContent = "Humidity: " + weather.main.humidity.toString() + "%";
}

// Display 5 Day Forcast (unfortunatly could not get this to work in alloted time for assignment...)
function displayForecast(data) {

    for (var i = 1; 1 <= 5; i++) {
        var date;
        // var icon;
        var temp;
        var wind
        var humidity;
        // in the list Array(40) 3, 11, 19, 27, 35 are all index's that 15:00:00 weather timestamp updates 
        // [3, 11, 19, 27, 35]
        var fiveDayForecastEl = $('#faveDayForecast');

        date = data.list.dt
        let forecastTime = dayjs.unix(data.list.dt).format("MM/DD/YYYY")
        temp = data.list.main.temp
        wind = data.list.wind
        humidity = data.list.main.humidity
        // icon = data.list.weather[1].icon

        var card = document.createElement('div');
        card.classList.add('card', 'col-2', 'm-1', 'bg-success', 'text-white');

        var cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.innerHTML = `<h6>${date}</h6>
                          ${temp}°F
                          ${wind}MPH
                          ${humidity}%`
        console.log(cardBody);
        console.log(date);

        card.appendChild(cardBody);
        fiveDayForecastEl.append(card);

    }

    //Storage
    // function displaySearchHistory() {
    //     var storedCities = JSON.parse(localStorage.getItem("cities")) || {};
    //     var pastSearchesEl = document.getElementById('pastSearches');

    //     pastSearchesEl.innerHTML = '';

    //     var pastCityBtn = document.createElement("button");
    //     pastCityBtn.classList.add('btn', 'btn-primary', 'my-2', 'past-city');
    //     pastCityBtn.setAttribute('style', 'width: 100%');
    //     pastCityBtn.textContent = `${storedCities[i].city}`;
    //     pastSearchesEl.appendChild(pastCityBtn);
    // }
    // return;

}



// Click Function to search button on #searchBtn
$('#searchBtn').on('click', function (event) {
    event.preventDefault();

    cityName = $('#city-search').val();
    if (cityName === '') {
        return alert('Please Enter Valid City Name ');

    }
    getWeather(cityName);


});













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
