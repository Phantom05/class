var express = require('express');
var router = express.Router();
var {
  productItems,
  coupons
} = require('../db/data')

/* GET home page. */
router.get('/list/:page', (req, res, next) => {
  let body = {};
  req.session.productItems = req.session.productItems || productItems;
  req.session.cart = req.session.cart || [];
  req.session.pageName = 'products';
  body.productItems = productItems;

  console.log(req.session, 'carcar')
  res.render('products/products', body);
});


router.get('/wish/list/:page', (req, res, next) => {
  let body = {};
  req.session.productItems = req.session.productItems || productItems;
  req.session.cart = req.session.cart || [];
  req.session.pageName = 'wishlist';
  console.log(req.session)
  body.coupons = coupons;
  console.log(body)
  res.render('wishlist/wishlist',body);
});

router.put('/cart', (req, res, next) => {
  // console.log(req.session.productItems,'cartin');
  if (req.session.cart.includes(req.body.productId)) {
    console.log('있음');
  } else {
    req.session.cart.push(req.body.productId)
  }

  if (req.session.cart.length > 3) {
    req.session.cart.pop();
    let body = {};
    body.msg = '장바구니에는 3개 상품만 담을 수 있습니다.';
    body.cartList = req.session.cart;
    res.json(body);
  } else {
    res.json(req.body);
  }

  console.log(req.session)
});

router.delete('/cart/del', (req, res, next) => {
  // console.log(req.session.productItems,'cartin');
  console.log(req.body.productId, 'del target')

  let arrIdx = req.session.cart.indexOf(req.body.productId);
  if (arrIdx > -1) req.session.cart.splice(arrIdx, 1)
  console.log(req.session)
  res.json(req.body);

});

module.exports = router;
