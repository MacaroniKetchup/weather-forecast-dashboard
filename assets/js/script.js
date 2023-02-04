var APIkey = "d9f33c7e6c4bc9f6d8b69aa6426ef777";
var cityName = "";
var today = dayjs();

// Date and time Formatting for header
var currentDate = today.format('MM/ D/ YYYY h:mm:ss a ');
$("#currentDay").text(currentDate);

// Fetch request for weather based on city name
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
function getWeather(city) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk' + cityName + '&appid=' + APIkey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            // Display current weather
            var currentWeatherEl = $('#currentWeather');
            currentWeatherEl.addClass('border border-success');

            // City Name and Display
            var cityNameEl = ('<h2>');
            cityNameEl.text(cityName);
            currentWeatherEl.append(cityNameEl);

            // Date
            var cityNameDate = data.current.dt;
            cityNameDate = today.unix(cityNameDate).format("MM/DD/YYYY");
            var currentDateEl = $('<div>');
            currentDateEl.text(`(${currentDate}) `);
            cityNameEl.append(currentDateEl);

            // Icon
            var cityWeatherIcon = data.current.weather[0].icon;
            var cityWeatherIconEl = $('<img>');
            cityWeatherIconEl.attr("src", "http://openweathermap.org/img/wn/" + cityWeatherIcon + ".png")
            cityNameEl.append(cityWeatherIconEl);

            // Temp
            var cityTemp = data.current.temp;
            var cityTempEl = $('<p>')
            cityTempEl.text(`T: ${cityTemp}°F`)
            currentWeatherEl.append(cityTempEl);
            // Wind
            var cityWind = data.current.wind_speed;
            var cityWindEl = $('<p>');
            cityWindEl.text(`Wind: ${cityWind} MPH`);
            currentWeatherEl.append(cityWindEl);
            // Humidity
            var cityHumid = data.current.humidity;
            var cityHumidEl = $('<p>');
            cityHumid.text(`Huimdity: ${cityHumid}`);
            currentWeatherEl.append(cityHumidEl);

        })
        .catch(function () {
            // catch any errors
        });


}

window.onload = function () {
    getWeather(cityName);

}

// ------------------------------------------------------------------------------------------------------
// Display current weather
// .then(function (data) {
//     var currentWeatherEl = $('#currentWeather');
//     currentWeatherEl.addClass('border border-success');

//     // City Name and Display
//     var cityNameEl = ('<h2>');
//     cityNameEl.text(cityName);
//     currentWeatherEl.append(cityNameEl);

//     // Date
//     var cityNameDate = data.current.dt;
//     cityNameDate = today.unix(cityNameDate).format("MM/DD/YYYY");
//     var currentDateEl = $('<div>');
//     currentDateEl.text(`(${currentDate}) `);
//     cityNameEl.append(currentDateEl);

//     // Icon
//     var cityWeatherIcon = data.current.weather[0].icon;
//     var cityWeatherIconEl = $('<img>');
//     cityWeatherIconEl.attr("src", "http://openweathermap.org/img/wn/" + cityWeatherIcon + ".png")
//     cityNameEl.append(cityWeatherIconEl);

//     // Temp
//     var cityTemp = data.current.temp;
//     var cityTempEl = $('<p>')
//     cityTempEl.text(`T: ${cityTemp}°F`)
//     currentWeatherEl.append(cityTempEl);
//     // Wind
//     var cityWind = data.current.wind_speed;
//     var cityWindEl = $('<p>');
//     cityWindEl.text(`Wind: ${cityWind} MPH`);
//     currentWeatherEl.append(cityWindEl);
//     // Humidity
//     var cityHumid = data.current.humidity;
//     var cityHumidEl = $('<p>');
//     cityHumid.text(`Huimdity: ${cityHumid}`);
//     currentWeatherEl.append(cityHumidEl);
// })

//----------------------------------------------------------------------------------------------------------
//Storage
// Click Function to search button on #searchBtn
// $('#searchBtn').on('click', function(event) {
//     event.preventDefault();

//     cityName = $('#city-search').val();
//     if (cityName === ''){
//         return alert('Please Enter Valid City Name ');

//     }
//     getWeather(cityName);

//     localStorage.setItem(cityName);
// });