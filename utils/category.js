const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    rating: {type: Number, required: true}
});

module.exports = mongoose.model('Category', schema);