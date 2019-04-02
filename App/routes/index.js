var express = require('express');
var router = express.Router();
var { productItems, coupons } = require('../db/data')

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.productItems = req.session.productItems || productItems;
  req.session.cart = req.session.cart || [];

  console.log(req.session,'index')
  res.render('index', { title: 'Express' });
});

module.exports = router;
