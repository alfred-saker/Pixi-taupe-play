
const ground = document.querySelector("#terrain");
const app = new PIXI.Application({
  width:900,
  height: 600,
  // backgroundColor: 0x8ED2C9,
});
ground.appendChild(app.view);
ground.style.marginLeft = 200;

// Création d'une texture
var landscapeTexture = PIXI.Texture.from("images/herbe.jpg");
var texture2 = new PIXI.Texture(landscapeTexture, new PIXI.Rectangle(0, 0, 900, 253));
var background = new PIXI.Sprite(texture2);
background.anchor.x = 0;
background.anchor.y = 0;
background.position.x = 0;
background.position.y = 0;
app.stage.addChild( background );

// Tableau images
let imgArray = new Array()

imgArray[0] = new Image();
imgArray[0].src = './images/splash class room image.jpg';

imgArray[1] = new Image();
imgArray[1].src = './images/splash animal image.jpg';

imgArray[2] = new Image();
imgArray[2].src = './images/splash nature image.jpg';

imgArray[3] = new Image();
imgArray[3].src = './images/splash food image.jpg';

imgArray[4] = new Image();
imgArray[4].src = './images/splash travel image.jpg';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
console.log(getRandomInt(imgArray.length))

// Tableau des positions des trous
let trouePositions = [
  { x: 250, y: 250 },
  { x: 400, y: 250 },
  { x: 550, y: 250 },
  { x: 250, y: 380 },
  { x: 400, y: 380 },
  { x: 550, y: 380 },
  { x: 250, y: 500 },
  { x: 400, y: 500 },
  { x: 550, y: 500 }
];

// Création d'ombre'
for (let i = 0; i < trouePositions.length; i++) {
  let troue = new PIXI.Graphics();
  troue.beginFill(0x00000, 0.9);
  troue.drawEllipse(0, 0, 70, 20);
  troue.endFill();
  troue.position.x = trouePositions[i].x;
  troue.position.y = trouePositions[i].y-5;
  app.stage.addChild(troue);
}
// Création des trous légèrement plats
for (let i = 0; i < trouePositions.length; i++) {
  let troue = new PIXI.Graphics();
  troue.beginFill(0x713f05);
  troue.drawEllipse(0, 0, 70, 20);
  troue.endFill();
  troue.position.x = trouePositions[i].x;
  troue.position.y = trouePositions[i].y;
  app.stage.addChild(troue);
}

// Boucle de rendu
function gameLoop() {
  requestAnimationFrame(gameLoop);
  // Mise à jour du jeu
  // ...

  // Rendu du jeu
  app.renderer.render(app.stage);
}
gameLoop();

