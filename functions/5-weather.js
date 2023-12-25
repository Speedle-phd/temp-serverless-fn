require('dotenv').config()
const axios = require('axios')
exports.handler = async(e,c) => {
   const {httpMethod: method} = e
   const {city} = JSON.parse(e.body)
   if(method !== "POST" || !city) return {statusCode: 400, body: "Bad request"}
   const apiKey = process.env.WEATHER_APIKEY
   const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
   const {data} = await axios(url)

   

   return {
      statusCode: 200,
      body: JSON.stringify(data)
   }
}