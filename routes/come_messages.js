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
    let fruit = ""
    switch (req.body.fruit) {
    case 'リンゴ':
        fruit = "apple"
        break;
    case 'オレンジ':
        fruit = "orange"
        break;
    case "ナシ":
        fruit = "nashi"
        break;
    case "さくらんぼ":
        fruit = "cherry"
        break;
    case "モモ":
        fruit = "peach"
        break;
    default:
    }
    const params = {
        island_name:req.body.island_name,
        name:req.body.name,
        fruit:fruit,
        cab_status:req.body.cab_status,
        cab_bell:req.body.cab_bell,
        want:req.body.want,
        pass:req.body.pass,
        postdate:`${date.getHours()}:${date.getMinutes()}`
    };
    if(validate(req.body)){
        db.come_message.create(params).then((results)=>{
            console.log('クリア');
            res.redirect('/');
        });
    }else{
        res.redirect('/come/create');
    };
});

function validate(come_message){
    if(come_message.island_name.length > 10 || come_message.island_name === ""){
        console.log('島の名前が無効です')
        console.log(come_message.island_name.length);
        return false;
    }
    if(come_message.name.length > 10 || come_message.name === ""){
        console.log('名前が無効です')
        return false;
    }
    if(come_message.fruit === ""){
        console.log('果実が無効です')
        return false;
    }
    if(come_message.cab_status === ""){
        console.log('株の状態が無効です')
        return false;
    }
    if(come_message.cab_bell <= 70 || come_message.cab_bell >= 700){
        console.log('株価が無効です');
        return false;
    };
    if(come_message.want.length > 30){
        console.log('ほしい！は30文字以内です');
        return false;
    };
    if(come_message.pass.length !== 5){
        console.log(come_message.pass.length);
        console.log('パスワードが無効です');
        return false;
    }else{
        return true;
    }
}


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