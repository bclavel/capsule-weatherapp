var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
}
mongoose.connect('mongodb+srv://benoit:benoit@newt-0267k.mongodb.net/cityDB?retryWrites=true',
    options,
    function(err) {
     console.log(err);
    }
);

var citySchema = mongoose.Schema({
  name: String,
  desc: String,
  img: String,
  temp_min: Number,
  temp_max: Number,
});


var cityModel = mongoose.model('cities', citySchema);

var cityList = []


// Route Home
router.get('/', function(req, res, next) {
  cityModel.find(
    function (err, cities) {
      res.render('index', {
        cityList: cities
      });
    }
  )
});

// Route Ajout de ville
router.post('/addCity', function(req, res, next) {

  request(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.name}&lang=fr&units=metric&APPID=2bb941fd1e5a72c668364991246fc919`, function(error, response, body) {
    body = JSON.parse(body);

    if (body.cod == 404 || body.cod == 400) {
      cityModel.find(
        function (err, cities) {
          res.render('index', {
            cityList: cities
          });
        }
      )
    } else {
      var newCity = new cityModel ({
      name: req.body.name,
      desc: body.weather[0].description,
      img: body.weather[0].icon,
      temp_min: Math.floor(body.main.temp_min),
      temp_max: Math.floor(body.main.temp_max),
      });

      newCity.save(
        function (error, city) {
          cityModel.find(
            function (err, cities) {
              res.render('index', {
                cityList: cities
              });
            }
          )
        }
      )
    };
  });
});


// Route suppression de ville
router.get('/deleteCity', function(req, res, next) {
  cityModel.deleteOne(
    {_id: req.query.id},
    function (error) {
      cityModel.find(
        function (err, cities) {
          res.render('index', {
            cityList: cities
          });
        }
      )
    });
  }
)


// Route suppression de Marseille
router.get('/deleteMarseille', function(req, res, next) {
  cityModel.deleteMany(
    {name: req.query.name},
    function (error) {
      cityModel.find(
        function (err, cities) {
          res.render('index', {
            cityList: cities
          });
        }
      )
    });
  }
)


// Route update température
router.get('/updateCity', function(req, res, next) {
  cityModel.updateOne(
    {_id: req.query.id},
    {temp_min: 100, temp_max: 100},
    function (error, raw) {
      cityModel.find(
        function (err, cities) {
          res.render('index', {
            cityList: cities
          });
        }
      )
    });
  }
)


module.exports = router;
