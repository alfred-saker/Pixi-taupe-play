
const ground = document.querySelector("#terrain");
const app = new PIXI.Application({
  width:900,
  height: 600,
  backgroundColor: 0x8ED2C9,
});
ground.appendChild(app.view);
ground.style.marginLeft = 200;

// Création d'une texture (background du terra)
var landscapeTexture = PIXI.Texture.from("images/path177.png");
var texture2 = new PIXI.Texture(landscapeTexture, new PIXI.Rectangle(0, 0, 900, 253));
var background = new PIXI.Sprite(texture2);
background.anchor.x = 0;
background.anchor.y = 0;
background.position.x = 0;
background.position.y = 400;
app.stage.addChild( background );



// Tableau images
let imgArray = new Array()

imgArray[0] = new Image();
imgArray[0].src = './images/1.png';
imgArray[0].bot ='/images/11.png';
imgArray[0].width = 177;
imgArray[0].height = 143;

imgArray[1] = new Image();
imgArray[1].src = './images/2.png';
imgArray[1].bot ='/images/22.png';
imgArray[1].width = 139;
imgArray[1].height = 136;

imgArray[2] = new Image();
imgArray[2].src = './images/3.png';
imgArray[2].bot ='/images/33.png';
imgArray[2].width = 135;
imgArray[2].height = 146;

imgArray[3] = new Image();
imgArray[3].src = './images/4.png';
imgArray[3].bot ='/images/44.png';
imgArray[3].width = 150;
imgArray[3].height = 140;

imgArray[4] = new Image();
imgArray[4].src = './images/Pikachu.png';
imgArray[4].bot ='/images/pikachu_.png';
imgArray[4].width = 144;
imgArray[4].height = 130;

imgArray[5] = new Image();
imgArray[5].src = './images/6.png';
imgArray[5].bot ='/images/66.png';
imgArray[5].width = 196;
imgArray[5].height = 196;

console.log(imgArray[5].bot)

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
let imagePositions = [
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
  troue.beginFill(0xfffff, 0.8);
  troue.drawEllipse(0, 0, 70, 20);
  troue.endFill();
  troue.position.x = trouePositions[i].x;
  troue.position.y = trouePositions[i].y-5;
  app.stage.addChild(troue);
}
// Création des trous légèrement plats
let randomAnimal;
let animalsArray = [null, null, null, null, null, null, null, null,null];
let choixAnimals=0;
for (let i = 0; i < trouePositions.length; i++) {
  let troue = new PIXI.Graphics();
  troue.beginFill(0x412E1A);
  troue.drawEllipse(0, 0, 70, 20);
  troue.endFill();
  troue.position.x = trouePositions[i].x;
  troue.position.y = trouePositions[i].y;
  app.stage.addChild(troue);
}

function createAnimal(indexTrou){
  randomAnimal = Math.floor(Math.random() * imgArray.length);
  var landscapeTexture = PIXI.Texture.from(imgArray[randomAnimal].src);
  // console.log(landscapeTexture);
  var texture2 = new PIXI.Texture(landscapeTexture, new PIXI.Rectangle(0, 0, imgArray[randomAnimal].width , imgArray[randomAnimal].height));
  var sprite_image = new PIXI.Sprite(texture2);
  sprite_image.holeIndex = indexTrou
  animalsArray[indexTrou] = (sprite_image);
  // sprite_image.index = indexTrou;
  sprite_image.anchor.x = 0;
  sprite_image.anchor.y = 0;
  sprite_image.position.x = imagePositions[indexTrou].x - 50;
  sprite_image.position.y = imagePositions[indexTrou].y - 90;

  sprite_image.width = 100;
  sprite_image.height = 96;

  app.stage.addChild( sprite_image );
}


// Delete clicked animal
function smashAnimal() {
  this.scale.x *= 1.25;
  this.scale.y *= 1.25;
  // var spriteIndex = animalsArray.indexOf(this);
  // spriteIndex= this.index;
  // console.log(spriteIndex);
  // animalsArray.fill(null, spriteIndex, spriteIndex + 1);
  console.log(this.holeIndex);
  animalsArray[this.holeIndex] = null;
  app.stage.removeChild(this);
}

// Boucle de rendu
function gameLoop() {
  for(let checkHole=0; checkHole<trouePositions.length; checkHole++){
    // On vérifie s'il y a deja un animal dans le trou n° checkHole
    if(animalsArray[checkHole]== null){
      if(Math.random() * 100 > 99){
        createAnimal(checkHole);
        console.log(checkHole);
      }
    }
  }
  // animalsArray[checkHole].y -= 1;

  for(choixAnimals = 0; choixAnimals<animalsArray.length; choixAnimals++){
    if(animalsArray[choixAnimals] != null){
      // console.log(choixAnimals);
      animalsArray[choixAnimals].eventMode = 'dynamic';
      animalsArray[choixAnimals].cursor = 'pointer';
      animalsArray[choixAnimals].on('click', smashAnimal);
      app.stage.addChild(animalsArray[choixAnimals]);
      // console.log(animalsArray[choixAnimals]);
    }
  }
  requestAnimationFrame(gameLoop);
  // Mise à jour du jeu
  // ...

  // Rendu du jeu
  app.renderer.render(app.stage);
}
gameLoop();

