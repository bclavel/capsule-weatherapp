var express = require('express');
var router = express.Router();
var request = require('request');


var cityList = []
// var cityList = [{
//   name: 'Paris',
//   desc: 'Couvert',
//   img: '/images/picto-1.png',
//   temp_min: 9,
//   temp_max: 22,
//   },{
//   name: 'Lyon',
//   desc: 'Pluvieux',
//   img: '/images/picto-1.png',
//   temp_min: 8,
//   temp_max: 17,
//   },{
//   name: 'Bordeaux',
//   desc: 'Soleil',
//   img: '/images/picto-1.png',
//   temp_min: 12,
//   temp_max: 26,
//   }]

router.get('/', function(req, res, next) {
  res.render('index', {
    cityList
  });
});

router.post('/addCity', function(req, res, next) {

  request(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.name}&lang=fr&units=metric&APPID=2bb941fd1e5a72c668364991246fc919`, function(error, response, body) {
    body = JSON.parse(body);
    console.log(body);

    if (body.cod == 404 || body.cod == 400) {
      console.log(body.cod);
      res.render('index', {
        cityList
      });
    } else {
        var newCity = {
        name: req.body.name,
        desc: body.weather[0].description,
        img: body.weather[0].icon,
        temp_min: Math.floor(body.main.temp_min),
        temp_max: Math.floor(body.main.temp_max),
      }
      cityList.push(newCity)
      console.log(cityList);
      res.render('index', {
        cityList
      });
    };
  });
});

router.get('/deleteCity', function(req, res, next) {
  cityList.splice(req.query.position,1)
  res.render('index', {
    cityList
  });
});

module.exports = router;
