var confLocs = [];
var confTheta = [];

var camSpeedSlider;
var camAngleSlider;
var waveSpeedSlider;
var boxesHeightSlider;
var boxesNumberSlider;
var perspectiveSlider;

var lightsCheckbox;
var lightsOn = false;

////////////////////////////////////////////////////////////////////////////

function setup(){
    createCanvas(900, 800, WEBGL);
	angleMode(DEGREES);
	
	//Step 5 - part a
	for (var i=0; i < 200; i++){
		var v = createVector(random(-500, 500),
							 random(-800, 0),
							 random(-500,500));
		confLocs.push(v);
		confTheta.push(random(0,360));	
	}//End of step 5 - part a
	
	//Step 7
	//Addition of sliders and a CheckBox - default values selected so as to reflect project's original requirements
	//slider to adjust camera rotation speed
	camSpeedSlider = createSlider(0.5, 12, 6, 0.1);
	camSpeedSlider.position(30, height + 5);
	camSpeedSlider.style('width', '100px');
	textBox1 = createInput("Camera Speed");
	textBox1.position(32, height + 30);
	textBox1.size(90);
	
	//slider to adjust camera angle
	camAngleSlider = createSlider(-799, 999, 0, 10);
	camAngleSlider.position(155, height + 5);
	camAngleSlider.style('width', '100px');
	textBox2 = createInput("Camera Angle");
	textBox2.position(160, height + 30);
	textBox2.size(85);
	
	//slider to adjust wave speed
	waveSpeedSlider = createSlider(0.4, 6.0, 1.6, 0.1);
	waveSpeedSlider.position(280, height + 5);
	waveSpeedSlider.style('width', '100px');
	textBox2 = createInput("Wave Speed");
	textBox2.position(290, height + 30);
	textBox2.size(75);
	
	//sliders to adjust boxes height (default values selected so as to not lose the wave effect at any point)
	boxesHeightSlider = createSlider(-300, 200, 0, 5);
	boxesHeightSlider.position(400, height + 5);
	boxesHeightSlider.style('width', '100px');
	textBox3 = createInput("Boxes Height");
	textBox3.position(407, height + 30);
	textBox3.size(80);
	
	//slider to adjust size of grid of boxes
	boxesNumberSlider = createSlider(0.7, 1.2, 1, 0.01);
	boxesNumberSlider.position(520, height + 5);
	boxesNumberSlider.style('width', '100px');
	textBox4 = createInput("Grid size");
	textBox4.position(540, height + 30);
	textBox4.size(53);
	
	//slider to adjust perspective (zoom in/out)
	perspectiveSlider = createSlider(40, 120, 80);
	perspectiveSlider.position(640, height + 5);
	perspectiveSlider.style('width', '100px');
	textBox5 = createInput("Zoom In/Out");
	textBox5.position(650, height + 30);
	textBox5.size(75);
	
	//Checkbox for turning lights off/on
	lightsCheckbox = createCheckbox("Party lights On", false);
	lightsCheckbox.position(780, height + 10)
	lightsCheckbox.changed(checkBoxChange);
	//End of step 7 customisations	
}

////////////////////////////////////////////////////////////////////////////

function draw(){
    background(250,235,215); //background changed to a more pleasant colour  - sea shell
	
	//Step 1 - camera (along with step 4 implementation)
	//step 7 customisation also implemented - camera speed and camera angle adjusted per slider values
	var cameraX = cos(frameCount/camSpeedSlider.value());
	var cameraZ = sin(frameCount/camSpeedSlider.value());
	if (camAngleSlider.value() <= 0){
		camera((800 + camAngleSlider.value()) * cameraX,
			   -600, 
			   (800 + camAngleSlider.value()) * cameraZ,
			   0, 0, 0, 
			   0, 1, 0);
	}
	else{
		camera(800 * cameraX, 
			   -600 + camAngleSlider.value(), 
			   800 * cameraZ,
			   0, 0, 0, 
			   0, 1, 0);
	}//End of step 1 - camera
	
	//Step 7 - own customisations
	perspective(perspectiveSlider.value()); //to zoom in/out
	
	if (lightsOn) { // condition for switching lights with Checkbox
		
	//directional lights that affect the grid of boxes and confetti(directions are from back to front and the opposite, as well as top to bottom) 
	directionalLight(255,20,200,0,1,0);
	directionalLight(255,255,0,0,0,-1);
	directionalLight(178,83,235,0,0,1);
	
	//pointlights shining from the two sides, affecting only the grid of boxes (they don't directly hit the surface of the confetti)
	pointLight(0,191,255,-600,0,0);
	pointLight(0,255,127,600,0,0);
	
	}
	else{
		//directional lights that affect the grid of boxes and confetti
		directionalLight(255,255,255,0,1,0);
		directionalLight(0,191,255,0,0,-1);
		directionalLight(0,191,255,0,0,1);
		directionalLight(255,20,147,-1,0,0);
		directionalLight(255,20,147,1,0,0);
	}
	//end of Step 7 - own customisations
	

	//Steps 1,2,3 - grid of boxes (elements of step 7 too - customisation)
	for (var i = - 400 * boxesNumberSlider.value();
		 i <=  400 * boxesNumberSlider.value(); 
		 i += 50){
		for (var j = - 400 * boxesNumberSlider.value();
			 j <= 400 * boxesNumberSlider.value();
			 j+=50){
			
			//normalMaterial(); //commented out to implement my own style
			specularMaterial(255,255,255);
			shininess(15); //shininess adapted to reduce a bit the reflection of white values
			stroke(0);
			strokeWeight(2);
			
			var distance = dist(i, 0, j, 0, 0, 0) + frameCount*waveSpeedSlider.value(); //step 7 - values adjust per slider
			var length = map(sin(distance), -1, 1, 100, 300 + boxesHeightSlider.value()); //step 7 - values adjust per slider
			push();

			translate(i, 0, j);
			box(50, length, 50);
			pop();
		}
	}//End of step 1 - grid of boxes
	
	//Step 7 - setting (only) the confetti to ambientMaterial
	push();
	ambientMaterial(255,255,255);
	confetti();
	pop();
	
}

////////////////////////////////////////////////////////////////////////////

//Step 5 - part b, confetti function
function confetti(){
	for (var i=0; i < confLocs.length; i++){
		push();
		noStroke();
		translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
		rotateX(confTheta[i]);
		plane(15,15);
		pop();
		
		//Step 6
		confLocs[i].y ++;
		confTheta[i] += 10;
		
		if (confLocs[i].y > 0){
			confLocs[i].y = -800;
		}//End of Step 6
	}
}//End of step 5 - part b

////////////////////////////////////////////////////////////////////////////

//Step 7 customisation - function for turning lights on and off
function checkBoxChange() {
    if (lightsCheckbox.checked()) {
		lightsOn = true;
	}
	else{
		lightsOn = false;
	}
}
