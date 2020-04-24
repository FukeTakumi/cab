var express = require('express');
var router = express.Router();
const db = require('../models/index');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;