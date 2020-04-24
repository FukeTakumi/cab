var express = require('express');
var router = express.Router();
const db = require('../models/index');

router.get('/create',(req, res)=>{
    res.render('comes/post');
});

router.post('/create',(req, res)=>{
    const params = {
        island_name:req.body.island_name,
        name:req.body.name,
        fruit:req.body.fruit,
        cab_status:req.body.cab_status,
        cab_bell:req.body.cab_bell,
        want:req.body.want,
        pass:req.body.pass
    };
    db.come_message.create(params).then((results)=>{
        res.redirect('/');
    });
});

module.exports = router;