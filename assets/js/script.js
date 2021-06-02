//create an event listener that execute function after the loading of the page

document.addEventListener("DOMContentLoaded",function(){
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons){
        button.addEventListener("click",function() {
            if(this.getAttribute("data-type") === "submit"){
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    runGame("addition");
    runGame("multiply");
    runGame("subtract");
})

/**
 * CREATE A LOOP FOR START GAME
 */

 /** CREATE TWO RANDOM NUMBERS BETWEEN 1 AND 25 */
function runGame(gameType){
    let num1 = Math.floor(Math.random()*25)+1;
    let num2 = Math.floor(Math.random()*25)+1;

    if (gameType === "addition"){
        displayAdditionQuestion(num1, num2);
    }else if(gameType === "multiply"){
        displayMultiplyQuestion(num1, num2);
    }else if(gameType === "subtract"){
        displaySubstractQuestion(num1, num2);
    }else{
        alert(`Unknow game type ${gameType}`);
        throw `Unknow game type ${gameType}. Aborting!`;
    }

}
/**
 * check the answer against the firs element in the returned
 * calculateCorrectAnswer array
 */
function checkAnswer(){
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer(); 
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect){
        alert("Bravo!!!");
        incrementScore();        
    }else{
        alert(`Answered ${userAnswer}, the correct answer war ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }
/**
 * this will run a game of the same type of the last played
 */
    runGame(calculatedAnswer[1]);

}
/**
 * Get the operands and the operator 
 * directly from dom and check correct answer
 */
function calculateCorrectAnswer(){
  
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    
    if(operator === "+"){
        return[ operand1 + operand2, "addition"];        
    }else if(operator ==="x"){
        return[ operand1 * operand2, "multiply"];
    }else if(operator ==="-"){
        return[ operand1 - operand2, "subtract"];
    }else{
        alert(`Uninplemented operator ${operator}`);
        throw `Uninplemented operator ${operator}. Aborting!`;
    }


}
/**
 * get the score from DOM and increment by 1 
 */
function incrementScore(){
    let oldScore = document.getElementById("score").innerText;
    document.getElementById("score").innerText = ++oldScore;

}
/**
 * get the wrong answer from DOM and increment by 1 copy the function increment score
 */
function incrementWrongAnswer(){
    let oldScore = document.getElementById("incorrect").innerText;
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2){
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubstractQuestion(operand1, operand2){
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2){
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}