//fetch all the data from database and log it to this page
// const myIcon = L.icon({
//     iconUrl: 'https://img.icons8.com/color/48/000000/info--v1.png',
// });

const mymap = L.map('mapid').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();
      async function getData() {
          const response = await fetch('/api');
          const data = await response.json();

          for (item of data) {
            const marker = L.marker([item.lat, item.lon]).addTo(mymap);
            
            const txt = `The weather in ${item.weather_town} has a current temprature of ${item.weather.temp}&deg; Fahrenheit, and feels like ${item.weather.feels_like}&deg; Fahrenheit. The high will be/ was ${item.weather.temp_max}&deg; Fahrenheit.`;
           
            console.log(item);
            marker.bindPopup(txt);
           
            //   const root = document.createElement('p');
                //   const mood = document.createElement('div');
                //   const geo = document.createElement('div');
                //   const date = document.createElement('div');
                
                //   mood.textContent = `mood: ${item.inputText}`;  
                //   geo.textContent = `${item.lat}, ${item.lon}`;
                //   const dateString = new Date(item.timestamp).toLocaleString();
                //   date.textContent = `Time: ${dateString}`;  

                //   root.append(mood, geo, date); 
                //   document.body.append(root);
      }
          console.log(data);
      }