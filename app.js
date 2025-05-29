let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let moveCount = 0;


let turnO = true; //playerO, playerX

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    trueO = true;
    moveCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) =>{
    box.addEventListener("click",() =>{
        console.log("box was clicked");
        if(turnO){      //playerO
            box.innerText = "O";
            box.style.color = "#153462";
            turnO = false;  //now turn of playerX
        }
        else{       //playerX
            box.innerText = "X"; 
            box.style.color = "rgb(143, 11, 11)";
            turnO = true;   //now turn of playerO
        }
        box.disabled = true; //if once box clicked, next time we cannot change
        moveCount++;
    
        checkWinner(); //winner checking function
    });
});

const disableBoxes = () => {
    for( let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for( let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations!\n Winner is '${winner}'`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "Match Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => { 
    let win = 0;
    for(pattern of winPatterns){
        // console.log(pattern);  //if click one box, all pattern will print
        // console.log(pattern[0], pattern[1], pattern[2]);  // this will print individual indexes of pattern
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);  //individual element of every pattern of boxes and value in them(innertext)
    
        let position1val =  boxes[pattern[0]].innerText;
        let position2val =  boxes[pattern[1]].innerText;
        let position3val =  boxes[pattern[2]].innerText;
    
        if(position1val != ""  && position2val != "" && position3val != ""){
            if(position1val === position2val && position2val === position3val){
                win = 1;
                showWinner(position1val);
            }
        }
    }
    if(moveCount === 9 && win===0){    //If no winner and all moves done
        showDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

