// 정답 지정
let answer = 0;
let playButton = document.getElementById("play_button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chance = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){userInput.value=""})

function selectNum(){
    answer = Math.floor(Math.random()*100)+1;
    console.log("answer : ",answer);
}

function play(){
    console.log("game start");
    let userValue = userInput.value;

    if(userValue < 1 || userValue > 100){
        resultArea.textContent = "범위를 넘어갔습니다. 1~100 사이 숫자를 입력하세요!!";
        return;
    }

    if(history.includes(userValue) == true){
        resultArea.textContent = "이미 입력한 값입니다!! 다른 값을 입력해주세요";
        return;
    }

    chance--;
    chanceArea.textContent = `남은 기회 : ${chance} 번`;
    if(userValue < answer){
        resultArea.textContent = "up"
        console.log("up");
    }else if(userValue > answer){
        resultArea.textContent = "down"
        console.log("down");
    }else {
        resultArea.textContent = "Collect!!!"
        gameOver = true;
    }
    history.push(userValue);
    console.log(history);

    if(chance<1) gameOver = true;

    if(gameOver == true) {
        resultArea.textContent = "game over";
        playButton.ariaDisabled = true;
    }
}

function reset(){
    // user input reset
    userInput.value = "";
    // selectNum() 호출
    selectNum();
    resultArea.textContent = "결과";
}
selectNum();
// 유저의 인풋 and 버튼 누름

// 정답 : 정답
// 정답 < 인풋 : Down
// 정답 > 인풋 : Up
// Reset버튼으로 게임 리셋
// 5번의 기호를 다쓰면 게임 끝
// 숫자 범위 넘어가는 값이 인풋으로 들어오면 범위넘어감을 알려줌 & 기회 차감 x
// 이미 입력한 숫자를 입력하면 알려주고 기회 차감 x