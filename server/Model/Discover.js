var mongoose = require('../lib/db');

var Schema = mongoose.Schema;

var Discover = new Schema({
    code: String,
    id: String,
    logo: String,
    attrs: [{
        attrName: String,
        attrNameId: Number,
        attrVal: String,
        id: Number
    }]
})


module.exports = mongoose.model("Discover", Discover)