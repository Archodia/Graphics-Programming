class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
   //MY CODE - Thrusters effect 
    if (keyIsDown(LEFT_ARROW)){
		noStroke();
		fill(255, 153, 51);
		triangle(this.location.x + random(40,50), this.location.y,
				this.location.x + 20, this.location.y - 5,
				this.location.x + 20, this.location.y + 5); 
    }
    if (keyIsDown(RIGHT_ARROW)){
		noStroke();  
		fill(255, 153, 51);
		triangle(this.location.x - random(40,50), this.location.y,
				this.location.x - 20, this.location.y - 5,
				this.location.x - 20, this.location.y + 5);
    }
    if (keyIsDown(UP_ARROW)){
		noStroke();  
		fill(255, 153, 51);
		triangle(this.location.x - 5, this.location.y + 20,
				this.location.x + 5, this.location.y + 20,
				this.location.x, this.location.y + random(40,50));
    }
    if (keyIsDown(DOWN_ARROW)){
		noStroke();
		fill(255, 153, 51);
		triangle(this.location.x - 5, this.location.y - 20,
				this.location.x + 5, this.location.y - 20,
				this.location.x, this.location.y - random(40,50));
    } //END OF MY CODE 
	  
	//Spaceship
	fill(204,0,0);
	stroke(0,0,204,200); //MY CODE
	strokeWeight(5); //MY CODE
//    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
//        this.location.x + this.size/2, this.location.y + this.size/2,
//        this.location.x, this.location.y - this.size/2);  // template code for drawing spaceship - replaced by below code
	ellipse(this.location.x, this.location.y, this.size - 5, this.size);
	strokeWeight(4);
	fill(255,255,102);  
	ellipse(this.location.x, this.location.y - 4, this.size/3, this.size/2);  
	ellipse(this.location.x - this.size/3.2, this.location.y, this.size/5, this.size/3);
    ellipse(this.location.x + this.size/3.2, this.location.y, this.size/5, this.size/3);
	  
  }

  move(){
      // START OF MY CODE
	  this.velocity.add(this.acceleration);
	  this.velocity.limit(this.maxVelocity);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
	  //END OF MY CODE
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
		  this.applyForce(createVector(-0.1, 0));
      }
      if (keyIsDown(RIGHT_ARROW)){
      // START OF MY CODE
		  this.applyForce(createVector(0.1, 0));
	  //END OF MY CODE
      }
      if (keyIsDown(UP_ARROW)){
      // START OF MY CODE
		  this.applyForce(createVector(0, -0.1));
	  //END OF MY CODE
      }
      if (keyIsDown(DOWN_ARROW)){
      // START OF MY CODE
		  this.applyForce(createVector(0, 0.1));
	  //END OF MY CODE
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    // START OF MY CODE
	this.applyForce(createVector(0, 0.05)); //"downwards-pointing" vector of strength 0.05 - gravity
	var friction = this.velocity.copy();
	friction.mult(-1);
	friction.normalize();
	friction.mult(1/30);
	this.applyForce(friction);
	//END OF MY CODE

  }
}
