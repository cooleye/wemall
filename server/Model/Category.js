var mongoose = require('../lib/db');

var Schema = mongoose.Schema;

var Category = new Schema({
    code: String,
    id: String,
    name: String,
    logo: String,
    attrs: [{
        attrName: String,
        attrNameId: Number,
        attrVal: String,
        id: Number,
        categoryCode: String
    }]
})

module.exports = mongoose.model("Category", Category)