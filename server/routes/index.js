var express = require('express');
var router = express.Router();
var md5 = require('md5');
var request = require('request');

const APPID = "wxdfae9e6726fc843e"
const SECRET = "bc903a970f4f4fef99d0b2061f2fc444"

const API_SECRET_KEY = 'github.com/cooleye'

var Advert = require('../Model/Advert');
var Discover = require('../Model/Discover');
var Cart = require('../Model/Cart');
var HotGoods = require('../Model/HotGoods');
var Category = require('../Model/Category');
var Cate = require('../Model/Cate');
var GoodDetail = require('../Model/GoodDetail');


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

//获取openid
router.get('/api/wechat/jscode2session', function(req, res) {
    var jsCode = req.query.jsCode;

    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + jsCode + '&grant_type=authorization_code';

    request({
        url: url,
        method: "GET",
        json: true,
        headers: {
            "content-type": "application/json",
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send({ expires_in: body.expires_in, openid: body.openid });
        }
    });
})

//查询广告列表
router.get('/api/adverts/list', async function(req, res) {
    let sign = req.query.sign;
    let TIMESTAMP = req.query.time;
    const SIGN = md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())
    if (sign == SIGN) {
        try {
            var ad = await Advert.find();
            res.send({ "reason": "adver list", "code": "0", "list": ad })
        } catch (error) {
            res.send({ "msg": "invoke error...", "code": -200, "Success": true })
        }
    } else {
        res.send({ "msg": "invoke error...", "code": -200, "Success": true })
    }
})

//首页发现商品接口
router.get('/api/mall/discoverList', async function(req, res) {
    let sign = req.query.sign;
    let TIMESTAMP = req.query.time;
    const SIGN = md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())
    if (sign == SIGN) {
        try {
            var dis = await Discover.find();
            res.send({ "reason": "hello Discover", "code": "0", "list": dis })
        } catch (error) {
            res.send({ "msg": "invoke error...", "code": -200, "Success": true })
        }
    } else {
        res.send({ "msg": "invoke error...", "code": -200, "Success": true })
    }
})

//商品分类--begin
//一级分类
router.get('/api/mall/rootCtegoryList', async function(req, res) {
    try {
        var cate = await Cate.find();
        res.send({ "reason": "", "code": "0", "list": cate })
    } catch (error) {
        res.send({ "msg": "invoke error...", "code": -200, "Success": true })
    }
})


//首页发现商品接口
router.get('/api/home/hostGoodsList', async function(req, res) {
    try {
        var hotGoods = await HotGoods.find();
        var cate = await Category.find();
        res.send({ "reason": "", "code": "0", "page_total": 4, "category": cate[0], "list": hotGoods })
    } catch (error) {
        res.send({ "msg": "invoke error...", "code": -200, "Success": true })
    }
})

//查询商品详情信息
router.get('/api/mall/goods', async function(req, res) {

    try {
        var detail = await GoodDetail.find();
        res.send({ "msg": "", "code": "0", "data": detail[0] });
    } catch (error) {
        res.send({ "msg": "invoke error...", "code": -200, "Success": true })
    }
})


//用户的购物车商品列表
router.get('/api/mall/goodsCart/list', async function(req, res) {

    var openid = req.query.openId;
    let sign = req.query.sign;
    let TIMESTAMP = req.query.time;
    const SIGN = md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())

    if (sign == SIGN) {
        try {
            var cartList = await Cart.find();
            var totalPrice = 0;
            for (let i = 0; i < cartList.length; i++) {
                totalPrice += cartList[i].priceSubtotal;
            }
            res.send({ "msg": "success", "code": "0", "totalPrice": totalPrice, "list": cartList });

        } catch (error) {
            res.send({ "msg": "invoke error...", "code": -200, "Success": true })
        }
    }
})


//商品加入购物车
router.get('/api/mall/goodsCart/add', async function(req, res) {

    var openid = req.query.openId;
    var goodsId = req.query.goodsId;
    var goodsSkuId = req.query.goodsSkuId;
    var purchaseType = req.query.purchaseType;
    var num = req.query.num;
    var sign = req.query.sign;
    var TIMESTAMP = req.query.time;
    const SIGN = md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())
    if (sign == SIGN) {
        try {
            var good = await HotGoods.find({ id: goodsId })
            good = good[0];
            var priceSubtotal = (num - 0) * (good.price - 0);

            var cart = new Cart({
                goodsId: goodsId,
                goodsName: good.name,
                ischecked: true,
                thumLogo: good.logo,
                goodsSkuValName: goodsSkuId,
                type: purchaseType,
                price: good.price,
                num: num,
                priceSubtotal: priceSubtotal
            })

            try {
                var result = await cart.save();
                console.log('加入购物车成功', result)
                res.send({ "result": result, "msg": "加入购物车成功", "code": 0 })
            } catch (error) {
                console.log('加入购物车失败', error)
                res.send({ "result": "002", "msg": error, "code": -1 })
            }

        } catch (error) {
            console.log('查询失败：', error)
            res.send({ "result": "002", "msg": error, "code": -1 })
        }
    }
})



//更新购物车数量
router.get('/api/mall/goodsCart/updateNum', async function(req, res) {

    var id = req.query.id;
    var num = req.query.num;
    try {
        var result = await Cart.updateOne({ _id: id }, { num: num });
        res.send({ code: 0, msg: "success", data: result })
    } catch (error) {
        res.send({ "result": "002", "msg": error, "code": -1 })
    }
})

//购物车删除商品
router.get('/api/mall/goodsCart/delete', async function(req, res) {

        var id = req.query.id;
        try {
            var result = await Cart.remove({ _id: id });
            console.log('删除购物车数据：', result)
            res.send({ code: 0, msg: "success", data: result })
        } catch (error) {
            res.send({ "result": "002", "msg": error, "code": -1 })
        }
    })
    //购物车全选
router.get('/api/mall/goodsCart/checkAll', async function(req, res) {
    var check = req.query.check;
    check = check == 1 ? true : false
    try {
        var result = await Cart.update({}, { ischecked: check });
        res.send({ code: 0, msg: "success", data: result })
    } catch (error) {
        res.send({ "result": "002", "msg": error, "code": -1 })
    }
})

//商品选择状态
router.get('/api/mall/goodsCart/check', async function(req, res) {

    var id = req.query.id;
    var ischecked = req.query.ischecked;
    try {
        var result = await Cart.update({ _id: id }, { ischecked: ischecked });
        console.log('状态更新：', result)
        res.send({ code: 0, msg: "success", data: result })
    } catch (error) {
        console.log('状态更新error：', error)
        res.send({ "result": "002", "msg": error, "code": -1 })
    }
})

//查询订单 详情数据
router.get('/api/mall/goodsOrder/commitData', async function(req, res) {

    try {
        var cartList = await Cart.find();
        var totalPrice = 0;
        for (let i = 0; i < cartList.length; i++) {
            totalPrice += cartList[i].priceSubtotal;
        }
        res.send({
            goodsList: cartList,
            totalPrice: totalPrice,
            code: 0,
            msg: "success"
        })
    } catch (error) {
        res.send({ "msg": "invoke error...", "code": -200, "Success": true })
    }
})

//支付前生成订单
router.get('/api/mall/goodsOrder/saveByCart', async function(req, res) {
    //清空购物车
    try {
        var result = await Cart.remove({});
        console.log(result)
        res.send({ msg: "success", code: 0, result: result })
    } catch (error) {
        res.send({ msg: error, code: 0, })
    }
})

module.exports = router;