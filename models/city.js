var mongoose = require('mongoose');

// Création du schéma de données city
var citySchema = mongoose.Schema({
  name: String,
  desc: String,
  img: String,
  temp_min: Number,
  temp_max: Number,
  lat: Number,
  lon: Number,
});

// Export pour utilisation dans les routes (collection + schéma)
module.exports = mongoose.model('cities', citySchema);
