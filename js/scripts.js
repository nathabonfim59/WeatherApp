// Constat to store the temp when change scale is activated
var temperature = {
    celcius: null,
    fahrenheit: null
}
// Animate the click in change scale button
function animateButton(buttonId) {
    // Add the aparence of enabled when clicked
    function clearActive(element, animationClass) {
        $("#changeTempScale .active").removeClass("active")
        $("#" + buttonId).addClass("active");

        // Remove the previous animation class
        if (element && animationClass) {
            $(element).removeClass(animationClass);
        }
    }

    function addAnimation(element, animationClass) {
           $(element).addClass(animationClass);
    }
    // Make the conversion between scales
    if (buttonId === "tempCelcius") {
        clearActive("#tempFahrenheit", "animate-right");
        addAnimation("#tempCelcius", "animate-left");

    } else if (buttonId === "tempFahrenheit") {
        clearActive("#tempCelcius", "animate-left");
        addAnimation("#tempFahrenheit", "animate-right");
    }
}

// Get the coordinates of user using geolocation API
function getPosition() {
    if (!navigator.geolocation) {
        alert("Infortunatelly, your navigator don't support geolocation API");
    } else {
        navigator.geolocation.getCurrentPosition(function(position) {
            getWeather({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });
    }
} 

// Get the weather of user in your position
function getWeather(coordinates) {
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?"+
    "lat="+coordinates.latitude +
    "&lon=" + coordinates.longitude, filterInfo);
}

// Filter and struct informations from JSON
function filterInfo(JSON) {
    var weatherInfo = {
        id: JSON.weather[0].id,
        main: JSON.weather[0].main,
        temp: (JSON.main.temp).toFixed(1),
        city: JSON.name,
        country: JSON.sys.country,
    }

    assignValues(weatherInfo);
}

// Assign values to page
function assignValues(weatherInfo) {
    $("#cityName").text(
        weatherInfo.city + ", " +
        weatherInfo.country
    );

    $("#main").text(weatherInfo.main);

    $("#currentTemperature").text(weatherInfo.temp);
    
    assignIcon(weatherInfo.id);
}

// Assign a icon according id
// All conditionals are based on the doc of:
// - WeatherIcons -> https://erikflowers.github.io/weather-icons/
// - OpenWeatherMap -> https://openweathermap.org/weather-conditions
function assignIcon(id) {
    var iconClass = null;
    if (id >= 200 && id < 300) {
        switch(id) {
            case 200:
            case 201:
            case 210:
            case 212:
            case 221:
            case 230:
            case 231:
                iconClass = "wi-storm-showers";
                break;
            case 202:
            case 211:
            case 232:
                iconClass = "wi-thunderstorm";
                break;
            default:
                iconClass = "wi-storm-showers";
                break;
        }
    } else if (id >= 300 && id < 400) {
        switch (id) {
            case 300:
            case 301:
            case 310:
                iconClass = "wi-showers";
                break;
            case 302:
            case 311:
            case 313:
                iconClass = "wi-sleet";
                break;
            case 312:
            case 314:
            case 321:
                iconClass = "wi-rain-mix";
                break;
            default:
                iconClass = "wi-showers"
                break;
        }
    } else if (id >= 500 && id < 600) {
        switch (id) {
            case 500:
            case 520:
            case 521:
            case 531:
                iconClass = "wi-showers";
                break;
            default:
                iconClass = "wi-thunderstorm";
                break;
        }
    } else if (id >= 600 && id < 700) {
        iconClass = "wi-snow";
    } else if (id >= 700 && id < 800) {
        switch (id) {
            case 711:
                iconClass = "wi-smoke";
                break;
            case 721:
                iconClass =  "wi-day-haze";
                break;
            case 731:
            case 751:
                iconClass = "wi-sandstorm";
                break;
            case 741: 
                iconClass = "wi-fog";
                break;
            case 761:
                iconClass = "wi-dust";
                break;
            case 762:
                iconClass = "wi-volcano";
                break;
            case 781:
                iconClass = "wu-tornado";
                break;
            default: 
                iconClass = "wi-cloud";
                break;
        }
    } else if (id >= 800) {
        switch (id) {
            case 800:
                iconClass = "wi-day-sunny";
                break;
            case 801:
            case 802:
            case 803:
            case 804:
                iconClass = "wi-cloud";
                break;
            case 900:
            case 902:
                iconClass = "wi-tornado";
                break;
            case 901:
                iconClass = "wi-storm-showers"
                break;
            case 903:
                iconClass = "wi-snowflake-cold"
                break;
            case 905:
                iconClass = "wi-windy";
                break;
            default: 
                iconClass = "wi-cloud";
                break;
        }
    }

    var weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.className += " " + iconClass;
}

// Change the temp between C and F
function changeScale(scaleId) {
    function convertTempToF(temperatureC) {
        return ((temperatureC * 1.8) + 32).toFixed(1);
    }

    if (!temperature.celcius) {
        temperature.celcius = Number($("#currentTemperature").text()).toFixed(1);
    } 

    if (!temperature.fahrenheit) {
        temperature.fahrenheit = convertTempToF(temperature.celcius);
    }

    if (scaleId === "tempFahrenheit") {
        $("#currentTemperature").text(temperature.fahrenheit);
    } else {
        $("#currentTemperature").text(temperature.celcius);
    }
}

$(document).ready(function() {
    $("#changeTempScale").click(function(event) {
        var requestedScale = event.target.id;
        animateButton(requestedScale);
        changeScale(requestedScale);
    });

    getPosition();
});