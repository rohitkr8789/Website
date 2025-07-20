let btn = document.querySelectorAll(".btn1");
let resetbtn = document.querySelector("#resetbtn");
//let body = document.querySelector("button");
let newBtn = document.querySelector("#newBtn");
let msgCon = document.querySelector(".contain");
let msg = document.querySelector("#msg");
let turno=true;
let win =[
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]
];


btn.forEach((btn1)=>{
btn1.addEventListener("click",()=>{
 //console.log("Box was click");
 if(turno){
btn1.innerText ="X";
turno = false;
 }
 else{
    btn1.innerText ="O";
turno = true;
 }
 btn1.disabled =true; 
 checkWin();
})
})

const checkWin = ()=>{
    for(let pattern of win){
         let pos1val= btn[pattern[0]].innerText;
         let pos2val= btn[pattern[1]].innerText;
         let pos3val= btn[pattern[2]].innerText;
        
         if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
             //   console.log("Winner",pos1val);
                showWinner(pos1val);
            }
       //     else drawGame();
         }
    }
}

const showWinner = (winner) =>{
msg.innerText=`Congratulations, Winner is ${winner}`;
    msgCon.classList.remove("hide");
    disableBoxes();
}

const drawGame = ()=>{
    msg.innerText=`Game was a Draw. Start Game !!!`;
    msgCon.classList.remove("hide");
    disableBoxes();
}
const disableBoxes = ()=>{
    for(let box of btn){
        box.disabled= true;
    }
}  

const enableBoxes = ()=>{
    for(let box of btn){
        box.disabled = false;
        box.innerText ="";
    }
} 

const resetGame =()=>{
    turno=true;
    msgCon.classList.add("hide");
    enableBoxes();
}

newBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);






