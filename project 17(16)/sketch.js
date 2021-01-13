var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var player1 , player2 ,player3, pinkCG , redCG , yellowCG;
var oppPink1Img , oppPink2Img , oppYellow1Img, oppyellow2Img , oppRed1Img , oppRed2Img;
var bellsound;
var gameover , cyclist;
var obb1 , obb2 , obb3 , obg1 , obg2 , obg3 , obi1 , obi2 , obi3; 

var END  = 0;
var PLAY = 1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png")
   oppPink2Img = loadAnimation("opponent3.png")
  
  oppYellow1Img  = loadAnimation("opponent4.png","opponent5.png")
  oppYellow2Img = loadAnimation("opponent6.png")
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png")
  oppRed2Img = loadAnimation("opponent9.png")

  bellsound = loadSound("sound/bell.mp3")
  
  gameover = loadImage("gameOver.png")
  
  obi1 = loadImage("obstacle1.png")
  obi2 = loadImage("obstacle2.png")
  obi3 = loadImage("obstacle3.png")
}

function setup(){
  
createCanvas(660,300);
  
// Moving background
background=createSprite(100,150);
background.addImage(pathImg);
background.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.05;
  
  cyclist=createSprite(300,150,20,20)
  cyclist.addImage(gameover)
  cyclist.visible=false;
   pinkCG = createGroup();
   redCG  = createGroup(); 
   yellowCG = createGroup();
   
  obg1 = createGroup();
  obg2 = createGroup();
  obg3 = createGroup();
}

function draw() {
 
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,400,30);
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
  
    distance = distance + Math.round(getFrameRate()/50)
    
   
    
    background.velocityX = -(6+2*distance/150)
    pinkCyclists.velocityX = -(6+2*distance/150)
    redCyclists.velocityX = -(6+2*distance/150)
    yellowCyclists.velocityX = -(6+2*distance/150)
    ob1.velocityX = -(6+2*distance/150)
    ob2.velocityX = -(6+2*distance/150)
    ob3.velocityX = -(6+2*distance/150)
    
    fill("white")
    text("Press spacebar to play bell sound",80,20)
    
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(background.x < 0 ){
    background.x = width/2;
  }
    
    if(keyDown("space")){
      bellsound.play();
    }
    
    var select_oppPlayer = Math.round(random(1,4));
    
    if (World.frameCount%150 === 0){       
     if(select_oppPlayer == 1){
        pinkCyclists();
     } else if (select_oppPlayer == 2){
        yellowCyclists();
       } else {
         redCyclists();
         }
     } 
    
    if (World.frameCount%250 === 0){
      if(select_oppPlayer == 1){
        ob1();
      }else if (select_oppPlayer == 2){
        ob2();
      }else{
        ob3();
      }
    }
   
    if(mainCyclist.collide(pinkCG)||mainCyclist.collide(yellowCG)||mainCyclist.collide(redCG)||mainCyclist.collide(obg1)||mainCyclist.collide(obg2)||mainCyclist.collide(obg3)){
      gameState=END;
    }
  }  
  if (gameState===END){
  text("press up arrow key to restart",300,50)
    
    background.velocityX=0;
    cyclist.visible=true;
    mainCyclist.visible=false;
    pinkCG.destroyEach();
    redCG.destroyEach();
    yellowCG.destroyEach();
    obg1.destroyEach();
    obg2.destroyEach();
    obg3.destroyEach();
    cyclist.display();
    mainCyclist.display();
    if (keyDown("UP_ARROW")){
      reset();
    }
    
  }  
}

function pinkCyclists(){
  player1 = createSprite(1100,Math.round(random(50,250)),10,10);
  player1.scale=0.05;
  player1.addAnimation("opp1",oppPink1Img);
  player1.setLifetime=300;
  player1.velocityX=-3;
  pinkCG.add(player1);
  console.log("p")
}

function yellowCyclists(){
  player2 = createSprite(1300,Math.round(random(50,250)),10,10)
  player2.scale=0.05;
  player2.addAnimation("opp2",oppYellow1Img)
  player2.setLifetime=300;
  player2.velocityX=-3;
  yellowCG.add(player2)
  console.log("y");
}

function redCyclists(){
  player3 = createSprite(1500,Math.round(random(50,250)),10,10)
  player3.scale = 0.05;
  player3.addAnimation("opp3",oppRed1Img)
  player3.setLifetime = 300;
  player3.velocityX=-3;
  redCG.add(player3)
  console.log("r");
}

function reset (){
  gameState = PLAY;
  cyclist.visible = false;
  pinkCG.destroyEach();
  redCG.destroyEach();
  yellowCG.destroyEach();
  distance = 0;
  mainCyclist.y = World.mouseY;
  mainCyclist.x = 70;
  mainCyclist.visible=true;
  frameRate=0;
  obg1.destroyEach();
  obg2.destroyEach();
  obg3.destroyEach();
}

function ob1 (){
  obb1 = createSprite(1600,Math.round(random(50,250)),10,10)
  obb1.scale=0.07;
  obb1.addImage(obi1)
  obb1.setLifetime=500;
  obb1.velocityX=-4;
  obg1.add(obb1);
  console.log("O1")
}

function ob2 (){
  obb2 = createSprite(1600,Math.round(random(50,250)),10,10)
  obb2.scale=0.07;
  obb2.addImage(obi2)
  obb2.setLifetime=500;
  obb2.velocityX=-4;
  obg2.add(obb2);
  console.log("O2")
}

function ob3 (){
  obb3 = createSprite(1600,Math.round(random(50,250)),10,10)
  obb3.scale=0.07;
  obb3.addImage(obi3)
  obb3.setLifetime=500;
  obb3.velocityX=-4;
  obg3.add(obb3);
  console.log("O3")
}