const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
}, {collection: 'users_list'});

module.exports = mongoose.model('User', userSchema);