const cityInput = document.querySelector('.city-input')
const searchBtn = document.querySelector('.search-btn')
const notfoundsection = document.querySelector('.notfond-city')

const apikey = '12ced11c2f019eed3d9334c112838fc9'
const searchCitySection = document.querySelector('.search-city ')
const weatherinfosection = document.querySelector('.weather-info')
const countrytxt =document.querySelector('.country-txt')
const temptext = document.querySelector('.temp-txt')
const conditiontxt = document.querySelector('.condition-txt')
const humditiyvalue = document.querySelector('.humidity-value-txt')
const windvaluetxt = document.querySelector('.wind-value-txt')
const weathersummaryimg = document.querySelector('.weather-summary-img')
const currenttxtdate = document.querySelector('.current-date-txt')
const forecastitemcon = document.querySelector('.forecast-item-con')
searchBtn.addEventListener('click', () => {
  if(cityInput.value.trim() != '') {
    updateWeatherInfo(cityInput.value)
    cityInput.value=''
    cityInput.blur()
  }
})
cityInput.addEventListener('keydown',(event) =>{
  if(event.key =='Enter' && cityInput.value.trim() != '')
  {
    updateWeatherInfo(cityInput.value)
    cityInput.value=''
    cityInput.blur()
  }
})
async function getFetchData(endPoint, city){
  const apiURL =  `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apikey}&units=matic`

  console.log("API URL:", apiURL);

  const response = await fetch(apiURL)
 
  return response.json()

}

function getWeatherIcon(id){
  if(id <= 232) return 'thunderstorm.svg'
  if(id <= 321) return 'drizzle.png'
  if(id <= 531) return 'rain.png'
  if(id <= 622) return 'snow.png'
  if(id <= 781) return 'atmosphere.png'
  if(id <= 800) return 'clear.png'
  else return 'cloudy.png'
  console.log(id)
}

async function updateWeatherInfo(city) {
  const weatherData =await getFetchData('weather', city)
  if(weatherData.cod!=200){
    showDisplaySection(notfoundsection)
       return
  }
    console.log(weatherData)
    const {
      name: country,
      main: {temp, humidity},
      weather: [{id, main }],
      wind: {speed}
    } = weatherData 
  countrytxt.textContent = country
  temptext.textContent = Math.round(temp) + '°C'
  conditiontxt.textContent = main
  humditiyvalue.textContent = humidity +'%'
  windvaluetxt.textContent = speed + 'M/s'

  currenttxtdate.textContent = getCurrentDate()
    console.log(getCurrentDate())
  weathersummaryimg.src = `pictures/${getWeatherIcon(id)}`

    await updateForecastsInfo(city)
 showDisplaySection(weatherinfosection)
}

async function updateForecastsInfo(city){
  const forecastsData = await getFetchData('forecast',city)
  const timeTaken = '12:00:00'
  const todaydate = new Date().toISOString().split('T')[0]
  forecastitemcon.innerHTML = ''
  forecastsData.list.forEach(forecastweather => {
    if(forecastweather.dt_txt.includes(timeTaken)&& !forecastweather.dt_txt.includes(todaydate)){
      updateForecastsItems(forecastweather)
    }
  })
}
 function updateForecastsItems(weatherData){
    console.log(weatherData)
    const {
      dt_txt: date,
      weather: [{id}],
      main:{ temp }
    } = weatherData

    const dateTaken = new Date(date)
    const dateOption = {
      day: '2-digit',
      month: 'short'
    }
    const dateResult = dateTaken.toLocaleDateString('en-US',dateOption)
    const forecastItem = `
            <div class="forecast-item">
              <h5 class="forecast-item-date regular-txt">${dateResult}</h5>
              <img src="pictures/${getWeatherIcon(id)}"  class="forecast-item-img">
              <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
            </div> 
    `

    forecastitemcon.insertAdjacentHTML('beforeend',forecastItem)
 }

function getCurrentDate(){
  const currentDate = new Date()
  const options = {
       weekday: 'short',
       day: '2-digit',
       month: 'short'
  }
  return currentDate.toLocaleDateString('en-GB', options)
}


function showDisplaySection(section){
  [weatherinfosection, searchCitySection,notfoundsection]
     .forEach(section => section.style.display ='none')

  section.style.display = 'flex'

}
