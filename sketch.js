var gameState
var PLAY = 1
var END = 0

var tower, towerImg;
var door, doorImg;
var doorGroup, railGroup, ghostGroup;
var rail, railImg;
var invisRail, invisRailGroup;
var ghost, ghostImg;
var spooky;

var scoreBoard = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  railImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png")
  spooky = loadSound("spooky.wav")
}

function setup(){
  createCanvas(600, 600);
  
  spooky.loop();
  
  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  
ghost = createSprite(300, 300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3
  ghost.setCollider("rectangle", -20, 30, 170, 250)
 // ghost.debug = true
  
  doorGroup = new Group();
  railGroup = new Group();
  ghostGroup = new Group();
  invisRailGroup = new Group();
  
 
}

function draw(){
  background(0);
  
  gameState = PLAY
  

  
  
  if(gameState === PLAY) {
    
  
  if(tower.y > 600) {
    tower.y = 300;
  }
  
  console.log(frameCount);
  
  if(keyDown("SPACE")) {
    ghost.velocityY = -5
  }
  
  if(keyDown("LEFT_ARROW")) {
    ghost.x = ghost.x - 5
  }
  
   if(keyDown("RIGHT_ARROW")) {
    ghost.x = ghost.x + 5
  }
  
  ghost.velocityY = ghost.velocityY + 0.5
  
  doorSpawn();
  
  if(ghost.isTouching(railGroup)) {
    ghost.velocityY = 0
  }
  
  if(ghost.y > 600 || invisRailGroup.isTouching(ghost)) {
  
    
    gameState = END
  }

 } if(gameState === END){
   stroke("red");
   fill("red");
   textSize(50)
  text("GAME OVER", 150, 300)
  ghost.destroy();
  tower.destroy();
  doorGroup.destroyEach();
  railGroup.destroyEach();
  invisRailGroup.destroyEach();  ghost.destroy();
  tower.destroy();
  doorGroup.destroyEach();
  railGroup.destroyEach();
  invisRailGroup.destroyEach();
}
drawSprites();
}

function doorSpawn(){
  
  if(frameCount % 250 === 0){
  door = createSprite(Math.round(random(150, 400)),-50);
  door.addImage(doorImg);
  door.velocityY = 2;
    door.lifeTime = 350;
    doorGroup.add(door);
    
    rail = createSprite(door.x, 10)
    rail.addImage(railImg);
    rail.velocityY = 2;
    rail.lifeTime = 300;
    railGroup.add(rail);
    
    ghost.depth = door.depth;
    ghost.depth += 1;
     
    invisRail = createSprite(door.x, 13, 90, 10);
    invisRail.velocityY = 2;
    invisRail.visible = true;
   invisRailGroup.add(invisRail);
     }
}



