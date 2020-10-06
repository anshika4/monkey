
var play=1;
var end=0;
var gamestate=play
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score=0;
var ground,ground_running
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  var survivalTime=0;
  
  monkey=createSprite(30,200);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  foodGroup= new Group();
  obstacleGroup= new Group();
  
   drawSprites();
  
}



function draw() {
  background("red");
  
     if(gamestate===play){
    
     if(ground.x<0){
     ground.x=ground.width/2;  
     }
    
    
     monkey.collide(ground);
     spawnObstacle();
     spawnfood();

    if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();  
    survivalTime =  survivalTime+3;
    }
  
    if(keyDown("space")){
    monkey.velocityY=-14  ;
    }
    
    monkey.velocityY=monkey.velocityY+0.8;
    
    if(obstacleGroup.isTouching(monkey)){
    gamestate=end;
    }
    }
  
    if(gamestate===end){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);  
    foodGroup.setVelocityXEach(0);  
    obstacleGroup.setLifetimeEach(-1);  
    foodGroup.setLifetimeEach(-1);    
    }
  
    monkey.collide(ground);
   
    drawSprites();
  
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: "+ score, 500,50);
  
  
  drawSprites();
  stroke("black");
  textSize(20)
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);

}

function spawnfood(){
  if(frameCount%80===0){
  banana=createSprite(400,150);
  banana.y = random(120,200);  
  banana.velocityX=-4;  
  banana.lifetime=300;
  banana.scale=0.1;  
  banana.addImage(bananaImage);  
  banana.setCollider("circle",0,0,150);  
  foodGroup.add(banana);  
  }
  }

function spawnObstacle(){
if(frameCount%300===0) { 
 obstacle=createSprite(800,320);
 obstacle.velocityX=-5;
 obstacle.scale=0.15; 
 obstacle.lifetime=300;
 obstacle.addImage(obstacleImage);
 obstacle.setCollider("circle",0,0,150);
 obstacleGroup.add(obstacle); 
}
}