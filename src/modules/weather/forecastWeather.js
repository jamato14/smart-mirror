import React, { useState, useEffect } from "react";
import {
    faCloud,
    faBolt,
    faCloudRain,
    faSnowflake,
    faSun,
  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './weather.css';

/**
 * 
 * @returns A list of the forecast from WeatherApi for the next REACT_APP_DAYS 
 */
function ForecastWeather() {
    const url = `https://api.weatherapi.com/v1/forecast.json?`
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const [weather, setWeatherState] = useState({
        "days": []
    });

    useEffect(() => {
        fetchData(url)
        .then(data => {
            return parseForecastDays(data.forecast)
        })
        .then(weatherInfo => {
            setWeatherState({days: weatherInfo})
        })
    }, [])

    /**
     * 
     * @param {String} url - The start of the url to query data from 
     * @returns Json Object of the fetched data
     */
    async function fetchData(url) {
        let data = await fetch(url+`key=${process.env.REACT_APP_WEATHER}&q=${process.env.REACT_APP_CITY}&days=3&aqi=no`)
        .then(response => {
            if (response.ok) { 
                return response.json() 
            }
            else {
                console.log("Fetched data incorrect")
                throw new Error("Failed to fetch Data")
            }
        })
        return data
    }

    /**
     * 
     * @param {Array} forecastArr - Json array of the weather for the next REACT_APP_DAYS
     * @returns A new array of jsons with specific data kept 
     */
    function parseForecastDays(forecastArr) {
        const mapped = forecastArr.forecastday.map((day) => parseDay(day))
        return mapped
    }

    /**
     * 
     * @param {Json} data - Json object of the forecast containing current weather, upcoming weather, 
     *                      and astrology related items
     * @returns Json Object of important weather data
     */
    function parseDay(data) {
        const date = new Date(data.date);
        let weatherInfo = {
            "date": daysOfWeek[ date.getDay() ],
            "maxFahrenheit": Math.round(data.day.maxtemp_f),
            "minFahrenheit": Math.round(data.day.mintemp_f),
            "maxCelsius": Math.round(data.day.maxtemp_c),
            "minCelsius": Math.round(data.day.mintemp_c),
            "condition": data.day.condition.text, // TODO: clean up text or use int code and switch statement later
            "conditionCode": data.day.condition.code,
            "chanceRain": data.day.daily_chance_of_rain,
            "chanceSnow": data.day.daily_chance_of_snow,
            "uv": data.day.uv,
            "sunrise": data.astro.sunrise,
            "moonPhase": data.astro.moon_phase,
            "icon": getIcon(data.day.condition.text)
        };
        return weatherInfo
    }

    function forecastDayToDiv(day) {
        let str = `${day.minFahrenheit}°F - ${day.maxFahrenheit}°F UV:${day.uv}`;
        let div = <li className="ForecastList">{day.icon} {day.date} {str}</li>
        return div;
    }

    function forecastToDiv(forecast) {
        let divList = [];
        forecast.forEach((day) => {
            divList.push(forecastDayToDiv(day))
        })
        return divList
    }

    /**
     * 
     * @param {String} condition - Type of weather for a given day
     * @returns Icon of corresponding weather conditions
     */
    function getIcon(condition) {
        let lower = condition.toLowerCase();
        
        if (lower.includes("sun") || lower.includes("clear")) {
            return <FontAwesomeIcon icon={faSun} />;
        }
        else if (lower.includes("cloudy") || lower.includes("overcast")){
            return <FontAwesomeIcon icon={faCloud} />;
        }
        else if (lower.includes("freeze") || lower.includes("snow")) {
            return <FontAwesomeIcon icon={faSnowflake} />;
        }
        else if (lower.includes("thunder")) {
            return <FontAwesomeIcon icon={faBolt} />;
        }
        else if (lower.includes("rain") || lower.includes("drizzle")) {
            return <FontAwesomeIcon icon={faCloudRain} />;
        }
        return undefined;
    }

    return (
            <div className="ForecastTable">
                <ul id = "ForecastUnordered;">
                    {forecastToDiv(weather.days)}
                </ul>
            </div>
        );
    }

    export default ForecastWeather;