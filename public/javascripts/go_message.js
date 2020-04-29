const target = document.getElementsByClassName("go_message_all")
for(let i = 0;i<target.length;i++){
    if(target[i].innerText === ""){
        $(target[i]).css({
            "display":"none"
        });
    }
}