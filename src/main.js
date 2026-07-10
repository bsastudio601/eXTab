

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

const BatteryLevel = document.getElementById('battery') ;
navigator.getBattery().then(function(battery){
  function updateBattery () {
    BatteryLevel.textContent = battery.level *100 + "%";
  }
  updateBattery();
  battery.addEventListener('levelchange',updateBattery);
});

const NetStatus = document.getElementById('net-status');

function updateNetworkStatus() {
  NetStatus.textContent = navigator.onLine ? 'Online' : 'Offline';
}

updateNetworkStatus();
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);





const term = $('#terminal').terminal({
  hello: function (what) {
    this.echo('Hello, ' + what + '. Wellcome to this terminal.');
  }
}, {
  greetings: 'My First Web Terminal'
});



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

}

const input = document.getElementById("taskInput");
const button = document.getElementById("addTask");
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

button.addEventListener("click", addTask);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

