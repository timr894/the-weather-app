let lat, lon, weather_town, weather ; 
    if('geolocation' in navigator) {
        /* geolocation is available */
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition( async position => {
            try{
                lat = position.coords.latitude;
                lon = position.coords.longitude;

                const api_url = `/weather/${lat},${lon}`;
                //const api_url = `/weather`;
                const response = await fetch(api_url); 
                const json = await response.json();
                console.log(json);

                document.getElementById('weatherInfo').style.display = 'initial';

                if (json.weather.name === null){
                    document.getElementById('weatherInfoP').textContent = "Sorry we don't seem to have the weather information for your area."

                } else {
                    document.getElementById('cityName').textContent = json.weather.name; 
                    document.getElementById('temp').textContent = json.weather.main.temp;
                    document.getElementById('tempMax').textContent = json.weather.main.temp_max;
                    document.getElementById('conditions').textContent = json.weather.weather[0].description; 
                    weather_town = json.weather.name;
                    weather = json.weather.main;
                }

                // Air quality Dom elements that I'm not using right now.
                // document.getElementById('air_quality').textContent = json.air_quality.results[0].measurements[0].value;
                // document.getElementById('aq_date').textContent = json.air_quality.results[0].measurements[0].lastUpdated;
                // document.getElementById('aq_unit').textContent = json.air_quality.results[0].measurements[0].unit;

                // Set latidtude and longitude fields in on index page equal to geolocate fields
                // document.getElementById('latitude').textContent = lat;
                // document.getElementById('longitude').textContent = lon;

                
                const data = { lat, lon, weather_town, weather };
                const options = {
                    method: 'POST',
                    headers: {
                    "Content-type": "application/json"
                    }, 
                    body: JSON.stringify(data)
                };

                const db_response = await fetch('/api', options);
                const db_json = await db_response.json();
                console.log(db_json);

            } catch(error) {
                console.error(error); 

            }    
        });
    } else {
        /* geolocation IS NOT available */
        console.log('geolocation is not available');
        }


// Event listener for button on homepage no longer in use.         
// const butt = document.getElementById("checkLocation");
// butt.addEventListener("click", async event => {
        
//          display weather info field when button is clicked.
//         document.getElementById('weatherInfo').style.display = 'initial'; 
               
// });