// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var obstacle; //MY CODE - variable for new physics object, acting as obstacles
var angle=0;
var angleSpeed=0;
var canvas;
var c1, c2; //MY CODE - variables for sky colours
var timeLimit = 60; //MY CODE - variable for timelimit, equal to 60 seconds
var currentTime = 0; //MY CODE - variable for current time
var countDown; //MY CODE - variable for countdown
////////////////////////////////////////////////////////////
function setup() {
  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();
	
  setupObstacle(); //MY CODE - function creating an obstacle slowly dropping in front of the tower of boxes - code in physics.js
	
  timer(); //MY CODE - timer function - code below
}
////////////////////////////////////////////////////////////
function draw() {
  //MY CODE
  c1 = color(102, 178, 255);
  c2 = color(244, 255, 255);
  setGradient(0, 0, width, height, c1, c2);//END OF MY CODE - sky gradient effect instead of black background

  Engine.update(engine);

  drawGround();

  drawPropeller();

  drawTower();

  drawBirds();

  drawSlingshot();
	
  drawObstacle();//MY CODE - drawing obstacle
	
  timer(); //MY CODE - timer function - put inside draw function so that it's called in every frame - code below
	
  displayTimeLeft(); //MY CODE - function displaying time left on screen - code below
}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed(){
  if (keyCode == LEFT_ARROW){
    //MY CODE
	angleSpeed += 0.01;
  }
  else if (keyCode == RIGHT_ARROW){
    //MY CODE
	angleSpeed -= 0.01;
  }
}
////////////////////////////////////////////////////////////
function keyTyped(){
  //if 'b' create a new bird to use with propeller
  if (key==='b'){
    setupBird();
  }

  //if 'r' reset the slingshot
  if (key==='r'){
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

//**********************************************************************
//  MY CODE - HELPER FUNCTIONS 
//**********************************************************************
function setGradient(x, y, w, h, c1, c2){
	noFill();
    for (var i = y; i <= y+h; i++){
		var inter = map(i, y, y+h, 0, 1);
		var c = lerpColor(c1, c2, inter);
		stroke(c);
		line(x, i, x+w, i);
    }
}

// function detecting and displaying if player won
function youWon(){
  fill(255);
  textSize(70);
  textAlign(CENTER);
  text('You Won in ' + int(millis()/1000) + ' seconds!!!', width/2, height/2);
  noLoop();
}

// function detecting and displaying if game is over
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text('Game Over', width/2, height/2);
  noLoop();
}

function timer(){
	currentTime = int(millis()/1000);
	countDown = timeLimit - currentTime;
	if (countDown <= 0){
	    gameOver();
		countDown = 0;
	}
}

function displayTimeLeft(){
	fill(204, 255, 255);
	strokeWeight(3);
	stroke(102, 102, 255);
	rect(10, 10, 200, 30, 12);
	noStroke();
	textSize(18);
	textAlign(CENTER);
	textStyle(BOLD);
	fill(0, 51, 102);
	text('Time left:  ' + countDown + ' seconds', 110, 30);
}
//END OF MY CODE 

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
  var pos = body.position;
  return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}