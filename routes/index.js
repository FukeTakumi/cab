var express = require('express');
var router = express.Router();
const db = require('../models/index');

////時間制限で削除する処理////
date = new Date();

//残り時間を計算する関数
function passing_time(hours,minutes){
  let passing_hours = mod(date.getHours() - hours,24);
  if(date.getMinutes() - minutes  < 0){
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

//削除を行う処理
db.come_message.findAll().then((come_messages)=>{
  for(let i = 0;i < come_messages.length; i++){
    const hours = Number(come_messages[i].postdate.split(':')[0]);
    const minutes = Number(come_messages[i].postdate.split(':')[1]);
    if(passing_time(hours,minutes)){
      const filter = {
        where:{
          id:come_messages[i].id
        }
      };
      db.come_message.destroy(filter);
      
    }
  }
});
//一覧表示
router.get('/',(req, res)=>{
  db.come_message.findAll().then((come_messages)=>{
    for(let i = 0;i < come_messages.length; i++){
      let hours = Number(come_messages[i].postdate.split(':')[0]);
      let minutes = Number(come_messages[i].postdate.split(':')[1]);
      console.log(hours);
      console.log(minutes);
      
      if(passing_time(hours,minutes)){
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

module.exports = router;
