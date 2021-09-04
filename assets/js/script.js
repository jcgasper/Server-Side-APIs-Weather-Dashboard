//curr weather api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// city name 5day forecast api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
//API key e4d6a2bce15eef1bf3b9ca465ebb058a

//Query selectors

let tempEl = document.querySelector(".temp");
let humidityEl = document.querySelector(".humidity");
let cityEl = document.querySelector(".city-name");
let windEl = document.querySelector(".wind");
let uvEl = document.querySelector(".UVI");


let submitElement = document.querySelector(".submitBtn");
let inputElement = document.querySelector(".cityInput");
let historyList = document.querySelector(".search-history");

//needs https:/ to work 
function runApiCurr(cityName) {

let temp;
let humidity;
let windspeed;

  fetch('https:/api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=e4d6a2bce15eef1bf3b9ca465ebb058a', {
  // The browser fetches the resource from the remote server without first looking in the cache.
  // The browser will then update the cache with the downloaded resource.
  cache: 'reload',
})
  .then(function (response) {
    return response.json();
  
  })
  .then(function (data) {
    
    //assigns parsed data to variables
    temp = data.main.temp;
    humidity = data.main.humidity;
    windspeed = data.wind.speed;
    
    
    
    //displays cityName on screen
    let date = new Date();
    month = date.getMonth();
    day = date.getDay();
    year = date.getFullYear()
    console.log(month);
    

    cityEl.textContent = cityName + " (" +month +"/"+day+"/"+year+")";
    
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
        uvEl.textContent = "UV Index: " +uv;
        
      })
  
  
  
  }



  //create eventlistner to get cityname from search bar + add to search history
  submitElement.addEventListener('click', formSubmit);