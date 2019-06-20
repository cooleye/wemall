import {
    wxRequest
} from '@/utils/wxRequest';

const apiMall = 'http://localhost:3000'

/**
 * 获取发现好商品接口
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */


//商品接口---begin
//微信的jscode换取sessionKey
const wxJsCode2Session = (params) => wxRequest(params, apiMall + "/api/wechat/jscode2session");

//首页发现商品接口
const getHomeDisvocerList = (params) => wxRequest(params, apiMall + '/api/mall/discoverList');
//查询广告列表
const getAdList = (params) => wxRequest(params, apiMall + '/api/adverts/list');
//首页发现商品接口
const hostGoodsList = (params) => wxRequest(params, apiMall + '/api/home/hostGoodsList');
//查询商品详情信息
const goodsDetail = (params) => wxRequest(params, apiMall + '/api/mall/goods');
//商品加入购物车
const addCart = (params) => wxRequest(params, apiMall + '/api/mall/goodsCart/add');
//用户的购物车商品列表
const cartList = (params) => wxRequest(params, apiMall + '/api/mall/goodsCart/list');
//购物车的商品数量更新
const cartUpdateNum = (params) => wxRequest(params, apiMall + '/api/mall/goodsCart/updateNum');
//购物车的商品选中状态
const cartCheck = (params) => wxRequest(params, apiMall + '/api/mall/goodsCart/check');
//购物车的商品选中状态(全选)
const cartCheckAll = (params) => wxRequest(params, apiMall + '/api/mall/goodsCart/checkAll');
//购物车的商品删除
const cartDel = (params) => wxRequest(params, apiMall + '/api/mall/goodsCart/delete');
//获取订单详情
const preOrder = (params) => wxRequest(params, apiMall + '/api/mall/goodsOrder/commitData');
//支付前生成订单
const saveByCart = (params) => wxRequest(params, apiMall + '/api/mall/goodsOrder/saveByCart');
//一级分类
const rootCtegoryList = (params) => wxRequest(params, apiMall + '/api/mall/rootCtegoryList');

export default {
    getHomeDisvocerList,
    getAdList,
    hostGoodsList,
    goodsDetail,
    addCart,
    cartList,
    cartUpdateNum,
    cartCheck,
    cartCheckAll,
    cartDel,
    preOrder,
    saveByCart,
    rootCtegoryList,
    wxJsCode2Session
}