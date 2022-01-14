var bg,bgImg;
var player, shooterImg, shooter_shooting,zombieImage;
var score = 0
var life =  3
var heartImage1, heartImage2, heartImage3;
var gameState = "fight"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
zombieImage = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
heartImage1= loadImage("assets/heart_1.png")
heartImage2= loadImage("assets/heart_2.png")
heartImage3= loadImage("assets/heart_3.png")

}

function setup() {
bulletGroup = new Group()
zombieGroup = new Group()
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   heart1 = createSprite(displayWidth-120,40,20,20)
   heart1.addImage(heartImage1)
   heart1.scale = 0.4
   heart1.visible = false

   heart2 = createSprite(displayWidth-120,40,20,20)
   heart2.addImage(heartImage2)
   heart2.scale = 0.4
   heart2.visible = false

   heart3 = createSprite(displayWidth-120,40,20,20)
   heart3.addImage(heartImage3)
   heart3.scale = 0.4
   
}


function draw() {
  background(0); 
  if(gameState === "fight"){
    if(life === 3){
      heart3.visible = true
      heart2.visible = false
      heart1.visible = false
    }
    if(life === 2){
      heart3.visible = false
      heart2.visible = true
      heart1.visible = false
  }
  if(life === 1){
    heart3.visible = false
    heart2.visible = false
    heart1.visible = true
}
if(life === 0){
  gameState = "lost"
}
  if(score === 20){
    gameState = "Winner"
  }
  
createZombie()
if(zombieGroup.isTouching(bulletGroup)){
  for(var i = 0; i < zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()
      score = score+2
    }
  }
}
if(zombieGroup.isTouching(player)){
  for(var i = 0; i < zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
      life = life-1
}
  }
}
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet = createSprite(displayWidth-1150,player.y-30,20,10)
 bullet.velocityX = 20
  player.addImage(shooter_shooting)
 bulletGroup.add(bullet)
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
  }
drawSprites()
  
textSize(20)
fill("white")
text("score = "+score,displayWidth -200,displayHeight/2-300)
text("life = "+life,displayWidth -200,displayHeight/2-270)
if(gameState === "lost"){
  textSize(100)
  fill("red")
  text("You Lost :(",400,400)
  player.destroy()
  zombieGroup.destroyEach()
  
}
if(gameState === "Winner"){
  textSize(100)
  fill("red")
  text("You Won :)",400,400)
  zombieGroup.destroyEach()
  
}
}
function createZombie(){
  if(frameCount%100 === 0){
    zombie = createSprite(random(500,1100),random(100,500),40,40)
zombie.addImage(zombieImage)
zombie.velocityX = -3;
zombie.scale = 0.15
zombie.lifetime = 400
zombieGroup.add(zombie)
  }
}
