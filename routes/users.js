var userModel = require('../models/user');
var cityModel = require('../models/city');

var express = require('express');
var router = express.Router();

// Route Login
router.get('/', function(req, res, next) {
  res.render('login', {
    titre: 'Découvrez l\'appli WeatherApp du Paris Saint-Germain !'
  });
});

// Route de création de compte
router.post('/sign-up', function(req, res, next) {
  // Vérification si l'email saisi existe en BDD
  userModel.findOne({email: req.body.signUpEmailFromFront}, function (err, users) {
      var emailInDB = false;
      if (users != null) {
        emailInDB = true
      }
      // Si l'email saisi n'existe pas en BDD, on créé une session avec les données saises
      if (emailInDB == false) {
        req.session.user = users;
        // On créé un nouveau user
        var newUser = new userModel ({
          username: req.body.signUpUsernameFromFront,
          email: req.body.signUpEmailFromFront,
          password: req.body.signUpPasswordFromFront
        })
        // On sauvegarde le nouveau user dans la BDD
        newUser.save(
          function (error, user) {}
        )
        // On redirige vers cities
        res.redirect('/cities');
      // Si l'email saisi existe déjà en BDD, ça dégage
      } else {
        res.redirect('/');
      }
    }
  )
});

// Route de connexion
router.post('/sign-in', function(req, res, next) {
  // Vérification si le couple email + password existe en BDD
  userModel.findOne(
    {email: req.body.signInEmailFromFront, password: req.body.signInPasswordFromFront}, function(err, users) {
      var existingUser = false;
      if (users != null) {
        existingUser = true
      }

      // Si le couple email + mdp n'existe pas, ça dégage
      if (existingUser == false) {
        res.redirect('/');

      // Si le couple email + mdp existe, on créé une session avec les données saises + le username de l'entrée de la BDD trouvée avec le findOne
      } else {
        req.session.user = users;
        console.log(req.session.user);
        // On redirige vers cities
        res.redirect('/cities');
      }
    }
  )
});

// Route de logout qui vide le contenu de la session et dégage vers l'accueil
router.get('/logout', function(req, res, next) {
  user = null;
  res.redirect('/');
});

module.exports = router;
