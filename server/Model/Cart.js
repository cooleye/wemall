var mongoose = require('../lib/db');

var Schema = mongoose.Schema;

var Cart = new Schema({
    goodsId: { type: String },
    goodsName: { type: String },
    goodsSkuValName: { type: String },
    ischecked: { type: Boolean },
    num: { type: Number },
    price: { type: Number },
    priceSubtotal: { type: Number },
    thumLogo: { type: String },
    type: { type: Number },
})

module.exports = mongoose.model("Cart", Cart)