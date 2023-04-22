import React, { useState, useEffect } from "react";
import {
    faCloud,
    faBolt,
    faCloudRain,
    faSnowflake,
    faSun,
  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CurrentWeather() {
    const url = `https://api.weatherapi.com/v1/current.json?`
    const [weather, setWeather] = useState({
        "fahrenheit": null,
        "feelsLikeFahrenheit": null,
        "celsius": null,
        "feelsLikeCelsius": null,
        "condition": null, // TODO: clean up text or use int code and switch statement later
        "conditionCode": null,
        "uv": null
    });
    const [icon, setIcon] = useState([])

    useEffect(() => {
        fetchData(url)
        .then(data => {
            console.log(data)
            // console.log(data)
            // setWeather(data)
            // console.log(weather)
            return parseData(data.current)
        })
        .then(weatherInfo => {
            console.log(weatherInfo)
            setWeather(weatherInfo)
            return weatherInfo.condition
        })
        .then(condition => {
            setIcon(getIcon(condition))
        })
    }, [])

    async function fetchData(url) {
        let data = await fetch(url+`key=${process.env.REACT_APP_WEATHER}&q=${process.env.REACT_APP_CITY}&aqi=no`)
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

    function parseData(data) {
        let weatherInfo = {
            "fahrenheit": Math.round(data.temp_f),
            "feelsLikeFahrenheit": Math.round(data.feelslike_f),
            "celsius": Math.round(data.temp_c),
            "feelsLikeCelsius": Math.round(data.feelslike_c),
            "condition": data.condition.text, // TODO: clean up text or use int code and switch statement later
            "conditionCode": data.condition.code,
            "uv": data.uv
        };
        return weatherInfo
    }

    function currentWeatherToString() {
        let str = `${weather.fahrenheit}°F ${weather.condition} UV:${weather.uv}`;
        return str;
    }

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

    return <p className="CurrentWeather">{icon} {currentWeatherToString()}</p>
    }

    export default CurrentWeather;