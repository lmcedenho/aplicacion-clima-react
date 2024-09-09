import React, { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {

  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = 'YOUR_API_KEY'
  const diffKelvin = 273.15

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchWeatherData()

  }

  return (
    <div className='container'>
      <h1>App Clima</h1>
      {weatherData && (
        <div className='content-data'>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>{Math.floor(weatherData.main.temp - diffKelvin)}ºC</p>
          <p>{weatherData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description} />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Ingresa una Ciudad'
          value={city}
          onChange={handleCityChange}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  )
}
