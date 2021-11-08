const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

// Start up an instance of app
const app = express();

const GEONAMES_KEY = 'rawanalosaimi';
const WEATHERBIT_KEY = '10b2279a616541fcb3651d7497f7dd6c';
const PIXABAY_KEY = '24222689-b28f37477898fa40deb466866';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
    //res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})

// POST Route
app.post('/API', async function (req, res) {
    location = req.body.location;
    //console.log(location);

    const response_geonames = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=10&username=${GEONAMES_KEY}`);
    const newData_geonames = await response_geonames.json();
    //console.log(newData_geonames);

    const Geonames_data = {
        lat: newData_geonames.geonames[0].lat,
        lng: newData_geonames.geonames[0].lng,
        name: newData_geonames.geonames[0].name,
        countryName: newData_geonames.geonames[0].countryName
    }
    //console.log(Geonames_data);

    const response_weatherbit = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${Geonames_data.lat}&lon=${Geonames_data.lng}&key=${WEATHERBIT_KEY}`);
    const newData_weatherbit = await response_weatherbit.json();
    //console.log(newData_weatherbit);

    const Weatherbit_data = {
        high_temp: newData_weatherbit.data[0].high_temp,
        low_temp: newData_weatherbit.data[0].low_temp,
        description: newData_weatherbit.data[0].weather.description,
    }
    //console.log(Weatherbit_data);

    const response_pixabay = await fetch(`https://pixabay.com/api/?key=${PIXABAY_KEY}&category=place&q=${location}&image_type=photo`);
    const newData_pixabay = await response_pixabay.json();
    //console.log(newData_pixabay);

    const Pixabay_data = {
        img: newData_pixabay.hits[0].webformatURL
    }
    //console.log(Pixabay_data);

    const API_data ={Geonames_data, Weatherbit_data, Pixabay_data}
    console.log(API_data);

    res.send(API_data);
});
