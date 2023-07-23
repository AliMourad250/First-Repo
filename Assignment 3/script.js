const apiKey = "498913668b3ec7158a1bc95d7a873f66";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search-input");
const searchButton = document.getElementById('search-button');
const weatherLogo = document.querySelector(".weather-logo");
const weatherDiv = document.querySelector(".weather");
const originalHeight = weatherDiv.scrollHeight;

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        weatherDiv.style.maxHeight = "0";
        document.querySelector(".days").style.maxHeight = "0";
    }
    else {
        document.querySelector(".error").style.display = "none";
        weatherDiv.style.maxHeight = "500px";
        document.querySelector(".days").style.maxHeight = "500px";
    }

    var dataW = await response.json();
    console.log(dataW);

    document.querySelector(".temp").innerHTML = Math.round(dataW.list[0].main.temp) + "°C";
    document.querySelector(".city-name").innerHTML = dataW.city.name;
    document.querySelector(".humidity").innerHTML = dataW.list[0].main.humidity;
    document.querySelector(".Wind").innerHTML = Math.round(dataW.list[0].wind.speed);

    if (dataW.list[0].weather[0].main == "Clouds") {
        weatherLogo.src = "images/clouds.png";
    }
    else if (dataW.list[0].weather[0].main == "Clear") {
        weatherLogo.src = "images/clear.png";
    }
    else if (dataW.list[0].weather[0].main == "Ddrizzle") {
        weatherLogo.src = "images/drizzle.png";
    }
    else if (dataW.list[0].weather[0].main == "Rain") {
        weatherLogo.src = "images/rain.png";
    }
    else if (dataW.list[0].weather[0].main == "Mist") {
        weatherLogo.src = "images/mist.png";
    }

    var j = 2;
    let d = ".d";
    let t = ".t";
    let im = ".i";
    let days = [];

    for (let i = 0; i < dataW.list.length; i++) {
        if (dataW.list[i].dt_txt.substring(11, 19) === "12:00:00" && dataW.list[i].dt_txt !== dataW.list[0].dt_txt) {
            if (days.length < 4) {
                days.push(i);
            }
        }
    }

    for (let i = 0; i < days.length; i++) {

        if (i > 0) {
            document.querySelector(d + j).innerHTML = getDayName(dataW.list[days[i]].dt_txt.substring(0, 10), "en-US");
        }

        document.querySelector(t + j).innerHTML = Math.round(dataW.list[days[i]].main.temp) + "°C";

        if (dataW.list[days[i]].weather[0].main == "Clouds") {
            document.querySelector(im + j).src = "images/clouds.png";
        }
        else if (dataW.list[days[i]].weather[0].main == "Clear") {
            document.querySelector(im + j).src = "images/clear.png";
        }
        else if (dataW.list[days[i]].weather[0].main == "Ddrizzle") {
            document.querySelector(im + j).src = "images/drizzle.png";
        }
        else if (dataW.list[days[i]].weather[0].main == "Rain") {
            document.querySelector(im + j).src = "images/rain.png";
        }
        else if (dataW.list[days[i]].weather[0].main == "Mist") {
            document.querySelector(im + j).src = "images/mist.png";
        }
        j++;
    }
}

searchButton.onclick = function () {
    checkWeather(searchBox.value);
}

function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

