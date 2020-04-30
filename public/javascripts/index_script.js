
const times = document.getElementsByClassName('postdate');
const go_message_all = document.getElementsByClassName("go_message_all");
const cab_status = document.getElementsByClassName('cab_status_is');

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

//いきたい！のcss非表示処理
// for(let i = 0;i<go_message_all.length;i++){
//     if(go_message_all[i].innerText === ""){
//         $(go_message_all[i]).css({
//             "display":"none"
//         });
//     }
// }

//売り値/買い値の色変更
for(let i = 0;i<cab_status.length;i++){
    if(cab_status[i].innerText === "買い値"){cab_status[i].classList.add("be_red")};
    if(cab_status[i].innerText === "売り値"){cab_status[i].classList.add("be_green")};
}

