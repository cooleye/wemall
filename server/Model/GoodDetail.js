var mongoose = require('../lib/db');

var Schema = mongoose.Schema;

var GoodDetail = new Schema({
    code: String,
    id: String,
    logo: String,
    attrList: Array,
    brandName: String,
    businessId: String,
    detailInfo: String,
    evaluateCount: Number,
    freeShipNum: Number,
    freight: Number,
    goodsSkuId: String,
    goodsSkuList: Schema.Types.Mixed,
    goodsSkuNameList: Schema.Types.Mixed,
    goodsSkuValIds: [Number],
    goodsSkuVals: [String],
    id: String,
    logo: String,
    marketPrice: Number,
    minBuyNum: Number,
    name: String,
    photoList: [{
        goodsId: String,
        id: String,
        photo: String,
        thumPhoto: String
    }],
    price: Number
})


module.exports = mongoose.model("Good_Detail", GoodDetail)