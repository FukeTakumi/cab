const times = document.getElementsByClassName('postdate');
const date = new Date();

//削除される時間を表示する処理
for(let i = 0;i < times.length;i++){
    let time = times[i].innerHTML;
    let hours = Number(time.split(':')[0]);
    let minutes = Number(time.split(':')[1]);
    let limit_hours = (hours + 1)%24;
    times[i].innerHTML = `${limit_hours}:${minutes}`;
}
