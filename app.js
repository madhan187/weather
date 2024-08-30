const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const API_KEY = '773ddca8263d2532668d5079cdad58d0';
const BASE_URL = 'http://api.weatherstack.com/current';

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  
  if (!city) {
    return res.status(400).send('City query parameter is required');
  }
  
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        access_key: API_KEY,
        query: city
      }
    });

    const data = response.data;

    if (data.error) {
      return res.status(500).send(data.error.info);
    }

    res.send({
        location: data.location.name,
        temperature: data.current.temperature,
        weather_descriptions: data.current.weather_descriptions,
        humidity: data.current.humidity,
        wind_speed: data.current.wind_speed,
        observation_time: data.current.observation_time
    });
  } catch (error) {
    res.status(500).send('Failed to fetch weather data');
  }
});

app.listen(port, () => {
  console.log(`Weather service listening at http://localhost:${port}`);
});