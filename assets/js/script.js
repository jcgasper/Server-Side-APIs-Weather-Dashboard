//curr weather api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// city name 5day forecast api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
//API key e4d6a2bce15eef1bf3b9ca465ebb058a

//Query selectors

let tempEl = document.querySelector(".temp");
let submitElement = document.querySelector(".submitBtn");
let inputElement = document.querySelector(".cityInput");

//needs https:/ to work 
fetch('https:/api.openweathermap.org/data/2.5/weather?q=columbus&appid=e4d6a2bce15eef1bf3b9ca465ebb058a', {
  // The browser fetches the resource from the remote server without first looking in the cache.
  // The browser will then update the cache with the downloaded resource.
  cache: 'reload',
})
  .then(function (response) {
    return response.json();
  
  })
  .then(function (data) {
    console.log(data.main.temp);
    
    
  });


  function formSubmit(event) {
    event.preventDefault();
    let inputValue = inputElement.value;
    console.log(inputValue);

    if(!inputValue) {
      alert("Please Input a city");
      return;
    }
    
    console.log("submit Test");
  }








  //create eventlistner to get cityname from search bar + add to search history
  submitElement.addEventListener('click', formSubmit);