// Game Manager
const game = () => {
  let playerScore = 0;
  let computerScore = 0;
  let moves = 0;

  const playGame = () => {
    const rockBtn = document.querySelector(".rock");
    const paperBtn = document.querySelector(".paper");
    const scissorBtn = document.querySelector(".scissor");

    const playerOptions = [rockBtn, paperBtn, scissorBtn];
    const computerOptions = ["rock", "paper", "scissor"];

    // Start Function
    playerOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const movesLeft = document.querySelector(".movesleft");
        moves++;
        movesLeft.innerText = `Round: ${0 + moves} | 8`;

        const choiceNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[choiceNumber];

        winner(this.innerText, computerChoice);

        if (moves == 8) {
          gameOver(playerOptions, movesLeft);
        }
      });
    });
  };

  // Score Function
  const winner = (player, computer) => {
    const result = document.querySelector(".result");
    const playerScoreBoard = document.querySelector(".p-count");
    const computerScoreBoard = document.querySelector(".c-count");
    const imageCompBoard = document.querySelector(".com-image img");
    const imagePlayerBoard = document.querySelector(".player-image img");

    player = player.toLowerCase();
    computer = computer.toLowerCase();

    if (player == "rock") {
      imagePlayerBoard.src = "option/Rock3.png";
    } else if (player == "scissor") {
      imagePlayerBoard.src = "option/Scissor3.png";
    } else if (player == "paper") {
      imagePlayerBoard.src = "option/Paper3.png";
    }

    if (computer == "rock") {
      imageCompBoard.src = "option/Rock3.png";
    } else if (computer == "scissor") {
      imageCompBoard.src = "option/Scissor3.png";
    } else if (computer == "paper") {
      imageCompBoard.src = "option/Paper3.png";
    }

    if (player === computer) {
      result.textContent = "Tie";
    } else if (player == "rock") {
      if (computer == "paper") {
        result.textContent = "Computer Won";
        computerScore++;
        computerScoreBoard.textContent = computerScore;
      } else {
        result.textContent = "Player Won";
        playerScore++;
        playerScoreBoard.textContent = playerScore;
      }
    } else if (player == "scissor") {
      if (computer == "rock") {
        result.textContent = "Computer Won";
        computerScore++;
        computerScoreBoard.textContent = computerScore;
      } else {
        result.textContent = "Player Won";
        playerScore++;
        playerScoreBoard.textContent = playerScore;
      }
    } else if (player == "paper") {
      if (computer == "scissor") {
        result.textContent = "Computer Won";
        computerScore++;
        computerScoreBoard.textContent = computerScore;
      } else {
        result.textContent = "Player Won";
        playerScore++;
        playerScoreBoard.textContent = playerScore;
      }
    }
  };

  // Result Function
  const gameOver = (playerOptions, movesLeft) => {
    const chooseMove = document.querySelector(".move");
    const result = document.querySelector(".result");
    const reloadBtn = document.querySelector(".reload");
    const reloadText = document.querySelector(".reload p");
    const playerScoreBoard = document.querySelector(".p-count");
    const computerScoreBoard = document.querySelector(".c-count");

    playerOptions.forEach((option) => {
      option.style.display = "none";
    });

    chooseMove.innerText = "Game Over!!";
    movesLeft.style.display = "none";

    if (playerScore > computerScore) {
      myCatEngine("act", "lose");
      result.style.fontSize = "3rem";
      result.innerText = "You Won The Game :)";
      result.style.color = "white";
    } else if (playerScore < computerScore) {
      myCatEngine("act", "win");
      result.style.fontSize = "3rem";
      result.innerText = "You Lost The Game :(";
      result.style.color = "white";
    } else {
      myCatEngine("act", "tie");
      result.style.fontSize = "3rem";
      result.innerText = "Tie :|";
      result.style.color = "white";
    }
    reloadText.innerHTML = "Restart";
    reloadBtn.style.display = "flex";

    // Reset
    reloadBtn.addEventListener("click", () => {
      // window.location.reload();
      playerOptions.forEach((option) => {
        option.style.display = "flex";
      });
      myCatEngine("idle", "idle");
      chooseMove.innerText = "Choose Your Weapons!!";
      movesLeft.style.display = "block";
      reloadBtn.style.display = "none";
      result.innerText = "Play The Game";
      result.style.fontSize = "1.2rem";
      playerScore = 0;
      computerScore = 0;
      moves = 0;
      playerScoreBoard.textContent = playerScore;
      computerScoreBoard.textContent = computerScore;
      movesLeft.innerText = `Round: 0 | 8`;
    });
  };

  playGame();
};

// Execute Game
game();

// Audio System
const audioImg = document.getElementById("audio-img");
const myAudio = document.getElementById("myAudio");
const myAudioText = document.querySelector(".audio-text p");
function doWhichKey(m) {
  m = m || window.event;
  let charCode = m.keyCode || m.which;
  return String.fromCharCode(charCode);
}

let isMuted = false;
let isFirst = true;

window.addEventListener(
  "keypress",
  function (m) {
    if (doWhichKey(m) == "p" && isFirst == true) {
      myAudio.play();
      isFirst = false;
      myAudioText.textContent = "Press 'M' To Mute The Music";
    }
    if (isMuted == true && doWhichKey(m) == "m") {
      audioImg.style.backgroundImage = "url(option/audio.gif)";
      myAudio.play();
      isMuted = false;
      myAudioText.textContent = "Press 'M' To Mute The Music";
    } else if (isMuted == false && doWhichKey(m) == "m") {
      audioImg.style.backgroundImage = "url(option/Mute.png)";
      myAudio.pause();
      isMuted = true;
      myAudioText.textContent = "Press 'M' Again To UnMute The Music";
    }
  },
  false
);

// My Cat System
const mycat = document.getElementById("mycat-img");
const mycatText = document.getElementById("mycatText");
const catChoice = Math.floor(Math.random() * 3);
const catWinText = [
  "Miaw, miaw.. Nice Try Hehe",
  "Miaw.. It looks like my paw is sharper than the scissors",
  "Miaw, im sleepy",
];
const catLoseText = [
  "Miaw, Umm.. Im a cat actually",
  "Miaw.. My paw is cute fufufu",
  "Miaw, Oh My what is this, oh its a dust",
];

const myCatEngine = (state, cond) => {
  if (state == "idle" && cond == "idle") {
    mycatText.textContent = "Miaw, Again?";
    mycat.style.backgroundImage = "url(option/Cat-Idle.gif)";
  } else if (state == "act" && cond == "win") {
    mycatText.textContent = catWinText[catChoice];
    mycat.style.backgroundImage = "url(option/Cat-Act.gif)";
  } else if (state == "act" && cond == "lose") {
    mycatText.textContent = catLoseText[catChoice];
    mycat.style.backgroundImage = "url(option/Cat-Act.gif)";
  } else if (state == "act" && cond == "tie") {
    mycatText.textContent = "Finally, a worthy opponent for my paw";
    mycat.style.backgroundImage = "url(option/Cat-Act.gif)";
  }
};
