import React, { useEffect ,useRef,useState} from "react";
import "./Weather.css";

import search_icon from "../assets/search.png";
import wind from "../assets/wind.png"
import humidity from "../assets/humidity.png"
import cloud from "../assets/cloud.png"
import drizzle from "../assets/drizzle.png"
import rain from "../assets/rain.png"
import snow from "../assets/snow.png"
import clear from '../assets/clear.png'


const Weather = () => {
  const inputRef=useRef();
  const [weather, setWeather] = useState(false);

  const allIcons={
    "01d":clear,
    "01n":clear,
    "02d":cloud,
    "02n":cloud,
    "03d":cloud,
    "03n":cloud,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "13n":snow,
  
  }
   const  search = async (city)=>{
    try{
      if(city ===""){
        alert("Enter city name");
        return;
      }
   const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`

     const responce =await fetch(url);
     const data = await responce.json();
 
     if(!responce.ok){
      alert(data.message);
      return;
     }

     const icon=allIcons[data.weather[0].icon] || clear;
     console.log(data);
     setWeather({
       temp:Math.floor(data.main.temp),
       humidity:data.main.humidity,
       wind:data.wind.speed,
       location:data.name,
       icon:icon
     });
    }catch(err){
      setWeather(false);
      console.log(err);
    }
   }

   useEffect(()=>{
       search("amreli");
   },[]);
  return (

    
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" name="city" />
        <img src={search_icon} alt="" onClick={()=>{
          search(inputRef.current.value);
        }}/>
      </div>
  {
    weather?<>
     <img src={weather.icon} alt="" />
      <p className="temperature">{weather.temp}◦c</p>
      <p className="location">{weather.location}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidity} alt="" />
          <div>
            <p>{weather.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        
        <div className="col">
          <img src={wind} alt="" />
          <div>
            <p>{weather.wind} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>

      </div>
    </>:<></>
  }
     
    </div>
  );
};

export default Weather;
