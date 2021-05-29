var backImage,backgr;
var player, player_running;
var ground,ground_img;
var gameOverImg,bananaImg;
var stoneImg, gameOver;
var banana,obstacle;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;
var bananasGroup,obstaclesGroup;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  gameOverImg = loadImage("gameOver.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
}

function setup() {
  createCanvas(1200,600);

  //making groups for bananas and obstacles
    obstaclesGroup = createGroup();
    bananasGroup = createGroup();
  
  

  backgr=createSprite(0,230,800,400);
  backgr.addImage(backImage);
  backgr.scale=1;
  backgr.x=backgr.width/2;
  backgr.velocityX=-(5 + 3* score/100);
  
  player = createSprite(100,480,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,480,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(600,350);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  
}

function draw() { 
  background(0);

  

  if(gameState===PLAY)
  {
    gameOver.visible = false;
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  bananas();
  obstacles();

    if(keyDown("space")&& player.y > 430) {
      player.velocityY = -25;
    }
    if(player.isTouching(bananasGroup))
      {
        bananasGroup.destroyEach();
        score = score +2;
       player.scale = player.scale + 0.02;
      }
      if(obstaclesGroup.isTouching(player)&&gameState===PLAY)
    {
        gameState = END;
        
        gameOver.visible = true;
        player.velocityY =  0;
        backgr.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        bananasGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        bananasGroup.setLifetimeEach(-1);
     }
  }
    
    player.velocityY = player.velocityY + 1.2;
    
    player.collide(ground);
   
    player.setCollider("circle",-2,2,100);
    
  

  drawSprites();

  stroke("black");
      textSize(45);
      fill("white")
      text("score :"+score,50,50);

  //creating reqired functions    
  function bananas()
  {
     if(frameCount % 180===0)
     {
      banana = createSprite(1250,300);
      banana.addAnimation("banana",bananaImg);
      banana.velocityX = -(5 + 3* score/100)
      banana.y = Math.round(random(350,250));
      banana.scale = 0.06;
      banana.lifetime = 400;
      bananasGroup.add(banana);
      }
   } 
   function obstacles()
  {
   if(frameCount % 120===0)
   {
     obstacle = createSprite(1250,480);
     obstacle.addAnimation("obstacle", stoneImg);
     obstacle.velocityX = -(5 + 3* score/100);
     obstacle.scale = 0.18; 
     obstacle.lifetime = 400;
     obstaclesGroup.add(obstacle);
   } 
  } 
}