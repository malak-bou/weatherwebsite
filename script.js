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

  const response =await  fetch(apiURL)
 
  return response.json()

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
  humditiyvalue.textContent = humdity +'%'
 showDisplaySection(weatherinfosection)

}
function showDisplaySection(section){
  [weatherinfosection, searchCitySection,notfoundsection]
     .forEach(section => section.style.display ='none')

  section.style.display = 'flex'

}
