var mongoose = require('../lib/db');

var Schema = mongoose.Schema;

var Cate = new Schema({
    code: String,
    name: String,
    logo: String,
    id: String,
    secondCategory: [{
        code: String,
        name: String,
        thumLogo: String,
    }]
})

module.exports = mongoose.model("Cate", Cate)