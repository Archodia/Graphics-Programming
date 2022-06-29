var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;

     // SUN
	push();
    translate(width/2, height/2);
	angle = speed/3;
	rotate(radians(angle));
    celestialObj(color(255,150,0), 200);
	pop();

	// EARTH
	push();
	angle = speed;
	translate(width/2 + 300*cos(radians(angle)), 
			  height/2 + 300*sin(radians(angle)));
	rotate(radians(angle*2));//angle (or else speed) adapted for rotation around the axis so that earth can make two ratations around itself during one rotation around the sun as per the gif of the task
	celestialObj(color(0,0,255), 80); 
	pop();
	
	// MOON
	push();
	angle = speed;
	translate(width/2 + 400*cos(radians(angle)), 
			  height/2 + 200*sin(radians(angle)));
	rotate(radians(-angle)); //angle (or else speed) chosen as per the gif of the task, i.e. moon rotating once around its axis while earth makes two rotations around itself
	celestialObj(color(255,255,255), 30); 
	
		//ASTEROID orbiting around the moon
		push();
		angle = speed*2
		translate(30*cos(radians(angle)), 
		30*sin(radians(angle)));
		rotate(radians(angle));
		celestialObj(color(204,0,204), 20); 
		pop();
	
    pop();
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}