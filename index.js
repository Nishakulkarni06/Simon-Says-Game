let box = document.querySelector(".box");
let p = document.querySelector("p");

let gameSeq = [];
let userSeq = [];
let highestScore = 0 ; 

let btns = ["box1","box2","box3","box4"]

let started = false ; 
let level = 0; 

document.body.addEventListener("keydown",(event)=>{
    if (started == false){
    started=true; 
    levelUp();
}
});

function btnFlash (btn){
btn.classList.add("highlight");
setTimeout(()=>{
    btn.classList.remove("highlight");
},100);
}

function levelUp(){
    userSeq=[];
    level++;
    p.innerText=(`Level ${level} `);

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn); 
}

function checkAns (idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        if(level-1 > highestScore){
            highestScore = level-1; 
        }
        p.innerHTML=(`Game Over !  Your score is <b>${level-1}</b> 
            <br/> Your Highest score is : ${highestScore}<br/> Press Any Key To Start`);
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function (){
        document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn = this;
    btnFlash(btn);
    userBox = btn.getAttribute("id");
    userSeq.push(userBox);

    checkAns(userSeq.length-1);
}
let allBtns = document.querySelectorAll(".box");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0 ;
}