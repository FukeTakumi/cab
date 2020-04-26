var express = require('express');
var router = express.Router();
const db = require('../models/index');

//いきたい入力画面表示
router.get('/create/:id',(req, res)=>{
    res.render('gos/post.ejs', {id:req.params.id});
});

//いきたい新規作成
router.post('/create/:id',(req, res)=>{
    const params = {
        island_name:req.body.island_name,
        name:req.body.name,
        memo:req.body.memo,
        come_message_id:req.params.id
    };
    if(validate(req.body)){
        db.go_message.create(params).then((results)=>{
            res.redirect('/');
        });
    }else{
        res.redirect(`/go/create/${req.params.id}`);
    };
});

function validate(go_message){
    if(go_message.island_name.length > 10 || go_message.island_name === ""){
        console.log('島の名前が無効です')
        console.log(go_message.island_name.length);
        return false;
    }
    if(go_message.name.length > 10 || go_message.name === ""){
        console.log('名前が無効です')
        return false;
    }
    if(go_message.memo.length > 20){
        console.log('メモは20文字以内です');
        return false;
    }else{
        return true;
    }
}

//行きたい削除
router.delete('/delete/:id',(req, res)=>{
    const filter = {
        where:{
            id:req.params.id
        }
    };
    db.go_message.destroy(filter).then((results)=>{
        res.redirect('/');
    });
});


module.exports = router;