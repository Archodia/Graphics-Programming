class AsteroidSystem {

  //creates arrays to store each asteroid's data
  constructor(){
    this.locations = [];
    this.velocities = [];
    this.accelerations = [];
    this.diams = [];
	this.destroyedAsteroids = 0; //MY CODE - points for destroyed asteroid
	this.timeStep = 10; //MY CODE - time step for changing the spawn rate - 10 seconds
	this.nextChange = this.timeStep; //MY CODE - time of changing the spawn rate - initiated at 10 seconds
	this.spawnRate = 1; //MY CODE - variable for affecting the spawn rate
  }

  run(){
      this.timer();
	  this.spawn();
      this.move();
      this.draw();
  }

	
  // MY CODE - timer helper function that increases the spawnRate variable every 10 seconds
  timer(){
	if (millis()/1000 > this.nextChange){
		this.nextChange = round(millis()/1000) + this.timeStep;
		this.spawnRate ++;
	}  
  }	//END OF MY CODE

  // spawns asteroid at random intervals
  spawn(){
    if (random(1)<0.01*this.spawnRate){ // My modification - this.spawnRate used as a coefficient of 0.01 to gradually increase its value, thus gradually increasing the frequency of the comparison being true
      this.accelerations.push(new createVector(0,random(0.1,1)));
      this.velocities.push(new createVector(0, 0));
      this.locations.push(new createVector(random(width), 0));
      this.diams.push(random(30,50));
    }
  }

  //moves all asteroids
  move(){
    for (var i=0; i<this.locations.length; i++){
      this.velocities[i].add(this.accelerations[i]);
      this.locations[i].add(this.velocities[i]);
      this.accelerations[i].mult(0);
    }
  }

  applyForce(f){
    for (var i=0; i<this.locations.length; i++){
      this.accelerations[i].add(f);
    }
  }

  //draws all asteroids
  draw(){
//    noStroke();// OLD TEMPLATE CODE - Not used
//    fill(200);// OLD TEMPLATE CODE - Not used
    for (var i=0; i<this.locations.length; i++){
		c1 = color((16+this.diams[i]*2.6)); //MY CODE - adapting colour as per size
		stroke(48);//MY CODE
		strokeWeight(3);//MY CODE
		fill(c1);//MY CODE
		ellipse(this.locations[i].x, this.locations[i].y, this.diams[i], this.diams[i]);
    }
  }

  //function that calculates effect of gravity on each asteroid and accelerates it
  calcGravity(centerOfMass){
    for (var i=0; i<this.locations.length; i++){
      var gravity = p5.Vector.sub(centerOfMass, this.locations[i]);
      gravity.normalize();
      gravity.mult(.001);
      this.applyForce(gravity);
    }
  }

  //destroys all data associated with each asteroid
  destroy(index){
    this.locations.splice(index,1);
    this.velocities.splice(index,1);
    this.accelerations.splice(index,1);
    this.diams.splice(index,1);
	this.destroyedAsteroids ++; //MY CODE - increasing the asteroid points every time an asteroid is destroyed
  }
}
