// The main ideas of further development I implemented are the below:
//-Keep score of how many asteroids you have hit.
//-Make the program get progressively harder by spawning asteroids more frequently as time goes by.
//-Create thrusters effect
//
//However, I also customised the look of the game to my taste.

var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var c1, c2; // MY CODE - colour variables for sky gradient effect
var starLocs = [];

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
	
}

//////////////////////////////////////////////////
function draw() {
//  background(0);
push();
  	c1 = color(25,0,51);
	c2 = color(102,0,51);
	setGradient(0, 0, width, height, c1, c2);
	pop();
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();
	
  asteroidPoints(); //MY CODE - Calling the function which displays the number of asteroids destroyed - code at the bottom

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(102,178,255, 90); // My modification - change of colour and transparency value
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(0,41,82); // My modification - change of colour
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    // START OF MY CODE
	//spaceship-2-asteroid collisions
	for (var i=0; i<asteroids.locations.length; i++){
		if (isInside(asteroids.locations[i], asteroids.diams[i]/2, spaceship.location, spaceship.size/2)){
			gameOver();
		}
	}

    //asteroid-2-earth collisions
    for (var i=0; i<asteroids.locations.length; i++){
		if (isInside(asteroids.locations[i], asteroids.diams[i]/2, earthLoc, earthSize.x/2)){
			gameOver();
		}
	}

    //spaceship-2-earth
    if (isInside(spaceship.location, spaceship.size/2, earthLoc, earthSize.x/2)){
		gameOver();
	}
	
    //spaceship-2-atmosphere
    if (isInside(spaceship.location, spaceship.size/2, atmosphereLoc, atmosphereSize.x/2)){
		spaceship.setNearEarth();
	} 
	

    //bullet collisions
	for (var j=0; j<spaceship.bulletSys.bullets.length; j++){
		for (var i=0; i<asteroids.locations.length; i++){
			if (isInside(asteroids.locations[i], asteroids.diams[i]/2, 
						 spaceship.bulletSys.bullets[j], spaceship.bulletSys.diam)){
				asteroids.destroy(i);
			}
		}
	}//END OF MY CODE
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // START OF MY COD
	if (dist(locA.x, locA.y, locB.x, locB.y) < (sizeA + sizeB)){
		return true;
		}
	else{
		return false;
	} //END OF MY CODE
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2);
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){	
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  for (var i=0; i<starLocs.length; i++){
	size = random(1, 3); //MY CODE
	shade = random (195, 255); //MY CODE 
	fill(255,255,shade); //Modification on stars colour to create random light shades of yellow
	rect(starLocs[i].x, starLocs[i].y,size,size); //Modification on stars size to create flickering effect
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
//////////////////////////////////////////////////

//MY CODE
//function that displays number of destroyed asteroids on bottom of the screen
function asteroidPoints(){
	fill(255, 255, 204);
	strokeWeight(3);
	stroke(255, 153, 204);
	rect(width/2 -70, height -60, 140, 40, 12);
	noStroke();
	textSize(20);
	textAlign(CENTER);
	textStyle(BOLD);
	fill(0, 51, 102);
	text('Score:  ' + asteroids.destroyedAsteroids, width/2, height -34);
}

// function that is used to create a gradient effect in the sky/background
function setGradient(x, y, w, h, c1, c2){
	noFill();
    for (var i = y; i <= y+h; i++) 
	{
		var inter = map(i, y, y+h, 0, 1);
		var c = lerpColor(c1, c2, inter);
		stroke(c);
		line(x, i, x+w, i);
    }
}
// END OF MY CODE