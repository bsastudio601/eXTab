
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
    battery.addEventListener('levelchange',updateBattery);
  }
  updateBattery ()
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
    getWeather(0,0);
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

//astroid code//

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

async function getAsteroid() {
    
      const response = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?api_key=${API_KEY}`
      );

      const data = await response.json();

      const today = new Date().toISOString().split("T")[0];
      const asteroid = data.near_earth_objects[today][0];

          document.getElementById("astroidname").textContent = asteroid.name;

          document.getElementById("astroiddistance").textContent = Math.round(asteroid.close_approach_data[0].miss_distance.kilometers).toLocaleString() + " km";

          document.getElementById("astroidspeed").textContent = Math.round(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString() + " km/h";


          document.getElementById("astroidsize").textContent = Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max) + " m";


          document.getElementById("astroidhazard").textContent = asteroid.is_potentially_hazardous_asteroid? "Risk⚠️": "None";
}

getAsteroid();
 
//command line//

const term = $('#theterminal').terminal({
    hello: function(what) {
        this.echo('Hello, ' + what +
                  '. Wellcome to this terminal.');
    },
    help: function(){
        this.echo("available commands")
        this.echo("hello <name> -----shows your name")
        this.echo("clear -----clears the terminal")
        this.echo("about -----tells about eXTab")
        this.echo("gl -----opens google")
        this.echo("yt -----opens youtube")
        this.echo("gh -----opens github")
        this.echo("cg -----opens chatGPT")
        this.echo("-gl <search Item> -----search results in google")
        this.echo("-yt <search Item> -----search results in youtube")
        this.echo("pcst -----shows pc status")
        this.echo("wrst -----shows weather data")

    },
    about: function(){
        this.echo("eXTab is inspired by eDex-UI")
        this.echo("eXTab is a new tab page made by @arthihalder")
        this.echo("https://bsastudio601.github.io/portfolio/")
        
    },
    clear: function (){
        this.clear()
    },
    gl: function () {
        window.open("https://www.google.com", "_blank");
    },
    yt: function () {
        window.open("https://www.youtube.com", "_blank");
    
    },
    gh: function () {
        window.open("https://www.github.com", "_blank");
    
    },
    cg: function () {
        window.open("https://chatgpt.com", "_blank");
    
    },
    "-yt": function(...query) {
        const search = encodeURIComponent(query.join(" "));
        window.open(`https://www.youtube.com/results?search_query=${search}`, "_blank");
    },
    "-gh": function(...query) {
        const search = encodeURIComponent(query.join(" "));
        window.open(`https://www.github.com/results?search_query=${search}`, "_blank");
    },
    pcst: function() {
      this.echo(document.getElementById("battery").textContent);
      this.echo(document.getElementById('net-status').textContent);
    },
    wrst: function() {
      this.echo(document.getElementById('weathertemp').textContent);
      this.echo(document.getElementById('weatherhumid').textContent);
      this.echo(document.getElementById('weatherrain').textContent);
      this.echo(document.getElementById('weatherlat').textContent);
      this.echo(document.getElementById('weatherlong').textContent);
    }


}, {
    greetings: greetings.innerHTML + 'Type help to get started!' ,
    checkArity: false
});


//key board code//

$(function () {
  var $write = $('#theterminal'),
      shift = false,
      capslock = false;

$(function(){
	var $write = $('#theterminal'),
		shift = false,
		capslock = false;
	
	$('#keyboard li').click(function(){
		var $this = $(this),
			character = $this.html(); // If it's a lowercase letter, nothing happens to this variable
		
		// Shift keys
		if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
			$('.letter').toggleClass('uppercase');
			$('.symbol span').toggle();
			
			shift = (shift === true) ? false : true;
			capslock = false;
			return false;
		}
		
		// Caps lock
		if ($this.hasClass('capslock')) {
			$('.letter').toggleClass('uppercase');
			capslock = true;
			return false;
		}
		
		// Delete
		if ($this.hasClass('delete')) {
			var html = $write.html();
			
			$write.html(html.substr(0, html.length - 1));
			return false;
		}
		
		// Special characters
		if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
		if ($this.hasClass('space')) character = ' ';
		if ($this.hasClass('tab')) character = "\t";
		if ($this.hasClass('return')) character = "\n";
		
		// Uppercase letter
		if ($this.hasClass('uppercase')) character = character.toUpperCase();
		
		// Remove shift once a key is clicked.
		if (shift === true) {
			$('.symbol span').toggle();
			if (capslock === false) $('.letter').toggleClass('uppercase');
			
			shift = false;
		}
		
		// Add the character
		$write.html($write.html() + character);
	});
});

  var keyMap = {};
  $('#keyboard li').each(function () {
    var $li = $(this);
    var key;

    if ($li.hasClass('space')) key = ' ';
    else if ($li.hasClass('tab')) key = 'tab';
    else if ($li.hasClass('return')) key = 'enter';
    else if ($li.hasClass('delete')) key = 'backspace';
    else if ($li.hasClass('left-shift') || $li.hasClass('right-shift')) key = 'shift';
    else if ($li.hasClass('capslock')) key = 'capslock';
    else key = $li.text().trim().toLowerCase(); // plain letter/number keys

    if (!keyMap[key]) keyMap[key] = [];
    keyMap[key].push($li);
  });

  $(document).on('keydown', function (e) {
    var key = e.key.toLowerCase();
    if (keyMap[key]) {
      keyMap[key].forEach(function ($li) { $li.addClass('active'); });
    }
  });

  $(document).on('keyup', function (e) {
    var key = e.key.toLowerCase();
    if (keyMap[key]) {
      keyMap[key].forEach(function ($li) { $li.removeClass('active'); });
    }
  });
});



