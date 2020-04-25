var express = require('express');
var router = express.Router();
const db = require('../models/index');

router.get('/',(req, res)=>{
  const filter ={
    include:[{
      model:db.go_message
    }]
  };
  db.come_message.findAll(filter).then((results)=>{
    res.render('index.ejs',{come_messages:results});
  });
});

module.exports = router;
