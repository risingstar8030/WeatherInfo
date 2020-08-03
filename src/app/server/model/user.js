let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model("User", new Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ },
    password: { type: String, required: true },
    history: { type: [String] }
}, {
    collection: 'users'
}))