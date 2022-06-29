// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var imgCopy; //variable to help combine different effects in draw function

var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
//my own custom matrix to use for the sketch filters:
var matrix2 = [
    [5, 4, 3, 4, 5],
    [4, 3, 2, 3, 4],
    [-3, -2, 1, 2, 3],
    [-4, -3, -2, -3, -4],
    [-5, -4, -3, -4, -5]
];

// checkboxes for turning on/off border and dark corners
var darkCornersCheckbox;
var whiteBorderCheckbox;
var darkBorderCheckbox;
var radialBlurFilterCheckbox;

//helper variables to assist with the filter changing
var earlyBirdFilterOn = true;
var sepiaFilterOn = false;
var radialBlurFilterOn = false;
var greyscaleFilterOn = false
var sketchFilterOn = false;
var sepiaSketchFilterOn = false;
var greySketchFilterOn = false;
var redFocusFilterOn = false;
var darkCornersOn = false;
var whiteBorderOn = false;
var darkBorderOn = false;

/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    
	createCanvas((imgIn.width * 2), imgIn.height);
	
	//Checkbox for turning dark corners on/off
	darkCornersCheckbox = createCheckbox("Dark Corners", false);
	darkCornersCheckbox.position(30, imgIn.height + 30)
	darkCornersCheckbox.changed(checkBoxChange);
	
	//Checkbox for turning white borders on/off
	whiteBorderCheckbox = createCheckbox("White border", false);
	whiteBorderCheckbox.position(30, imgIn.height + 60)
	whiteBorderCheckbox.changed(checkBoxChange);
	
	//Checkbox for turning dark borders on/off
	darkBorderCheckbox = createCheckbox("Dark border", false);
	darkBorderCheckbox.position(30, imgIn.height + 90)
	darkBorderCheckbox.changed(checkBoxChange);
	
	//Checkbox for turning earlyBirdFilter on/off
	radialBlurFilterCheckbox = createCheckbox("Radial Blur Filter", false);
	radialBlurFilterCheckbox.position(30, imgIn.height + 120)
	radialBlurFilterCheckbox.changed(checkBoxChange);
	
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(255);
    image(imgIn, 0, 0);
	var imgCopy = imgIn;
	
	//instructions placed under the photos
	textBox = createInput('Instructions:');
	textBox.position(imgIn.width/3 - 20, imgIn.height + 30);
	textBox.size(100);
	
	textBox1= createInput('EarlyBird filter is applied by default. Press one of the defined keys to select another one.');
	textBox1.position(imgIn.width/3 - 20, imgIn.height + 50);
	textBox1.size(550);
	textBox2 = createInput('For applying add ons, select a checkbox on the left.');
	textBox2.position(imgIn.width/3 - 20, imgIn.height + 70);
	textBox2.size(550);	
	textBox1.size(550);
	textBox3 = createInput('Do not select dark corners and radial blur filter with EarlyBirdFilter; they are already applied.');
	textBox3.position(imgIn.width/3 - 20, imgIn.height + 90);
	textBox3.size(550);	
	
	textBox4 = createInput('Keys:');
	textBox4.position(imgIn.width + 70, imgIn.height + 30);
	textBox4.size(40);
	
	textBox5 = createInput('Press:  1 for EarlyBird filter,   2 for Sepia filter,   3 for Greyscale filter,   4 for Sketch filter,');
	textBox5.position(imgIn.width + 70, imgIn.height + 50);
	textBox5.size(520);
	textBox6 = createInput('            5 for Sepia sketch filter,   6 for Grey sketch filter  and   7 for Red Focus filter');
	textBox6.position(imgIn.width + 70, imgIn.height + 70);
	textBox6.size(520);
	textBox7 = createInput('            To remove any filter and reset to original photo, press R.');
	textBox7.position(imgIn.width + 70, imgIn.height + 90);
	textBox7.size(520);

	
	// if earlyBirdFilterOn is true, show photo with this filter
	if (earlyBirdFilterOn){ 
		imgCopy = earlyBirdFilter(imgIn);
		image(imgCopy, imgIn.width, 0);
	}
	// if sepiaFilterOn is true, show photo with this filter
	else if(sepiaFilterOn){ 
		imgCopy = sepiaFilter(imgIn);
		image(imgCopy, imgIn.width, 0);
	}
	// if greyscaleFilterOn is true, show photo with this filter
	else if(greyscaleFilterOn){ 
		imgCopy = greyscaleFilter(imgIn);
		image(imgCopy, imgIn.width, 0);
	}
	// if sketchFilterOn is true, show photo with this filter
	else if(sketchFilterOn){ 
		imgCopy = sketchFilter(imgIn);
		image(imgCopy, imgIn.width, 0);
	}
	// if sepiaSketchFilterOn is true, show photo with this filter
	else if(sepiaSketchFilterOn){ 
		imgCopy = sepiaSketchFilter(imgIn);
		image(imgCopy, imgIn.width, 0);
	}
	// if greySketchFilterOn is true, show photo with this filter
	else if(greySketchFilterOn){ 
		imgCopy = greySketchFilter(imgIn);
		image(imgCopy, imgIn.width, 0);
	}
	// if redFocusFilterOn is true, show photo with this filter
	else if(redFocusFilterOn){ 
		imgCopy = redFocusFilter(imgIn);
		image(imgCopy, imgIn.width, 0);
	}
	else{ // if no filters are selected, show original photo
		image(imgIn, imgIn.width, 0);
	}
	//below effects can be added on top of previous filters, if any
	// if radialBlurFilterOn is true, add this on 
	if(radialBlurFilterOn){ 
		imgCopy = radialBlurFilter(imgCopy);
		image(imgCopy, imgIn.width, 0);
	}
	if(darkCornersOn){//add dark corners
		imgCopy = darkCorners(imgCopy);
		image(imgCopy, imgIn.width, 0);
	}
	if(whiteBorderOn){//add white borders 
		imgCopy = borderFilter(imgCopy);
		image(imgCopy, imgIn.width, 0);
	}
	if(darkBorderOn){//add dark borders 
		imgCopy = darkBorderFilter(imgCopy);
		image(imgCopy, imgIn.width, 0);
	}
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}

/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
	var resultImg = createImage(imgIn.width, imgIn.height);
	
	resultImg = sepiaFilter(img);
	resultImg = darkCorners(resultImg);
	resultImg = radialBlurFilter(resultImg);
	resultImg = borderFilter(resultImg);
	
	return resultImg;
}
/////////////////////////////////////////////////////////////////
function sepiaFilter(img){
	var imgOut = createImage(img.width, img.height);

    imgOut.loadPixels();
    img.loadPixels();

    for (var x = 0; x < imgOut.width; x++) {
        for (var y = 0; y < imgOut.height; y++) {

            var index = (x + y * imgOut.width) * 4;

            var r = (img.pixels[index + 0] * 0.393) + 
					(img.pixels[index + 1] * 0.769) + 
					(img.pixels[index + 2] * 0.189);
            var g = (img.pixels[index + 0] * 0.349) + 
					(img.pixels[index + 1] * 0.686) + 
					(img.pixels[index + 2] * 0.168);
            var b = (img.pixels[index + 0] * 0.272) + 
					(img.pixels[index + 1] * 0.534) + 
					(img.pixels[index + 2] * 0.131);

            imgOut.pixels[index + 0] = r;
            imgOut.pixels[index + 1] = g;
            imgOut.pixels[index + 2] = b;
            imgOut.pixels[index + 3] = 255;
        }
    }
	
    imgOut.updatePixels();
    return imgOut;
}
/////////////////////////////////////////////////////////////////
function darkCorners(img){
	var imgOut = createImage(img.width, img.height);

    imgOut.loadPixels();
    img.loadPixels();

    for (var x = 0; x < imgOut.width; x++) {
        for (var y = 0; y < imgOut.height; y++) {

            var index = (x + y * imgOut.width) * 4;
			var dynLum;
			var d = dist(x, y, imgOut.width/2, imgOut.height/2);
			
			if (d < 300){
				dynLum = 1;
			}
			else if (d >= 300 && d < 450){
				dynLum = map(d, 300, 450, 1, 0.4);
				dynLum = constrain(dynLum, 0.4, 1);
			}
			else{
				dynLum = map(d, 450, 517, 0.4, 0); // max distance a pixel can have from the centre is 516.7255074021409, that is why 517 was chosen as max value
				dynLum = constrain(dynLum, 0, 0.4);
			}


            imgOut.pixels[index + 0] = img.pixels[index + 0] * dynLum;
            imgOut.pixels[index + 1] = img.pixels[index + 1] * dynLum;
            imgOut.pixels[index + 2] = img.pixels[index + 2] * dynLum;
            imgOut.pixels[index + 3] = 255;
        }
    }
	
    imgOut.updatePixels();
    return imgOut;
}
/////////////////////////////////////////////////////////////////
function radialBlurFilter(img){
	var imgOut = createImage(img.width, img.height);
	var matrixSize = matrix.length;

	imgOut.loadPixels();
	img.loadPixels();

	for (var x = 0; x < imgOut.width; x++) {
	  for (var y = 0; y < imgOut.height; y++) {

		  var index = (x + y * imgOut.width) * 4;
		  var c = convolution(x, y, matrix, matrixSize, img);

		  var dynBlur;
		  var d = dist(x, y, mouseX, mouseY);
		  d = map(d, 100, 300, 0, 1);
		  dynBlur = constrain(d, 0, 1);

		  imgOut.pixels[index + 0] = c[0]*dynBlur +
									 img.pixels[index + 0]*(1-dynBlur);
		  imgOut.pixels[index + 1] = c[1]*dynBlur + 
									 img.pixels[index + 1]*(1-dynBlur);
		  imgOut.pixels[index + 2] = c[2]*dynBlur + 
									 img.pixels[index + 2]*(1-dynBlur);
		  imgOut.pixels[index + 3] = 255;
	  }
	}

	imgOut.updatePixels();
	return imgOut;
}
/////////////////////////////////////////////////////////////////
function borderFilter(img){
	var buffer = createGraphics(img.width, img.height);
	image(img, width/2, 0);

	noFill();
	stroke(255);
	strokeWeight(20);
	rect(width/2 + 10, 10, buffer.width - 20, buffer.height - 20, 40);
	rect(width/2 + 10, 10, buffer.width - 20, buffer.height - 20);

	return buffer;
}
/////////////////////////////////////////////////////////////////
// added new variation of borders in black colour
function darkBorderFilter(img){
	var buffer = createGraphics(img.width, img.height);
	image(img, width/2, 0);

	noFill();
	stroke(0);
	strokeWeight(20);
	rect(width/2 + 10, 10, buffer.width - 20, buffer.height - 20, 40);
	rect(width/2 + 10, 10, buffer.width - 20, buffer.height - 20);

	return buffer;
}
//////////////////////////////////////////////////////////////////
//added greyscale filter as well:
function greyscaleFilter(img){
    var imgOut = createImage(img.width, img.height);
    imgOut.loadPixels();
    img.loadPixels();

    for (x = 0; x < imgOut.width; x++) {
        for (y = 0; y < imgOut.height; y++) {

            var index = (x + y * imgOut.width) * 4;

            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
			// LUMA ratios formula
            var grey = r * 0.299 + g * 0.587 + b * 0.0114; 

            imgOut.pixels[index+0] = imgOut.pixels[index+1] = imgOut.pixels[index+2] = grey;
            imgOut.pixels[index+3]= 255;
        }
    }
	
    imgOut.updatePixels();
    return imgOut;
}
//////////////////////////////////////////////////////////////////
//my own filter accentuating red hues
function redFocusFilter(img){
    var imgOut = createImage(img.width, img.height);
    imgOut.loadPixels();
    img.loadPixels();

    for (x = 0; x < imgOut.width; x++) {
        for (y = 0; y < imgOut.height; y++) {

            var index = (x + y * imgOut.width) * 4;

            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
			
            var grey = r * 0.299 + g * 0.587 + b * 0.0114; 

            imgOut.pixels[index+0] = img.pixels[index + 0];
			imgOut.pixels[index+1] = imgOut.pixels[index+2] = grey;
            imgOut.pixels[index+3]= 255;
        }
    }
	
    imgOut.updatePixels();
    return imgOut;
}
/////////////////////////////////////////////////////////////////
//my own filter - applying a sketch effect on the photo
function sketchFilter(img){
	var imgOut = createImage(img.width, img.height);
	var matrixSize = matrix2.length;

	imgOut.loadPixels();
	img.loadPixels();

	for (var x = 0; x < imgOut.width; x++) {
	  for (var y = 0; y < imgOut.height; y++) {

		  var index = (x + y * imgOut.width) * 4;
		  var c = convolution(x, y, matrix2, matrixSize, img);

		  imgOut.pixels[index + 0] = c[0]*0.2 +
									 img.pixels[index + 0]*(1-0.2);
		  imgOut.pixels[index + 1] = c[1]*0.2 +
									 img.pixels[index + 1]*(1-0.2);
		  imgOut.pixels[index + 2] = c[2]*0.2 +
									 img.pixels[index + 2]*(1-0.2);
		  imgOut.pixels[index + 3] = 180;
	  }
	}

	imgOut.updatePixels();
	return imgOut;
}
/////////////////////////////////////////////////////////////////
//second variation of own filter - combination of my sketch filter and sepia
function sepiaSketchFilter(img){
	var resultImg = createImage(imgIn.width, imgIn.height);
	
	resultImg = sepiaFilter(img);
	resultImg = sketchFilter(resultImg);
	
	return resultImg;
}
/////////////////////////////////////////////////////////////////
//third variation of own filter - grey sketch filter
function greySketchFilter(img){
	var resultImg = createImage(imgIn.width, imgIn.height);
	
	resultImg = greyscaleFilter(img);
	resultImg = sketchFilter(resultImg);
	
	return resultImg;
}
/////////////////////////////////////////////////////////////////
function convolution(x, y, matrix, matrixSize, img) {
    var totalRed = 0.0;
    var totalGreen = 0.0;
    var totalBlue = 0.0;
    var offset = floor(matrixSize / 2);

    for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            
            var xloc = x + i - offset;
            var yloc = y + j - offset;
            var index = (xloc + img.width * yloc) * 4;
            
            index = constrain(index, 0, img.pixels.length - 1);

            // multiply all values with the mask and sum up
            totalRed += img.pixels[index + 0] * matrix[i][j];
            totalGreen += img.pixels[index + 1] * matrix[i][j];
            totalBlue += img.pixels[index + 2] * matrix[i][j];
        }
    }
    // return the new color
    return [totalRed, totalGreen, totalBlue];
}
/////////////////////////////////////////////////////////////////	
//Helper function to enable adding or removing borders, dark corners and radialBlur filter via checkboxes
function checkBoxChange() {
    if (darkCornersCheckbox.checked()) {
		darkCornersOn = true;
	}
	else{
		darkCornersOn = false;
	}
	
	if (whiteBorderCheckbox.checked()) {
		whiteBorderOn = true;
	}
	else{
		whiteBorderOn = false;
	}
	
	if (darkBorderCheckbox.checked()) {
		darkBorderOn = true;
	}
	else{
		darkBorderOn = false;
	}
	
	if (radialBlurFilterCheckbox.checked()) {
		radialBlurFilterOn = true;
	}
	else{
		radialBlurFilterOn = false;
	}
	
	loop();
}

function keyPressed(){ //change filters upon pressing different keys
	
	if (keyCode == 82){ // key 'R' pressed
		resetFilters(); //remove all filters
	}
	if (keyCode == 49){ // key '1' pressed
		resetFilters();
		earlyBirdFilterOn = true;
	}
	if (keyCode == 50){ // key '2' pressed
		resetFilters();
		sepiaFilterOn = true;
	}
	if (keyCode == 51){ // key '3' pressed
		resetFilters();
		greyscaleFilterOn = true;
	}
	if (keyCode == 52){ // key '4' pressed
		resetFilters();
		sketchFilterOn = true;
	}
	if (keyCode == 53){ // key '5' pressed
		resetFilters();
		sepiaSketchFilterOn = true;
	}
	if (keyCode == 54){ // key '6' pressed
		resetFilters();
		greySketchFilterOn = true;
	}
	if (keyCode == 55){ // key '7' pressed
		resetFilters();
		redFocusFilterOn = true;
	}
	
	loop();
}

//function to remove all filters
//used to clear previously applied filters before new one is applied
// effects added with Checkboxes excluded
function resetFilters(){ 
	earlyBirdFilterOn = false;
	sepiaFilterOn = false;
	greyscaleFilterOn = false;
	sketchFilterOn = false;
	sepiaSketchFilterOn = false;
	greySketchFilterOn = false;
	redFocusFilterOn = false;	
}