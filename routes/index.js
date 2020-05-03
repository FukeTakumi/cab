var express = require('express');
var router = express.Router();
const db = require('../models/index');


////時間制限で削除する処理////

//残り時間を計算する関数
function passing_time(hours,minutes,now_hours,now_minutes){
  let passing_hours = mod(now_hours - hours,24);
  if(now_minutes - minutes  < 0){
    passing_hours -= 1;
  }
  if(passing_hours >= 1){
    return true
  } else {
    return false
  }
}

//剰余を常に正にする関数
function mod(i, j) {
  return (i % j) < 0 ? (i % j) + 0 + (j < 0 ? -j : j) : (i % j + 0);
}

//一覧表示テスト
router.get('/',(req, res)=>{
  db.come_message.findAll().then((come_messages)=>{
    for(let i = 0;i < come_messages.length; i++){
      date = new Date();
      let now_hours = date.getHours();
      let now_minutes = date.getMinutes();
      let hours = Number(come_messages[i].postdate.split(':')[0]);
      let minutes = Number(come_messages[i].postdate.split(':')[1]);

      if(passing_time(hours,minutes,now_hours,now_minutes)){
        let drop_filter = {
          where:{
            id:come_messages[i].id
          }
        };
        db.come_message.destroy(drop_filter)
      }
    }
    const filter = {
      include:[{
        model:db.go_message
      }]
    };
    db.come_message.findAll(filter).then((results)=>{
      res.render('index.ejs',{come_messages:results});
    });
  });
});

router.get('/rule',(req,res) =>{
  res.render('rule.ejs');
})

module.exports = router;
