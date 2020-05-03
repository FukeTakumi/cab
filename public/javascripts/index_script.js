
const times = document.getElementsByClassName('postdate');
const cab_status = document.getElementsByClassName('cab_status_is');
const updatebutton = document.getElementById('update_button');

const date = new Date();

//削除される時間を表示する処理
for(let i = 0;i < times.length;i++){
    let time = times[i].innerHTML;
    let hours = Number(time.split(':')[0]);
    let minutes = Number(time.split(':')[1]);
    let limit_hours = (hours + 1)%24;
    if (minutes < 10){
        times[i].innerHTML = `${limit_hours}:0${minutes}`;
    }else{
        times[i].innerHTML = `${limit_hours}:${minutes}`;
    }
}

//売り値/買い値の色変更
for(let i = 0;i<cab_status.length;i++){
    if(cab_status[i].innerText === "買い値"){cab_status[i].classList.add("be_buy")};
    if(cab_status[i].innerText === "売り値"){cab_status[i].classList.add("be_sell")};
}

