const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
let score = 0;

var timer;
var ele = document.getElementById('timer');
var sec = 0;
var centi = 0;

var gameRunning = true; // Variable de contrôle pour vérifier si le jeu est en cours

// LE CHRONOMETRE  
(function () {
  timer = setInterval(() => {
    ele.innerHTML = '00:' + sec;
    sec++;
    
    if (sec > 10 && score < 50) {
      clearInterval(timer);
      sec = 0;
      ele.innerHTML = '00:00';
      gameRunning = false; // Mettre gameRunning à false lorsque le jeu est terminé
      showGameOverPopup();
    }
  }, 1000);

  function showGameOverPopup() {
    if (!gameRunning) {
      // Créer une div pour le fond flou
      let overlay = document.createElement('div');
      overlay.classList.add('overlay');

      // Créer une div pour le popup
      let popup = document.createElement('div');
      popup.classList.add('popup');
      popup.innerHTML = ' Game Over Looser ';

      // Ajouter le fond flou et le popup à la page
      document.body.appendChild(overlay);
      document.body.appendChild(popup);

      // Appliquer une classe au body pour flouter l'arrière-plan
      document.body.classList.add('blur');
    }
  }
})();

// LE SON 
const sound = new Audio("smash.mp3");

function run() {
  if (gameRunning) {
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'mole.png';

    img.addEventListener('click', () => {
      if (gameRunning) {
        score += 10;
        sound.play();
        scoreEl.textContent = score;
        img.src = 'mole-whacked.png';
        clearTimeout(timer);
        setTimeout(() => {
          hole.removeChild(img);
          run();
        }, 500);
      }
    });

    hole.appendChild(img);

    timer = setTimeout(() => {
      if (gameRunning) {
        hole.removeChild(img);
        run();
      }
    }, 1500);
  }
}

run();
