var stepSize = 20;

function setup() {
  createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
  // your code here
	for (var i = 0; i<25; i++){
		for (var j = 0; j<25; j++){
			var amt = map(mouseX, 0, width, 50, 200);
			var n = noise(i/30, j/30, frameCount/amt);
			var c = lerpColor(color(205,0,144), color(0,255,0), n);
			noStroke();
			fill(c);
			rect(i*stepSize, j*stepSize, stepSize, stepSize);
		}
	}
}
// noise parameters scaling chosen so as to have more visible 'clouds' in the patterns created
// colours adapted so that the color grid changes between 'fluo' green and pink

///////////////////////////////////////////////////////////////////////
function compassGrid(){
  // your code here
  for (var i = 0; i<25; i++){
		for (var j = 0; j<25; j++){
			var amt = map(mouseX, 0, width, 50, 200);
			var n = noise(i/30, j/30, frameCount/amt); 
			var angle = map(n, 0, 1, 0, 720);
			var shade = map(n, 0, 1, 0, 51); 
			var lineColour = color(255, shade*2.5, shade*2.5);
			var tipColour = color(shade*2, shade*2, 255);
			var y = - stepSize*(n*2.2);
			push();
			stroke(lineColour);
			strokeWeight(2.5);
			translate(i*stepSize + stepSize/2, j*stepSize + stepSize/2);
			rotate(radians(angle));
			line(0, 0, 0, y);
			stroke(tipColour);
			strokeWeight(4);
			point(0, y);
			pop();
		}
	}
}
// scaling of noise parameters was matched with colorGrid function scaling
// variable shade used to help make the compass lines' and points' colours dependent on noise value; the smaller the noise value, the darker the shade
// variable y used to make the length of line dependent on noise value; n is multiplied by 2.2 to make sure the lines are neither too short, nor too long, which would result in a very noisy image - the bigger the noise value, the longer the needle
// points added at the ends of the compass lines to create a fun effect that reminded me of hair brushes :) //