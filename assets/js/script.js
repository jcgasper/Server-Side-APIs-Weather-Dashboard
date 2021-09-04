//curr weather api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// city name 5day forecast api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
//API key e4d6a2bce15eef1bf3b9ca465ebb058a

//Query selectors

let tempEl = document.querySelector(".temp");
let humidityEl = document.querySelector(".humidity");
let cityEl = document.querySelector(".city-name");
let windEl = document.querySelector(".wind");
let uvEl = document.querySelector(".UVI");
let uvSpan = document.querySelector(".uvInsert");


let submitElement = document.querySelector(".submitBtn");
let inputElement = document.querySelector(".cityInput");
let historyList = document.querySelector(".search-history");

//needs https:/ to work 
function runApiCurr(cityName) {

let temp;
let humidity;
let windspeed;
let weatherStatus;
let weatherIcon;
  fetch('https:/api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=e4d6a2bce15eef1bf3b9ca465ebb058a', {
  // The browser fetches the resource from the remote server without first looking in the cache.
  // The browser will then update the cache with the downloaded resource.
  cache: 'reload',
})
  .then(function (response) {
    return response.json();
  
  })
  .then(function (data) {
    
    //capitalizes city name if left lowercase on input
    //cityName = capFunction(cityName);
    //console.log(cityName);

    //check data.weather[0].main and assigns emoji based on status
    weatherStatus = data.weather[0].main;
    
    
    if (weatherStatus == "Clouds") {
      weatherIcon = "☁️";
    }

    if (weatherStatus == "Clear") {
      weatherIcon = "☀️";
    }

    if (weatherStatus == "Atmosphere") {
      weatherIcon = "🌫️";
    }
    
    if (weatherStatus == "Snow") {
    weatherIcon = "🌨️";
    }

    if (weatherStatus == "Rain") {
      weatherIcon = "🌧️";
    }

    if (weatherStatus == "Drizzle") {
      weatherIcon = "🌧️";
    }
    
    if (weatherStatus == "Thunderstorm") {
      weatherIcon = "🌩️";
    }

    
    
    // assigns temp, humidity, and speed to variables
    temp = data.main.temp;
    humidity = data.main.humidity;
    windspeed = data.wind.speed;
    
    
    
    //displays cityName on screen
    let date = new Date();
    month = date.getMonth();
    day = date.getDay();
    year = date.getFullYear()
    console.log(month);
    

    cityEl.textContent = cityName + weatherIcon + " (" +month +"/"+day+"/"+year+")";
    
    //convert kelvin to ferenheit
    temp = (temp-273.15) * 9/5 + 32;
    temp = temp.toFixed(2);

    tempEl.textContent = "Temp: "+ temp + " °F";
    windEl.textContent ="Wind: " + windspeed + " mph";
    humidityEl.textContent = "Humidity: " +humidity + "%";  
  
  })
  .then(geoCodingApi(cityName));
  }


//run 5day API

  function formSubmit(event) {
    event.preventDefault();
    let inputValue = inputElement.value;
    //capitilizes city input if left lowercase
    inputValue = capFunction(inputValue);
    
    
    historyFunc(inputValue);
    console.log(inputValue);
    inputElement.value = "";
    
    if(!inputValue) {
      alert("Please Input a city");
      return;
    }
    
    console.log("submit Test");
    
    runApiCurr(inputValue);
  
  }

  function historyFunc(city) {
    let listItem = document.createElement("li");
    listItem.textContent = city;
    historyList.append(listItem);

    //expand to add class to created li items, so that you can click for search history


  }

 

  function geoCodingApi(cityName) {
    let lat;
    let lon;
  fetch('http://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&limit=1&appid=e4d6a2bce15eef1bf3b9ca465ebb058a', {
    // The browser fetches the resource from the remote server without first looking in the cache.
    // The browser will then update the cache with the downloaded resource.
    cache: 'reload',
  })
    .then(function (response) {
      return response.json();
    
    })
    .then(function (data) {
      
       lat = data[0].lat;
       lon = data[0].lon;
      
      
      uvIndexAPI(lat,lon);
     
    })
    
  
  
  }

  function uvIndexAPI(lat,lon) {
    console.log("api test " + lat);
    console.log("api test " + lon);

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=e4d6a2bce15eef1bf3b9ca465ebb058a', {
      // The browser fetches the resource from the remote server without first looking in the cache.
      // The browser will then update the cache with the downloaded resource.
      cache: 'reload',
    })
      .then(function (response) {
        return response.json();
      
      })
      .then(function (data) {
        let uv = data.current.uvi;
        uvEl.style.display = "inherit";
        
        uvSpan.textContent = uv;
        
        //write if then to change background color of uv depending on value
        if (uv<=10) {
          uvSpan.style.backgroundColor = "red"
        }  
        if (uv <8) {
          uvSpan.style.backgroundColor = "orange"
        }
        
        if (uv <6) {
          uvSpan.style.backgroundColor = "yellow"
        }
        
         
        if (uv <3) {
          uvSpan.style.backgroundColor = "green"
        }  
        
        
      })
  
  
  
  }

  function capFunction(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //create eventlistner to get cityname from search bar + add to search history
  submitElement.addEventListener('click', formSubmit);