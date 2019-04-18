var mongoose = require('mongoose');

// Création du schéma de données user
var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// Export pour utilisation dans les routes (collection + schéma)
module.exports = mongoose.model('users', userSchema);
