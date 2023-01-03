import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

function App() {

  const [weather, setWeather] = useState({});
  const [ isCentigrade, setIscentigrade] = useState(true);

  useEffect(() => {
   
    
    function success(pos) {
      const crd = pos.coords;

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=8479059023e872bec83f4d74dbbd45fd`)
        .then( res => setWeather(res.data) )

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error);

  }, [])

  console.log(weather)

 
  let kelvin = weather.main?.temp
  let centigrades = (kelvin - 273.15).toFixed(2)
  let fahrenheit = ((kelvin - 273.15) * (9/5) + 32).toFixed(2)

  const changeDegrees = () => {
    setIscentigrade(!isCentigrade)
  }

  return (
    <div className="App">

      <h1 style={{color:'Black'}}>my town weather</h1>
      <h2 style={{color:'Black'}}>{ weather.name }, { weather.sys?.country }</h2>
      <h2 style={{color:'Black'}}>{ weather.weather?.[0].description }</h2>
      <img src= {`http://openweathermap.org/img/wn/${ weather.weather?.[0].icon }@2x.png`} alt="" />
      <h2> Clouds: <span style={{color:'Black'}}>{ weather.clouds?.all }%</span> </h2>
      <h2> Wind speed: <span style={{color:'Black'}}>{ weather.wind?.speed } m/s</span> </h2>
      <h2> Temperature: <span style={{color:'Black'}}>{ isCentigrade ? centigrades : fahrenheit }° { isCentigrade ? 'centigrades' : 'fahrenheit' }</span> </h2>
      <button onClick={changeDegrees}> {isCentigrade ? 'to fahrenheit' : 'to Centigrades'} </button>

    </div>
  ) 
}

export default App
