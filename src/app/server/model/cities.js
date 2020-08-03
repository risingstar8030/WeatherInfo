let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model("Cities", new Schema({

    letter: { type: String, required: true },
    names: { type: [String], required: true },

}, {
    collection: 'cities'
}))