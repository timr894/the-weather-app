// JavaScript file 
// requires express
const { response } = require('express');
const express = require('express'); 
const app = express();

const fetch = require('node-fetch')

const Datastore = require('nedb');

require('dotenv').config();


//tells node to run on port 3000 and when it gets a 200 to log that is listening 
app.listen(3000, () => console.log('listening at port 3000')); 
// tells express to run the files in the public folder
// new static direction rather than public file I updated to just use the directory
app.use(express.static(__dirname)); 
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            console.log(err);
            return;
        }
        response.json(data);
    })  
});


app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data); 
    response.json(data);
});

app.get('/weather/:latlon', async (request, response) => {
    console.log(request.params);
    const latlon = request.params.latlon.split(',');
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);
    const api_key = process.env.API_KEY; 
    const weather_url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();
    
    // const aq_url = `https://docs.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&coordinates=${lat}%2C${lon}&radius=1000&order_by=lastUpdated&dumpRaw=false`;
    // const aq_response = await fetch(aq_url);
    // const aq_data = await aq_response.json();

    const data = {
        weather: weather_data,
        // air_quality: aq_data
    };

    response.json(data); 
    }); 
