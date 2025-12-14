function submitGuess(){
    if(currentGuess.length !== 5){ message.textContent="Enter 5 letters!"; return; }

    const start = attempt*5;
    const cells = [];
    for(let i=0;i<5;i++){
        const cell = board.children[start+i];
        const ch = currentGuess[i];
        cell.textContent = ch.toUpperCase();
        cell.className="cell";
        cells.push(cell);
    }

    // Анимация переворота клеток по одной
    cells.forEach((cell,i)=>{
        setTimeout(()=>{
            cell.classList.add("flip");
            setTimeout(()=>{
                const ch = currentGuess[i];
                if(ch === target[i]) cell.classList.add("correct");
                else if(target.includes(ch)) cell.classList.add("present");
                else cell.classList.add("absent");
                cell.classList.remove("flip");
            },200);
        }, i*200);
    });

    // Проверка победы
    if(currentGuess === target){
        setTimeout(()=>{
            message.textContent = "🎉 Correct! The word is '"+target.toUpperCase()+"'";
            transDiv.textContent = "Translation: "+translation;
            disableKeyboard();
        }, 1200);
        return;
    }

    attempt++;
    currentGuess = "";
    if(attempt >= maxAttempts){
        setTimeout(()=>{
            message.textContent = "❌ Game over! The word was '"+target.toUpperCase()+"'";
            transDiv.textContent = "Translation: "+translation;
            disableKeyboard();
        }, 1200);
    }
}
