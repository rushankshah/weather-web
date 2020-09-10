const request = require('request')
const getWeather = async (cityName, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(cityName)+'&units=metric&appid=6ea01af7d3f02f2109fffbd79230e68b'
    request({url: url, json: true},(error, response)=>{
        if (error !== null){
            callback('Unable to connect to weather service!', undefined)
        }else if(response.statusCode==404){
            callback('Unable to find location', undefined)
        }else{
            const data = response.body
            callback(undefined, {
                forecast: data.weather[0].description+'. Currently it is '+(data.main.temp).toPrecision(4)+' degree celcius out there.'
            })
        }
    })
}

module.exports = getWeather