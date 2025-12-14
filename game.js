const words = [
  {word:"apple", translation:"яблоко", hint:"A fruit, keeps the doctor away"},
  {word:"house", translation:"дом", hint:"A place where people live"},
  {word:"table", translation:"стол", hint:"Furniture with flat surface"},
  {word:"water", translation:"вода", hint:"Drink essential for life"},
  {word:"plant", translation:"растение", hint:"Grows in soil and needs sun"}
];

const targetObj = words[Math.floor(Math.random()*words.length)];
const target = targetObj.word;
const translation = targetObj.translation;
const hint = targetObj.hint;

document.getElementById("hint").textContent = "Hint: "+hint;

const board = document.getElementById("board");
const keyboardDiv = document.getElementById("keyboard");
const message = document.getElementById("message");
const transDiv = document.getElementById("translation");

const maxAttempts = 6;
let attempt = 0;
let currentGuess = "";

// создаём пустую доску
for(let i=0;i<maxAttempts*5;i++){
    const div = document.createElement("div");
    div.classList.add("cell");
    board.appendChild(div);
}

// создаём клавиатуру
const letters = "abcdefghijklmnopqrstuvwxyz";
for(let l of letters){
    const btn = document.createElement("button");
    btn.textContent = l.toUpperCase();
    btn.classList.add("key");
    btn.onclick = () => addLetter(l);
    keyboardDiv.appendChild(btn);
}
const enterBtn = document.createElement("button");
enterBtn.textContent = "ENTER";
enterBtn.classList.add("key");
enterBtn.style.gridColumn = "span 2";
enterBtn.onclick = submitGuess;
keyboardDiv.appendChild(enterBtn);

const delBtn = document.createElement("button");
delBtn.textContent = "DEL";
delBtn.classList.add("key");
delBtn.style.gridColumn = "span 2";
delBtn.onclick = deleteLetter;
keyboardDiv.appendChild(delBtn);

function addLetter(l){
    if(currentGuess.length < 5) currentGuess += l;
    updateBoard();
}

function deleteLetter(){
    currentGuess = currentGuess.slice(0,-1);
    updateBoard();
}

function updateBoard(){
    const start = attempt*5;
    for(let i=0;i<5;i++){
        const cell = board.children[start+i];
        cell.textContent = currentGuess[i]?currentGuess[i].toUpperCase():"";
        cell.className="cell";
    }
}

function submitGuess(){
    if(currentGuess.length !== 5){ message.textContent="Enter 5 letters!"; return; }

    const start = attempt*5;
    for(let i=0;i<5;i++){
        const cell = board.children[start+i];
        const ch = currentGuess[i];
        cell.textContent = ch.toUpperCase();

        if(ch === target[i]) cell.classList.add("correct");
        else if(target.includes(ch)) cell.classList.add("present");
        else cell.classList.add("absent");
    }

    if(currentGuess === target){
        message.textContent = "🎉 Correct! The word is '"+target.toUpperCase()+"'";
        transDiv.textContent = "Translation: "+translation;
        disableKeyboard();
        return;
    }

    attempt++;
    currentGuess = "";
    if(attempt >= maxAttempts){
        message.textContent = "❌ Game over! The word was '"+target.toUpperCase()+"'";
        transDiv.textContent = "Translation: "+translation;
        disableKeyboard();
    }
}

function disableKeyboard(){
    document.querySelectorAll(".key").forEach(b=>b.disabled=true);
}
