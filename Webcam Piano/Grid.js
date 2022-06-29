//variable for creating sound synthesis
var monoSynth = new p5.MonoSynth();
//create 8x8 array of notes to map to different x, y coordinates:
var notes = [["A2", "B2", "C2", "D2", "A4", "B4", "C4", "D4"],
			 ["A3", "B3", "C3", "D3", "A5", "B5", "C5", "D5"],
			 ["A4", "B4", "C4", "D4", "A6", "B6", "C6", "D6"],
			 ["C3", "D3", "E3", "F#3", "C4", "D4", "E4", "F#5"],
			 ["A2", "B2", "C2", "D2", "A4", "B4", "C4", "D4"],
			 ["A3", "B3", "C3", "D3", "A5", "B5", "C5", "D5"],
			 ["A4", "B4", "C4", "D4", "A6", "B6", "C6", "D6"],
			 ["C3", "D3", "E3", "F#3", "C4", "D4", "E4", "F#5"]];

class Grid {
  /////////////////////////////////
  constructor(_w, _h) {
    this.gridWidth = _w;
    this.gridHeight = _h;
    this.noteSize = 40;
    this.notePos = [];
    this.noteState = [];

    // initalise grid structure and state
    for (var x=0; x<_w; x+=this.noteSize){
      var posColumn = [];
      var stateColumn = [];
      for (var y=0; y<_h; y+=this.noteSize){ 
		//create vector of positions of centre of notes
        posColumn.push(createVector(x+this.noteSize/2,y+this.noteSize/2));
		//initialise column state to 0 (inactive)
        stateColumn.push(0);
      }
      this.notePos.push(posColumn);
      this.noteState.push(stateColumn);
    }
  }
  /////////////////////////////////
  run(img) {
    img.loadPixels();
    this.findActiveNotes(img);
    this.drawActiveNotes(img);
  }
  /////////////////////////////////
  drawActiveNotes(img){
    // draw active notes
    fill(255);
    noStroke();
    for (var i=0;i<this.notePos.length;i++){
      for (var j=0;j<this.notePos[i].length;j++){
        var x = this.notePos[i][j].x;
        var y = this.notePos[i][j].y;
        if (this.noteState[i][j]>0) { //note is active
		  
          var alpha = this.noteState[i][j] * 180; // adapted number to fade notes a bit more
          var c1 = color(255,0,127,alpha); // changed colours to my liking
          var c2 = color(0,235,245,alpha); // changed colours to my liking
          var mix = lerpColor(c1, c2, map(i, 0, this.notePos.length, 0, 1));
          fill(mix);
		  // added stroke as well
		  strokeWeight(2);
		  //oppposite lerp colours to use for Sstroke
		  var mix2 = lerpColor(c2, c1, map(i, 0, this.notePos.length, 0, 1));
		  stroke(mix2);
			
          var s = this.noteState[i][j];
          ellipse(x, y, this.noteSize*s, this.noteSize*s);
			
		    //extra graphics drawn
			//draw larger, yellow ellipses that will create a trail
			push();  
			fill(255, 255, 153, 150);
			noStroke();
			var s1 = 1 - this.noteState[i][j];
			ellipse(x, y, this.noteSize*s1*1.15, this.noteSize*s1*1.15);
			pop();
			
		  //Play monosynth notes
          //notes to be created based on notes X and Y coordinates
		  // and mapping them to different i, j indexes of notes array (8x8)
          var note1 = map(x, 0, this.gridWidth, 0, 8) | 0; // (using: | 0 syntax for 2D array indexes)
          var note2 = map(y, 0, this.gridHeight, 0, 8) | 0;
          //pass in the array indexes to the synth
          this.playSynthNotes(note1, note2);
        }
        this.noteState[i][j]-=0.05;
        this.noteState[i][j]= constrain(this.noteState[i][j],0,1);
      }
    }
  }
  /////////////////////////////////
  findActiveNotes(img){
    for (var x = 0; x < img.width; x += 1) {
        for (var y = 0; y < img.height; y += 1) {
            var index = (x + (y * img.width)) * 4;
            var state = img.pixels[index + 0];
            if (state==0){ // if pixel is black (ie there is movement)
              // find which note to activate
              var screenX = map(x, 0, img.width, 0, this.gridWidth);
              var screenY = map(y, 0, img.height, 0, this.gridHeight);
              var i = int(screenX/this.noteSize);
              var j = int(screenY/this.noteSize);
              this.noteState[i][j] = 1;
            }
        }
    }
  }
	
  /////////////////////////////////
  //helper function to generate and play monosynth notes:
  playSynthNotes(noteX, noteY){
	//audio starts
	userStartAudio();
	//create note using the arguments passed in (noteX and noteY taken from the notes array)
	var note = notes[noteX][noteY];
	//volume from 0 to 0.6 - using randomness
	var velocity = random(0, 0.6);
	//parameters: note created above, volume(0 to 0.6), time from now, note duration  1/80
	monoSynth.play(note, velocity, 0, 1/80); 
	}
}
