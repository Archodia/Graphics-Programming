////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(61,61,0);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // MY CODE
  propeller = Bodies.rectangle(150, 480, 200, 15, {
							   isStatic: true, 
							   angle: angle});
  World.add(engine.world, [propeller]);//END OF MY CODE
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  //MY CODE
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;
  noStroke();
  fill(192);
  drawVertices(propeller.vertices);//END OF MY CODE
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX,mouseY, 20, {
							friction: 0,
							restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //MY CODE
  for (var i = 0; i < birds.length; i++){
	noStroke();
	fill(color(220, 60, 60)); 
	drawVertices(birds[i].vertices);
	if (isOffScreen(birds[i])){ 
		World.remove(engine.world, birds[i]);
		birds.splice(i, 1);
		i--;
	}
  }//END OF MY CODE
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //MY CODE 
  for (var i = 0; i < 3; i++){ 
	  for (var j = 0; j < 6; j++){
		  var towerBox = Bodies.rectangle(width - (150 + i*80), 
										  height - (60 + j*80), 
										  80, 
										  80);
		  World.add(engine.world, [towerBox]);
		  boxes.push(towerBox);
//		  My initial code creating random green colours, as per rubric:
//		  colors.push(color(random(0, 25), random(51, 255), random(0, 38)));
		  
//		  Replaced with the code below, creating a more fun range of colours:
		  if (random(1) < 0.1){
			  colors.push(color(random(204, 255), 0, random(204, 255), 200));
		  }
		  else if (random(1) > 0.9){
			  colors.push(color(255, 255, random(0, 102)));
		  }
		  else{
			  colors.push(color(random(0, 255), random(0, 255), random(0, 255)));
		  }//End of modification
	  }
  }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //MY CODE
  for (var i = 0; i < boxes.length; i++){
	  noStroke();
	  fill(colors[i]);
	  drawVertices(boxes[i].vertices)
      
	  if (isOffScreen(boxes[i])){
		  World.remove(engine.world, boxes[i]);
		  boxes.splice(i, 1);
		  colors.splice(i, 1);
		  i--;
	  }
	  if (boxes.length == 0){
			  youWon();
	  }
  }	
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//MY CODE
  slingshotBird = Bodies.circle(200, 200, 20, { 
	  friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
  slingshotConstraint = Constraint.create({
	  pointA: { x: 200, y: 180 },
	  bodyB: slingshotBird,
	  pointB: { x: 0, y: 0 },
	  stiffness: 0.01,
	  damping: 0.0001});
  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
/////////////////slingshotConstraint///////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // MY CODE
  noStroke();
  fill(255, 255, 0);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}

//MY CODE - obstacle functions
////////////////////////////////////////////////////////////////
function setupObstacle(){
	obstacle = Bodies.polygon(500, 50, 6, 40, {
					friction: 0.1,
					restitution: 0.5 });
	World.add(engine.world, [obstacle]);
}
//////////////////////////////////////////////////////////////////
////updates and draws the obstacle
function drawObstacle(){
	push();
	stroke(102, 0, 102);
	strokeWeight(4);
	fill(153, 0, 153);
	drawVertices(obstacle.vertices);
	Body.rotate(obstacle, -0.02);
	Body.setVelocity(obstacle, {x:0, y: 0.1});
	if (currentTime >= 25){
		Body.setVelocity(obstacle, {x:-0.2, y: 0});
	}
	pop();
}//END OF MY CODE