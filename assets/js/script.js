

//Query selectors

let tempEl = document.querySelector(".temp");
let humidityEl = document.querySelector(".humidity");
let cityEl = document.querySelector(".city-name");
let windEl = document.querySelector(".wind");
let uvEl = document.querySelector(".UVI");
let uvSpan = document.querySelector(".uvInsert");

let dayOne = document.querySelector(".day-one");
let dayTwo = document.querySelector(".day-two");
let dayThree = document.querySelector(".day-three");
let dayFour = document.querySelector(".day-four");
let dayFive = document.querySelector(".day-five");

let DayElArray = [dayOne,dayTwo,dayThree,dayFour,dayFive];


let submitElement = document.querySelector(".submitBtn");
let inputElement = document.querySelector(".cityInput");
let historyList = document.querySelector(".history-list");


function runApiCurr(cityName) {

let temp;
let humidity;
let windspeed;
let weatherStatus;
let weatherIcon;
  fetch('https:/api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=e4d6a2bce15eef1bf3b9ca465ebb058a', {

  cache: 'reload',
})
  .then(function (response) {
    return response.json();
  
  })
  .then(function (data) {
    
    
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

    if (weatherStatus == "Mist") {
      weatherIcon = "🌫️"
    }

    
    // assigns temp, humidity, and speed to variables
    temp = data.main.temp;
    humidity = data.main.humidity;
    windspeed = data.wind.speed;

    
    
    
    //displays cityName on screen
    let date = new Date();
    
    month = date.getMonth() +1;
   
    day = date.getDate();
    
    year = date.getFullYear()

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
    //clears previous 5 day forecast if present
    clearFunction();
    
    let inputValue = inputElement.value;
    //capitilizes city input if left lowercase
    inputValue = capFunction(inputValue);
    
    
    historyFunc(inputValue);
    
    inputElement.value = "";
    
    if(!inputValue) {
      alert("Please Input a city");
      return;
    }
    
    runApiCurr(inputValue);
    
  }

  //ADD save to local storage feature, add feature to check for duplicate cities
  function historyFunc(city) {
    var cityList = [];
    
    console.log(cityList);
    //checks if localstorage exists
    
    if (localStorage.getItem("cityList") != null) {
      console.log("local storage test");
      cityList = JSON.parse(localStorage.getItem("cityList"));
    }
   
    cityList.push(city);

    let listItem = document.createElement("li");
    listItem.textContent = city;
    historyList.append(listItem);


    localStorage.setItem("cityList",JSON.stringify(cityList));

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
      fiveDayForecast(lat,lon);
     
    })
    
  
  
  }

  function uvIndexAPI(lat,lon) {
    

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
    //return string.charAt(0).toUpperCase() + string.slice(1);
    
    // found solution online - takes multiple word strings and capitalizes first letter
    return string.replace(/\w\S*/g, function(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      
});
 }


  function fiveDayForecast(lat,lon) { 
    let timestamp;
    let month;
    let day;
    let year;
    let date;
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=current,minutely,hourly,alerts&appid=e4d6a2bce15eef1bf3b9ca465ebb058a', {
      // The browser fetches the resource from the remote server without first looking in the cache.
      // The browser will then update the cache with the downloaded resource.
      cache: 'reload',
    })
      .then(function (response) {
        return response.json();
      
      })
      .then(function (data) {
        
        

        
        
        for (let i=1; i<6; i++) {
        
        let liElDate = document.createElement("li");
        let liElEmoji = document.createElement("li");
        let liElTemp = document.createElement("li");
        let liElWind = document.createElement("li");
        let liElHumidity = document.createElement("li");
        
        
        timestamp = data.daily[i].dt;
        

        date = new Date(timestamp*1000);

        month = date.getMonth() +1;

        day = date.getDate();

        year = date.getFullYear();

        liElDate.textContent = month + "/" + day + "/" + year;
          
        DayElArray[i-1].append(liElDate);
        
        let weatherStatus = data.daily[i].weather[0].main;
        
        let weatherIcon;
        
        //checks weatherstatus and adjusts icon accordingly

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
    
         if (weatherStatus == "Mist") {
          weatherIcon = "🌫️"
        
        }
        

        liElEmoji = weatherIcon;
        DayElArray[i-1].append(liElEmoji);

        let temp = data.daily[i].temp.day;
        //convert kelvin to ferenheit
        temp = (temp-273.15) * 9/5 + 32;
        temp = temp.toFixed(2);
        liElTemp.textContent = temp + "°F";
        DayElArray[i-1].append(liElTemp);

        liElWind.textContent = data.daily[i].wind_speed + " MPH";
        
        DayElArray[i-1].append(liElWind);

        liElHumidity.textContent = "Humidity: " +data.daily[i].humidity +"%";

        DayElArray[i-1].append(liElHumidity);


      
      }


      })

}
//clears 5day forecast
function clearFunction() {

    for (let i = 0; i < DayElArray.length; i++) {
      DayElArray[i].innerHTML = '';

    }

}

//loads search history, runs on page start
function init() {
  if (localStorage !== null) {
  
  let cityList = JSON.parse(localStorage.getItem("cityList"))

  for (let i = 0; i < cityList.length; i++) {
    let listItem = document.createElement("li");
    listItem.textContent = cityList[i];
    historyList.append(listItem);

  }
}

}

//runs when search history is clicked
function historyClick(event) {
  let input = event.target.textContent;
  clearFunction();
  runApiCurr(input);
  
}



  //create eventlistner to get cityname from search bar + add to search history
  submitElement.addEventListener('click', formSubmit);

  historyList.addEventListener('click', historyClick);

  init();