import React, {useState} from 'react';
import {useQuery} from "react-query";
import ExtraInformation from "./ExtraInformation";

const API_KEY = '5172e97124ff57be1b4c06bba102541a'
const BASE_URL = 'https://api.openweathermap.org/'

function Weather(props) {
    const [city, setCity] = useState('')

    // async - await
    async function fetchWeather() {
        const coords = await fetch(`${BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
        const json = await coords.json()
        const res =
            await fetch(`${BASE_URL}data/2.5/weather?lat=${json[0].lat}&lon=${json[0].lon}&appid=${API_KEY}&units=metric`)
        return res.json()
    }

    // promises
    // function fetchWeather() {
    //     return fetch(`${BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
    //          .then(response => response.json())
    //          .then(json => {
    //              return (
    //                  fetch(`${BASE_URL}data/2.5/weather?lat=${json[0].lat}&lon=${json[0].lon}&appid=${API_KEY}`)
    //                      .then(response => response.json())
    //              )
    //          })
    //  }

    const {data, status, refetch} = useQuery(['weather', city], fetchWeather, {
        enabled: false,
        retry: false,
    })

    const formatTime = (seconds) => {
        const date = (new Date(seconds * 1000)).toTimeString()
        return [date.slice(0, 5), date.slice(9,15) + ':' + date.slice(15, 17)]
    }
    const firstLetterToUpperCase = (str) => {
        return str[0].toUpperCase() + str.slice(1, str.length)
    }

    return (
        <div className='custom-container'>
            <div className='input'>
                <input value={city} onChange={(e) => setCity(e.target.value)}
                       onKeyUp={(e) => {
                           if (e.key === 'Enter') refetch()
                       }}
                       placeholder='Search for a city 🌍'
                />
                <button className='input-button'
                        onClick={() => refetch()}> 🚀
                </button>
            </div>
            {(status === 'loading') &&
                <div className='empty loading'>
                    <p> Loading ⏳ </p>
                </div>
            }
            {(status === 'error') &&
                <div className='empty error'>
                    <p> Can't find the city 😢 </p>
                </div>
            }
            {data &&
                <>
                    {/*GENERAL*/}
                    <div className='general-information'>
                        <div className='gi-left'>
                            <h2 className='city'>{city.toUpperCase()}</h2>
                            <p className='description'>{firstLetterToUpperCase(data.weather[0].description)}</p>
                            <div className='temp-container'>
                                <p className='temp'>{Math.round(data.main.temp)}°</p>
                            </div>
                        </div>
                        <div className='gi-right'>
                            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                                 alt="weather icon"/>
                        </div>
                    </div>
                    {/*EXTRA*/}
                    <div className='extra-information'>
                        <ExtraInformation emoji='🌡️' prefix='Feels like' postfix=''>
                            {Math.round(data.main.feels_like)}°
                        </ExtraInformation>
                        <ExtraInformation emoji='📏' prefix='Pressure' postfix='mmHg'>
                            {Math.round(data.main.pressure / 1000 * 750.062)}
                        </ExtraInformation>
                        <ExtraInformation emoji='💧' prefix='Humidity' postfix='%'>
                            {data.main.humidity}
                        </ExtraInformation>
                        <ExtraInformation emoji='🌪️' prefix='Wind' postfix='m/s'>
                            {Math.round(data.wind.speed * 2) / 2}
                        </ExtraInformation>
                        <ExtraInformation emoji='🌄' prefix='Sunrise' postfix={formatTime(data.sys.sunrise)[1]}>
                            {formatTime(data.sys.sunrise)[0]}
                        </ExtraInformation>
                        <ExtraInformation emoji='🌅' prefix='Sunset' postfix={formatTime(data.sys.sunset)[1]}>
                            {formatTime(data.sys.sunset)[0]}
                        </ExtraInformation>
                    </div>
                </>
            }
            {!data && status !== 'error' && status !== 'loading'
                && <div className='empty dove'>🕊️</div>}
        </div>
    );
}

export default Weather;