const api = {
    code: "e366989eea54e6705337d4d0a7a9d882",
    base: "https://api.openweathermap.org/data/2.5/"
}

const box = document.querySelector('.search-area');
/*Queryselector retusn first element within document that matches the
specified selector or group of selectors*/
box.addEventListener('keypress',setRequest);
/*this uses event types such as keypress and calls a function if the event
occurs. Also, setquery is a type of listener, which is an object that
receives notification when event occurs, and SetQuery is either null
if the event does not happen or a function if it does happen*/


function getWeather(request) {
    //fetch request, query is from the search area value, APP ID = api key
    fetch(`${api.base}weather?q=${request}&units=metric&APPID=${api.code}`)
    .then(weather => {
        /*converting weather response type and reads it to completion
        then returns a promise which resolves with the result of parsing 
        the text as json. But the result is not json it is parsing the json
        and then returning a JavaScript object*/
        return weather.json();
    }).then(displayWeather);
}


function setRequest(event){
    //13 is the enter hotkey on your keyboard
    //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    if (event.keyCode == 13) {
        getWeather(box.value);
        //console.log(box.value);
    }
}



function setDate(d){
    var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    
    var week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
    "Saturday", "Sunday"];

    var current_y = d.getFullYear();
    var current_m = months[d.getMonth()];
    var current_d = week[d.getDay()];
    var date = d.getDate();
    
    return `${current_d} ${date} ${current_m} ${current_y}`;
}

function displayWeather (weather) {
    //console.log(weather);
    
    var now = new Date();
    var date = document.querySelector('.date');
    date.innerText = setDate(now);

    var element = document.querySelector('.weather');
    element.innerText = weather.weather[0].main;

    var climate = document.querySelector('.temp');
    climate.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    var city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    var extremes = document.querySelector('.high-low');
    extremes.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

