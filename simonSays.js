let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let hScore = 0;
let btns = ["red","blue","green","yellow"];
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
h3.classList.add("for");
let over = document.querySelector("span");
over.classList.add("over");
document.addEventListener("contextmenu", function(event){
    alert("Right click is not allowed");
    event.preventDefault();
    });
document.addEventListener("keypress", function(){
    if(started==false){
        started = true;
        levelUp();   
    }
});
function flash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },100);
}
function spark(btn){
    btn.classList.add("spark");
    setTimeout(function(){
        btn.classList.remove("spark");
    },100);
}
function levelUp(){
    score();
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;
    let randomIndex = Math.floor(Math.random()*4);
    let randomColor = btns[randomIndex];
    gameSeq.push(randomColor); 
    let randBtn = document.querySelector(`.${randomColor}`);
    flash(randBtn);
    console.log(gameSeq);
}
function ans(idx){
    if(userSeq[idx]==gameSeq[idx]){
        document.getElementById('tap').play();
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        let body = document.querySelector("body");
        body.style.backgroundColor ="red";
        over.classList.remove("over");
        h2.innerHTML=`GAME OVER <br>Your Score Was <i>${level}</i>`;
        document.getElementById('sound').play();
        setTimeout(function(){
            body.style.backgroundColor ="white";
        },100);
        reset();
    }
}
function btnPress(){
   let btn = this;
   spark(btn);
   userColor = btn.getAttribute("id");
   userSeq.push(userColor);
   ans(userSeq.length-1);
}
let allBtn = document.querySelectorAll(".box");
for (bstn of allBtn){
    bstn.addEventListener("click",btnPress);
}
function reset(){
    started=false;
    gameSeq=[];
    over.classList.add("over");

    level=0; 
}
function score(){
    if (level >= hScore){
        hScore = level;
        h3.innerText = `Highest Score ${hScore}`;
        h3.classList.remove("for");
    }
}