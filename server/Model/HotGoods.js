var mongoose = require('../lib/db');

var Schema = mongoose.Schema;

var HotGoods = new Schema({
    marketPrice: Number,
    saleCount: Number,
    businessName: String,
    businessId: String,
    thumLogo: String,
    title: String,
    evaluateCount: Number,
    price: Number,
    name: String,
    stockNum: Number,
    wholePrice: Number,
    logo: String,
    id: String
})

module.exports = mongoose.model("HotGoods", HotGoods)