
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, groundImage
var score=0,groundInv;
var monke_stop
var survivalTime
gameState="Play"

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  monke_stop=loadAnimation("monkey_0.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 groundImage= loadImage("ground.png");
}



function setup() {
   createCanvas(600, 400);
  


  var survivalTime=0;
  
  groundInv = createSprite(400,350,1200,10);
  groundInv.visible=false;
  
  ground = createSprite(200,200,600,10);
  ground.velocityX=-4;
  //groundImage.height=100;
  ground.addImage(groundImage);
  ground.scale=1;
  //ground.setCollider()
  ground.x=ground.width/2;
  ground.y=400
  console.log(ground.y)

  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("monkey", monke_stop);
   monkey.scale=0.14
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background(213,243,241);
  
    if(gameState==="Play"){
      survivalTime=Math.round(frameCount/getFrameRate());
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
    if(keyDown("space")&&monkey.y> 250) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(groundInv);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
    if(obstaclesGroup.isTouching(monkey)){
      ground.velocityX = 0;
        monkey.velocityY = 0;
      FoodGroup.destroyEach();
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    monkey.changeAnimation("monkey",monke_stop);
        
    
    }
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+1;
  }
}
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time: "+ survivalTime, 100,50);
}



function spawnFood() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
     banana.addImage(bananaImage);
     banana.scale=0.1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;    
    obstacle.lifetime = 300;
  obstacle.setCollider("circle",0,0,10);
    obstaclesGroup.add(obstacle);
  }
}
