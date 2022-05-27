const { apply } = require('async');
const express =  require('express');
const router = express.Router();

router.get('/', function(req, res, next){
  res.redirect('/catalog/');
});

app.listen('3000');
//module.exports = router;
