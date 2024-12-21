import React, { useRef, useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search_icon.png'
import humidity_icon from '../assets/humidity_icon.png'
import wind_icon from '../assets/wind_icon.png'


const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);

    const search = async (city) => {
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try{
            const url = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}&aqi=no`;

            const response = await fetch(url);
            const data = await response.json();
            
            if(!response.ok){
                alert("City not found.")
                return;
            }

            console.log(data);

            setWeatherData({
                humidity: data.current.humidity,
                windSpeed: data.current.gust_kph,
                temperature: Math.floor(data.current.temp_c),
                city: data.location.name,
                icon: data.current.condition.icon
            })
        }
        catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }
    }

    function handleKeyPress (e) {
        if(e.key === 'Enter'){
            search(inputRef.current.value);
        }
    }

    useEffect(() => {
        search("Boston");
    },[])
    

  return (
    <div className='weather'>

        <div className='search-bar'>
            <input ref={inputRef} type='text' placeholder='Search' onKeyDown={(e) => {handleKeyPress(e)}} />
            <img src={search_icon} alt='' onClick={() => search(inputRef.current.value)} />
        </div>

        {weatherData? <>

            <img src={weatherData.icon} alt='' className='weather-icon'/>
            <p className='temperature'>{weatherData.temperature}°c</p>
            <p className='location'>{weatherData.city}</p>

            <div className='weather-data'>
               <div className='col1'>
                   <img src={humidity_icon}  className='wind-hunidity-icon'/>
                   <div>
                       <p>{weatherData.humidity} %</p>
                       <span>Humidity</span>
                   </div>
               </div>
            
               <div className='col2'>
                   <img src={wind_icon} className='wind-hunidity-icon'/>
                   <div>
                       <p>{weatherData.windSpeed} Km/h</p>
                       <span>Wind Speed</span>
                   </div>
               </div>
            </div>
        
        </> : <></>}


    </div>
  )
}

export default Weather