const fs = require('fs');
var cities = [];
fs.readFile('input.txt', 'utf8', (err, data) => {
  var lines = data.trim().split('\n');
  for (i = 0; i < 10; i++) {
    cities.push(JSON.parse(lines[i]))
  }
  console.log(cities)
  function randomCity() {
    randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  };
  async function fetchTemprature() {
    try {
      const city = randomCity();
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`
      );
      const data = await response.json();
      const message=`Today's temperature in ${city.name}: ${data.current_weather.temperature} C`;
      const dir =fs.readdirSync(__dirname);
      console.log(message);
      for (j = 0; j < dir.length; j++) {
        if(dir[j]===`${city.name}.txt`){
          fs.unlinkSync(`${city.name}.txt`);
        }
      }
      fs.writeFileSync(`${city.name}.txt`, message);
    } catch (err) {
      console.log(err);
    }
  };
  fetchTemprature();
});
