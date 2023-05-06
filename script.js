const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
let score = 0

var timer;
var ele = document.getElementById('timer');
var sec = 0;
var centi = 0;

// LE CHRONOMETRE 
(function () {
  timer = setInterval(() => {
    ele.innerHTML = '00:' + sec;
    sec++;
    
    if (sec > 60 && score < 500) { // Ajouter une condition pour remettre à zéro le chronomètre
      clearInterval(timer);
      sec = 0;
      ele.innerHTML = '00:00'; // Remettre à zéro l'affichage du chronomètre
    }
  }, 1000); // Changer la fréquence de mise à jour en 1 seconde
})();


// LE SON 

const sound = new Audio("smash.mp3") // CODE POUR LE SON 

function run(){
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let timer = null

    const img = document.createElement('img')
    img.classList.add('mole')
    img.src = 'mole.png'

    img.addEventListener('click', () => {
        score += 10             // C'EST ICI QUON PEUT CHANGER LE SCORE 
        sound.play()           // PLAY DU SON 
        scoreEl.textContent = score
        img.src = 'mole-whacked.png'   // CHANGER LIMAGE UN FOIS QU'ON TAPE SUR LA TAUPE 
        clearTimeout(timer)
        setTimeout(() => {
            hole.removeChild(img)
            run()
        }, 500)
    })

    hole.appendChild(img)

    timer = setTimeout(() => {
        hole.removeChild(img)
        run()
    }, 1500)
}
run()


