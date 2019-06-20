var mongoose = require('../lib/db');

var Schema = mongoose.Schema;

var Advert = new Schema({
    advertUrl: { type: String },
    id: { type: String },
    picUrl: { type: String },
    title: { type: String },
    type: { type: Number }
})

module.exports = mongoose.model("Advert", Advert)