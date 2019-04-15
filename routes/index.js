var express = require('express');
var router = express.Router();

var cityList = [{
  name: 'Paris',
  desc: 'Couvert',
  img: '/images/picto-1.png',
  temp_min: 9,
  temp_max: 22,
  },{
  name: 'Lyon',
  desc: 'Pluvieux',
  img: '/images/picto-1.png',
  temp_min: 8,
  temp_max: 17,
  },{
  name: 'Bordeaux',
  desc: 'Soleil',
  img: '/images/picto-1.png',
  temp_min: 12,
  temp_max: 26,
  }]

router.get('/', function(req, res, next) {
  res.render('index', {
    cityList
  });
});

router.post('/addCity', function(req, res, next) {

  var newCity = {
    name: req.body.name,
    desc: 'Horrible',
    img: '/images/picto-1.png',
    temp_min: 0,
    temp_max: 30,
  }
  cityList.push(newCity)
  console.log(cityList);
  res.render('index', {
    cityList
  });
});

router.get('/deleteCity', function(req, res, next) {
  cityList.splice(req.query.position,1)
  res.render('index', {
    cityList
  });
});

module.exports = router;
