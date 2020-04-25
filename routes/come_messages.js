var express = require('express');
var router = express.Router();
const db = require('../models/index');

//きてほしい入力画面表示
router.get('/create',(req, res)=>{
    res.render('comes/post.ejs');
});

//きてほしい新規作成
router.post('/create',(req, res)=>{
    let date = new Date();
    const params = {
        island_name:req.body.island_name,
        name:req.body.name,
        fruit:req.body.fruit,
        cab_status:req.body.cab_status,
        cab_bell:req.body.cab_bell,
        want:req.body.want,
        pass:req.body.pass,
        postdate:`${date.getHours()}:${date.getMinutes()}`
    };
    db.come_message.create(params).then((results)=>{
        res.redirect('/');
    });
});

//きてほしい削除
router.delete('/delete/:id',(req, res)=>{
    const filter = {
        where:{
            id:req.params.id
        }
    };
    db.come_message.destroy(filter).then((results)=>{
        res.redirect('/');
    });
});

module.exports = router;