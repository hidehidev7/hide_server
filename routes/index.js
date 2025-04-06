var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 'title': req.app.get("server name"), 'pagetitle': 'トップ', });
});

router.get('/minigame/', function(req, res, next) {
  res.render('yoke-game', { 'title': 'よけゲーム | ' + req.app.get("server name"), 'pagetitle': 'よけゲーム', });
});

module.exports = router;
