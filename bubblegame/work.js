document.querySelector("#restart").addEventListener("click",(e) => {
    startGame();
})
document.querySelector("#play").addEventListener("click",(e) => {
    startGame();
})

function makeBubble() {
    var clutter = " ";

    for (let i = 1; i <= 286; i++)
    {
        let rm = Math.floor(Math.random()*10+1)
        clutter += `<div class="bubble">${rm}</div>`
    }
    document.querySelector(".pbottom").innerHTML = clutter;
}

let timeInterval;
function timer()
{
    let time = 60;

    timeInterval = setInterval(() => {
        if (time > 0)
        {
            time--; 
            document.querySelector("#timerval").innerHTML = time;
        }
        else {
            stopGame();
        }
       
    }, 1000);
}
makeBubble();
let rn
function getHit() {
     rn = Math.floor(Math.random() * 10 + 1)
    document.querySelector("#hitval").innerHTML = rn;
}

 
let score = 0;
function increascore() {
    score += 10;
    document.querySelector("#scoreval").innerHTML = score;
}
function getScore() {
    let valuehit = document.querySelector(".pbottom");
    valuehit.addEventListener("click", (e) => {
        if (Number(e.target.textContent) === rn)
        {
            increascore();
            makeBubble();
            getHit();
        }
    })
}

function startGame() {
   
    timer();
    getHit();
    getScore();
}

function stopGame() {
  
    clearInterval(timeInterval);
    document.querySelector(".pbottom").removeEventListener("click", getScore);
    alert("Game over! Click restart to play again.");
}