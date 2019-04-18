var cityModel = require('../models/city');

var express = require('express');
var router = express.Router();
var request = require('request');

// Initialisation de la variable qui va stocker toutes les villes
var cityList = []

// Route / qui redirige vers la page login
router.get('/', function(req, res, next) {
  res.redirect('/users/');
});


// Route Cities
router.get('/cities', function(req, res, next) {
  // Vérification si le user a une session active, sinon ça dégage
  if (user == undefined) {
    res.redirect('/');
  } else {
    cityModel.find(
      function (err, cities) {
        res.render('index', {
          cityList: cities,
          user
        });
      }
    )
  }
});

// Route Ajout de ville
router.post('/addCity', function(req, res, next) {

  // Appel à l'API de OpenWeatherMap et envoi du nom de la ville saisie dans le champ
  request(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.name}&lang=fr&units=metric&APPID=2bb941fd1e5a72c668364991246fc919`, function(error, response, body) {
    body = JSON.parse(body);
    // Vérification si la ville saisie existe dans l'API, sinon ça dégage
    if (body.cod == 404 || body.cod == 400) {
      cityModel.find(
        function (err, cities) {
          res.render('index', {
            cityList: cities,
            user
          });
        }
      )
    } else {
      // Création d'une nouvelle entrée ville
      var newCity = new cityModel ({
      name: req.body.name,
      desc: body.weather[0].description,
      img: body.weather[0].icon,
      temp_min: Math.floor(body.main.temp_min),
      temp_max: Math.floor(body.main.temp_max),
      });
      // Ajout de la nouvelle ville dans la BDD et redirection vers la liste des villes
      newCity.save(
        function (error, city) {
          cityModel.find(
            function (err, cities) {
              res.render('index', {
                cityList: cities,
                user
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
  // Suppression de la ville dont l'ID dans la BDD correspond à celle de la ville sélectionnée
  cityModel.deleteOne(
    {_id: req.query.id},
    function (error) {
      cityModel.find(
        function (err, cities) {
          res.render('index', {
            cityList: cities,
            user
          });
        }
      )
    });
  }
)


// Route suppression de Marseille
router.get('/deleteMarseille', function(req, res, next) {
  // Un message aux Marseillais
  cityModel.deleteMany(
    {name: req.query.name},
    function (error) {
      cityModel.find(
        function (err, cities) {
          res.render('index', {
            cityList: cities,
            user
          });
        }
      )
    });
  }
)


// Route update température
router.get('/updateCity', function(req, res, next) {
  // Mise à jour de la valeur des champs témpératures de l'item sélectionné
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
