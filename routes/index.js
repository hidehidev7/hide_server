var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 'title': 'Hide Server', 'pagetitle': 'トップ', });
});

router.get('/minigame/', function(req, res, next) {
  res.render('yoke-game');
});

module.exports = router;
