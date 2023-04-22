import React from 'react';


class WeatherApi extends React.Component{
    constructor() {
        super();
        this.key = process.env.REACT_APP_WEATHER;
        this.city = process.env.REACT_APP_CITY;
        this.aqi = process.env.REACT_APP_AQI;
        this.days = process.env.REACT_APP_DAYS;
        this.state = {
            current: [],
            forecast: []
        };
    }


    getCurrentWeather() {
        return this.state.current;
    }

    // setCurrentWeather = weather => {
    //     console.log(weather)
    //     this.setState({current: weather, forecast: []});
    // }

    setCurrentWeather(weather) {
        this.state.current = weather
    }
    
    getForecast() {
        return this.state.forecast;
    }

    setForecast(forecast) {
        this.state.forecast = forecast;
    }

    getUrl() {
        return `https://api.weatherapi.com/v1/`;
    }

    getCity() {
        return this.city;
    }

    getCurrentWeatherUrl() {
        return this.getUrl() + `current.json?key=${this.key}&q=${this.city}&aqi=${this.aqi}`;
    }

    getForecastWeatherUrl() {
        return this.getUrl() + `forecast.json?key=${this.key}&q=${this.city}&days=${this.days}&aqi=${this.aqi}`;
    }

    currentWeatherToString() {
        let str = `${this.state.current.fahrenheit}°F ${this.state.current.condition} UV:${this.state.current.uv}`;
        return str;
    }

    /**
     * @param {JSON} data - A json object from which to pull key data 
     * @returns A json object of data to display
     */
    parseCurrentWeather(data) {
        if (!data || data.length < 0) return undefined;

        let selectedData = {
            "fahrenheit": data.temp_f,
            "feelsLikeFahrenheit": data.feelslike_f,
            "celsius": data.temp_c,
            "feelsLikeCelsius": data.feelslike_c,
            "condition": data.condition.text, // TODO: clean up text or use int code and switch statement later
            "conditionCode": data.condition.code,
            "uv": data.uv
        }
        return selectedData;
    }

    /**
     * @param {JSON} data - A json object from which to pull key data 
     * @returns A json object of data to display
     */
    parseForecastDay(data) {
        if (!data || data.length < 0) return undefined;

        let selectedData = {
            "date": data.date,
            "maxFahrenheit": data.day.maxtemp_f,
            "minFahrenheit": data.day.mintemp_f,
            "maxCelsius": data.day.maxtemp_c,
            "minCelsius": data.day.mintemp_c,
            "condition": data.day.condition.text, // TODO: clean up text or use int code and switch statement later
            "conditionCode": data.day.condition.code,
            "rainChance": data.day.daily_will_it_rain,
            "rainPercentage": data.day.daily_chance_of_rain,
            "snowChance": data.day.daily_will_it_snow,
            "snowPercentage": data.day.daily_chance_of_snow,
            "sunrise": data.astro.sunrise,
            "sunset": data.astro.sunset,
            "moonPhase": data.astro.moon_phase
        }
        return selectedData;
    }

    /**
     * @param {JSON} data - A json object from which to pull key data 
     * @returns A json object of data to display
     */
    parseForecastAstro(data) {
        if (!data || data.length < 0) return undefined;

        let astro = data.astro;
        let selectedData = {
            "sunrise": astro.sunrise,
            "sunset": astro.sunset,
            "moonPhase": astro.moon_phase
        }
        return selectedData;
    }

    /**
     * @param {String} url - Where to fetch data from
     * @returns An object containing the data that was queried from the api
     */
    async makeRequest (url) {
        const response = await fetch(url);
        const weatherData = await response.text();
        if (!weatherData || weatherData.length < 0) return undefined;

        if (this.type === "xml") {
            return new DOMParser().parseFromString(weatherData, "text/html");
        }
        const data = JSON.parse(weatherData);
        return data;
    }

    /**
     * Pulls data from desired location and parses/stores the data that was recieved
     * @param {String} url - Where to query data from
     */
    async queryForecastWeather(url) {
        let data = await this.makeRequest(url);             //try using then keyword and see if that works
        let newForecast = [];

        const current = this.parseCurrentWeather(data.current);
        this.setCurrentWeather(current);
        
        for (let i=0; i<data.forecast.forecastday.length; i++) {
            const day = this.parseForecastDay(data.forecast.forecastday[i]);
            if (day !== undefined) newForecast.push(day);
        }
        this.setForecast(newForecast);
    }

    /**
     * Queries Weather API endpoint and updates the local current weather information
     * @param {String} url - Url to fetch data from 
     */
    queryCurrentWeather(url) {
        // let data = this.makeRequest(url);
        // const current = this.parseCurrentWeather(data.current);
        // this.setCurrentWeather(current);
        this.makeRequest(url).then((data) => {
            const current = this.parseCurrentWeather(data.current)
            this.setCurrentWeather(current)
        });

        return this.currentWeatherToString();
    }

    render() {
        return (
            
                <p>{this.currentWeatherToString()}</p>
        );
    }
}
export default WeatherApi