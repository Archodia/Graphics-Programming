var imgs = [];
var avgImg;
var numOfImages = 30;
//variables for step 7 implementation
var randomIndex;
var lerpAmt = 0;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
	//Step 1
	for (var i = 0; i < numOfImages; i++){
		var filename = String("assets/"+i+".jpg")
		imgs[i] = loadImage(filename);
	}
}
//////////////////////////////////////////////////////////
function setup() {
    createCanvas(imgs[0].width*2, imgs[0].height); //step 2
    pixelDensity(1);
	
	avgImg = createGraphics(imgs[0].width, imgs[0].height); // step 3
	lerpImg = createGraphics(imgs[0].width, imgs[0].height); // step 7
	
	randomIndex = int(random(numOfImages)); //step 7 creating a random index for displaying a random photo upon loading, instead of imgs[0]
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
//	image(imgs[0], 0, 0); //step 2 - commented out to implement random photo display (per loading and pressing any key) per step 7 :
	randomImg = imgs[randomIndex];
	image(randomImg, 0, 0);
	
	for(var i = 0; i < imgs.length; i++){ // step 4
		imgs[i].loadPixels();
	}
	
	avgImg.loadPixels(); //step 4
	
	//Step 5:
	for(var y = 0; y < imgs[0].width; y++){
		for(var x = 0; x < imgs[0].height; x++){
			
			var index = ((imgs[0].width * y) + x) * 4;
			
//			avgImg.pixels[index + 0] = 255;
//			avgImg.pixels[index + 1] = 0;
//			avgImg.pixels[index + 2] = 0; // commented out as unnessacary after implementing step 6
			avgImg.pixels[index + 3] = 255;
			
			//Step 6:
			var sumR = 0;
			var sumG = 0;
			var sumB = 0;
			
			for (var i = 0; i < imgs.length; i++){
				sumR = sumR + imgs[i].pixels[index + 0];
				sumG = sumG + imgs[i].pixels[index + 1];
				sumB = sumB + imgs[i].pixels[index + 2];
			}
			
//			avgImg.pixels[index + 0] = sumR / imgs.length; //numOfImages could be used instead of imgs.length 
//			avgImg.pixels[index + 1] = sumG / imgs.length;
//			avgImg.pixels[index + 2] = sumG / imgs.length; 
			// above part commented out to implement step 7 extension
			//end of step 6
			
			//step 7 adaptation - transition between the randomly selected image and the average image based on the mouseX value
			avgImg.pixels[index + 0] = lerp(sumR / imgs.length, randomImg.pixels[index + 0],lerpAmt);
			avgImg.pixels[index + 1] = lerp(sumG / imgs.length, randomImg.pixels[index + 1], lerpAmt);
			avgImg.pixels[index + 2] = lerp(sumG / imgs.length, randomImg.pixels[index + 2], lerpAmt);	
		}
	}
	
	avgImg.updatePixels();
	image(avgImg, width/2, 0);
	
	//step 7 customisation - show instructions below canvas
	textBox1 = createInput("Press Spacebar to change the photo shown on the left. ");
	textBox1.position(width/2 - 163, height + 30);
	textBox1.size(325);
	
	textBox2 = createInput("Move mouse to left to see the average face. Move mouse to the right to blend average and randomly selected face.");
	textBox2.position(width/2 - 340, height + 60);
	textBox2.size(680);
	
	noLoop();
	//End of step 5

}

function keyPressed(){ //step 7 - change randomly selected image upon pressing the spacebar
	
	if (keyCode == 32){
		randomIndex = int(random(numOfImages));
		loop();
	}
}

function mouseMoved(){ //step 7 - transition between the randomly selected image and the average image based on the mouseX value
	
	lerpAmt = map(mouseX, imgs[0].width, imgs[0].width*2, 0, 1); // values chosen so that when mouseX has 0 or very low values the right side shows the avgImg and as the mouse moves to the right the avgImg blends with the randomly selected one - the opposite effect could be applied by initialising lerpAmt to 1 and lerpAmt = map(mouseX, 0, width, 1, 0);
	lerpAmt = constrain(lerpAmt, 0, 1); // added to ensure that values will remain between 0 and 1 even when mouse goes wider than canvas
	loop();
}
