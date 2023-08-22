const http = require('http');
const url = require('url');
const { cities, fetchTemperature } = require('./test');
const cityNames = cities.map(city => city.name);
const isCityInCities = (cityName) => {
    const cityFound = cities.filter(city => city.name === cityName);
    if (cityFound) {
        return true;
    }
    return false;
}

const handleRequest = (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/weather') {
        const cityName = parsedUrl.query.city;
        
        if (!cityName) {
            res.statusCode = 400;
            res.setHeader('Content-type', 'application/json');
            res.end(`City parameter is required : "${cityNames}"`);
        } else if (!isCityInCities(cityName)) {
            res.statusCode = 400;
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify({ error: 'City not found' }));
        } else {
            fetchTemperature(cityName)
                .then((temperature) => {
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.end(`Today's temperature in ${cityName}: ${temperature} C`);
                    // res.end(JSON.stringify({ city: cityName, temperature: temperature }));
                })
                .catch(() => {
                    res.statusCode = 400;
                    res.setHeader('Content-type', 'application/json');
                    res.end(JSON.stringify({ error: 'Error fetching data, try again or come back later'}));
                })
        }
    } else {
        res.status = 404;
        res.end("Not found");
    }
}

const server = http.createServer(handleRequest);

server.listen(3000, () => {
    console.log('Server running on port 3000');
})