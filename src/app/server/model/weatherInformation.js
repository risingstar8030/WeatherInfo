let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model("WeatherInfo", new Schema({

    name: { type: String, required: true },
    weather: { type: [Object] },

}, {
    collection: 'weatherInformation'
}))