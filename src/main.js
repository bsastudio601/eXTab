
//The clock code//
let hrs = document.getElementById('hrs');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let daten = document.getElementById('daten');
let month = document.getElementById("month");
let year = document.getElementById("year");

setInterval(()=>{
  let currenttime = new Date();

  hrs.innerHTML = currenttime.getHours();
  min.innerHTML = currenttime.getMinutes();
  sec.innerHTML = currenttime.getSeconds();
  daten.innerHTML = currenttime.getDate();
  month.innerHTML = currenttime.toLocaleString('default', { month: 'long' });
  year.innerHTML = currenttime.getFullYear();

},1000)

//battery status code//

const BatteryLevel = document.getElementById('battery') ;
navigator.getBattery().then(function(battery){
  function updateBattery () {
    BatteryLevel.textContent = battery.level *100 + "%";
  }
  updateBattery();
  battery.addEventListener('levelchange',updateBattery);
});

// Online offline code//

const NetStatus = document.getElementById('net-status');

function updateNetworkStatus() {
  NetStatus.textContent = navigator.onLine ? 'Online' : 'Offline';
}

updateNetworkStatus();
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);


//weather code//

navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
  },
  () => {
    getWeather(22.6602, 89.7895); // fallback if location denied
  }
  
);

async function getWeather(lat, lon) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m`+
    `&hourly=precipitation_probability`
  );
  const data = await res.json();

  const temperature = data.current.temperature_2m;
  const humidity = data.current.relative_humidity_2m;

  const nowIndex = data.hourly.time.indexOf(data.current.time);
  const rainChance = data.hourly.precipitation_probability[nowIndex];

  console.log( temperature, humidity);

  document.getElementById('weathertemp').textContent = temperature + '°C';
  document.getElementById('weatherhumid').textContent = humidity + '%';
  document.getElementById('weatherrain').textContent =  rainChance + '%';
  document.getElementById('weatherlat').textContent = lat;
  document.getElementById('weatherlong').textContent = lon;

}

//todo code//

const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

function addTask() {
    if (input.value.trim() === "") return;

    const task = document.createElement("label");
    task.innerHTML = `
        <input type="checkbox">
        <span>${input.value}</span>
    `;

    list.appendChild(task);
    input.value = "";
}

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

async function getAsteroid() {
    try {
        const response = await fetch(
            `https://api.nasa.gov/neo/rest/v1/feed?api_key=${API_KEY}`
        );

        const data = await response.json();

        const today = new Date().toISOString().split("T")[0];

        const asteroids = data.near_earth_objects[today];

        let closest = asteroids[0];

        for (const asteroid of asteroids) {

            const distance = Number(
                asteroid.close_approach_data[0]
                .miss_distance.kilometers
            );

            const closestDistance = Number(
                closest.close_approach_data[0]
                .miss_distance.kilometers
            );

            if (distance < closestDistance) {
                closest = asteroid;
            }
        }

        console.log(closest);

        displayAsteroid(closest);

    } catch(error) {
        console.log(error);
    }
}


function displayAsteroid(asteroid) {

    document.getElementById("astroidname").textContent = asteroid.name;

    document.getElementById("astroiddistance").textContent = Math.round(asteroid.close_approach_data[0].miss_distance.kilometers).toLocaleString() + " km";

    document.getElementById("astroidspeed").textContent = Math.round(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString() + " km/h";


    document.getElementById("astroidsize").textContent = Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max) + " m";


    document.getElementById("astroidhazard").textContent = asteroid.is_potentially_hazardous_asteroid? "Risk⚠️": "None";
}


getAsteroid();
 
