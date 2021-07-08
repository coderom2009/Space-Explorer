var rocket, rocket_Img,rocket_Img_Broken
var bG, bG_Img;
var alien_img,
  asteriod_Img,
  blackHole_Img,
  sun_Img,
  fuel_img,
  obj,
  objGroup,
  fuel,
  sound,
  restart,
  restart_Img,
  help_img_1,
  help_img_2,
  help,
  help_img_3,
  help_img_4,
  help_img_5;
var invisible;
var left = 100;
var score = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var s, helperGroup,invisibleW,bG1,m

var helper1;
function preload() {
  rocket_Img = loadImage("Space_shuttle.png");
  bG_Img = loadImage("Space_Img.png");
  alien_img = loadAnimation("ufo1.png", "ufo2.png", "ufo3.png", "ufo4.png");
  blackHole_Img = loadImage("black_hole_img.png");
  sun_Img = loadImage("Gas Planet.png");
  asteriod_Img = loadImage("Asteriod.png");
  fuel_img = loadImage("fuel.png");
  sound = loadSound("NFfORqJ8WWG-z-0-y-the-future-bass-5024.mp3");
  restart_Img = loadImage("restart.png");
  help_img_1 = loadImage("F_1.png");
  help_img_2 = loadImage("F_2.png");
  help_img_3 = loadImage("F_3.png");
  help_img_4 = loadImage("F_4.png");
  help_img_5 = loadImage("F_5.png");
  rocket_Img_Broken = loadImage("Space_shuttle_broken.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  bG1 = createSprite(0,0);
  bG1.addImage("bG12", bG_Img);
  bG1.scale = 0.6;
  bG1.visible = false
  
  bG = createSprite(1200, (bG1.height-windowHeight)/1.9);
  bG.addImage("bG", bG_Img);
  bG.scale = 0.6;
  bG.velocityX = -0.5;
  
  rocket = createSprite(140, windowHeight / 2);
  rocket.addImage("rocket",rocket_Img );
  rocket.scale = 1;
  rocket.debug = false;
  rocket.setCollider("obb", 10,25, 260, 50,3);
  
  objGroup = new Group();
  helperGroup = new Group();
  objGroup.debugEach = true;

  restart = createSprite(windowWidth / 2, windowHeight / 2);
  restart.addImage("restart", restart_Img);
  restart.scale = 0.25;
  restart.visible = false;
  restart.debug = false;
  restart.setCollider("circle", 0, 0, 290);

  help = createSprite(windowWidth / 2, windowHeight - 100);
  help.addImage("1", help_img_1);
  help.scale = 0.3;
fill("red")
  
  //rocket.x = mouseX;
  //rocket.y = mouseY;
 
}

function draw() {
  background("black");

  //text("Score = " + score, windowWidth / 2, 500);

  if (gameState === PLAY) {
    rocket.addImage("rocket",rocket_Img );
   //rocket.x = mouseX;
  if(mouseY<windowHeight-30&&mouseY>50){
    rocket.y = mouseY
    m = rocket.y = mouseY;
  }
    //sound.loop();

    if (bG.x < 850) {
      bG.x = 1200;
    }

    bG.velocityX = -0.5;

    if (objGroup.isTouching(rocket) || left === 0) {
      gameState = END;
      objGroup.setVelocityEach = 0;
    }

    objGroup.depth = bG.depth;
    objGroup.depth = objGroup.depth + 1;
    //score = score + Math.round(getFrameRate() / 60);
    score = score +0.5
    //left = Math.round(100 - score / 50);
    left = left - 0.01;
    life123();
    fuelF();
    obstacles();
    

    helperGroup.setVelocityEach = -2;
    restart.visible = false;
    help.depth = bG.depth;
    help.depth = help.depth + 1;
    help.depth = objGroup.depth
    help.depth = help.depth + 3
    if (helperGroup.isTouching(rocket)) {
      left = 100;
      helperGroup.destroyEach();
    }
    helperGroup.setVelocityEach = -2;
    help.depth = obj
    help.depth = help.depth+2
    
    
  } else if (gameState === END) {
    rocket.addImage("rocket",rocket_Img_Broken );
    //rocket.x =! mouseX;
    rocket.y = m ;
    restart123();
  }
  
  
  fill("white");
  textFont("Impact");
  textSize(30);
  textAlign(CENTER);
  text("Score = " + Math.round(score),windowWidth/2-100, 25);
  textAlign(CENTER);
  text("Fuel :" + Math.round(left) + " L", windowWidth / 2 + 100, 25);
  
  pro();
  
  
  
  
  
  console.log(m);
  diagram();
  
  createEdgeSprites();
  
  drawSprites();
}

function obstacles() {
  if (score % 75 === 0) {
    obj = createSprite(windowWidth + 150, random(70, windowHeight - 350));

    obj.velocityX = (-2 + score) / 1.5;
    obj.scale = 0.3;
    obj.setLifetimeEach = 200 + windowWidth / (-2 + score / 1.5);

    var f = Math.round(random(1, 2));
    switch (f) {
      case 1:
        obj.addAnimation("alien", alien_img);
        obj.velocityX = (-2 * score) / 50;
        break;
      case 2:
        obj.addImage("asteriod", asteriod_Img);
        obj.velocityX = (-3 * score) / 50;
        obj.scale = 0.02;
        break;

      default:
        break;
    }
    objGroup.add(obj);
    //rocket.depth = obj.depth;
    ///rocket.depth = rocket.depth + 1
  }
  
}

function fuelF() {
  if (score % 1500 === 0) {
    fuel = createSprite(windowWidth + 140, random(150, windowHeight - 350));
    fuel.scale = 0.3;
    fuel.velocityX = -1.1;
    fuel.setLifetimeEach = 200 + windowWidth / 1;
    var m = Math.round(random(1, 2));
    switch (m) {
      case 1:
        fuel.addImage("black", blackHole_Img);
        break;

      case 2:
        fuel.addImage("sun", sun_Img);
        break;
      default:
        break;
    }
    objGroup.add(fuel);
  }

}
function restart123() {
  restart.visible = true;
  bG.velocityX = 0;
  objGroup.setVelocityEachX = 0;
  objGroup.setLifetimeEach = -1;
  bG.depth = objGroup.depth;
  rocket.depth = bG.depth;
  bG.depth = bG.depth + 1;
  rocket.depth = rocket.depth + 1;
  restart.depth = bG.depth;
  restart.depth = restart.depth + 1;
 
  if (mousePressedOver(restart)) {
    gameState = PLAY;
    score = 0;
    objGroup.destroyEach();
    help_img_1 = loadImage("F_1.png");
    left = 100
  }
}
function diagram() {
  if (left > 80) {
    help.addImage("1", help_img_1);
  } else if (left > 60 && left < 80) {
    help.addImage("1", help_img_2);
  } else if (left > 40 && left < 60) {
    help.addImage("1", help_img_3);
  } else if (left > 20 && left < 40) {
    help.addImage("1", help_img_4);
  } else if (left === 0) {
    help.addImage("1", help_img_5);
  }
}

function life123() {
  if (score % 1500 === 0&&score>10) {
    //var helper1
    helper1 = createSprite(
      rocket.x,
      random(200, windowHeight - 220)
    );
    helper1.addImage("helper", fuel_img);
    helper1.scale = 0.1;
    helper1.setVelocityEach = -2;
    helperGroup.add(helper1);
  }
  helperGroup.setVelocityEach = -2;
}

function pro(){
  
  invisibleW = createSprite(windowWidth/2,windowHeight,windowWidth,2)
  invisibleW.visible = false
rocket.collide(invisibleW)
}
  

