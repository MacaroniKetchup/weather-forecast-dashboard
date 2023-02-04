var APIkey = "63ac7b714560be67d7d8bb1554b4b6dd";

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// Fetch request for weather based on city name
function getWeather( cityName ) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid={API key}' + APIkey;

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })
}