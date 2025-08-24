function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	frameRate(100);
	d = (2 * PI) / 38;
}

let automate = 0, debugM = 0, d;
let  black = 0, red = 0, green = 50, greenUp = 0;
let click = 0;
let x = 0; //total rotation
let speed = 0.13; //spinning speed @ max
let v = 0; //velocity

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


//creates the roulette
function roulette() {
	let i = 0;
	stroke(color(213, 181, 110));
	strokeWeight(2);
	while (i <= 38) {
		fill(color('red'));
		if ((i % 2) == 0) {
			fill("black");
		}
		if ((i == 20) || (i == 1)) {
			fill('green');
		}
		arc(windowWidth / 2, windowHeight / 2, 500, 500, x + (-d * (i + 1)), x + (-d * i), PIE);
		i++;
	}
}

//pretty
function decor() {
	//center circle
	fill(color(92, 29, 12));
	strokeWeight(5);
	stroke(color(72,18,12));
	circle(windowWidth / 2, windowHeight / 2, 300); 
	//golden decor
	stroke(color(213, 181, 110));
	strokeWeight(3);
	noFill();
	circle(windowWidth / 2, windowHeight / 2, 390);
	strokeWeight(5);
	circle(windowWidth / 2, windowHeight / 2, 504); //thicker outer circle
	//triangle pointer thing
	strokeWeight(2);
	stroke(0);
	fill('white');
	triangle(windowWidth / 2 + 220, windowHeight / 2, windowWidth / 2 + 280, windowHeight / 2 - 25, windowWidth / 2 + 280, windowHeight / 2 + 25);
}

//makes it spin when clicked
function spin() {
	stroke(color(213, 181, 110));
	strokeWeight(2);
	fill(color(213, 181, 110));
	if (click % 2 == 1) {
		if (v < speed) {
			v += .0025;
			textAlign(CENTER);
			textSize(30);
			//text('ROLLING!', windowWidth / 2, windowHeight / 2 + 6);
		}
	}
	else if (click % 2 == 0) {
		if (v > 0) {
			v -= .001;
			textAlign(CENTER);
			textSize(30);
			text('Slowing Down', windowWidth / 2, windowHeight / 2 + 6);
		}
		else if (v <= 0) {
			v = 0; //avoid float issues making v negative
		}
	}
}

//prints the color at the top
function returnColor() {
	textSize(50);
	//text('G:' + green + 'R:' + red + 'B:' + black, 600, 100);
	let index = floor((x % (2*PI))/d); //if odd then red, even if black
	if ((v == 0) && ((index == 20) || (index == 1))) {
		fill(0, green , 0);
		stroke(color(0, 200, 0));
		text('Green..', windowWidth / 2, windowHeight / 2);
		if ((green <= 50) && (greenUp <= 0)) {
			greenUp = 1;
		}
		else if (green >= 255) {
			greenUp = 0;
		}
		if (greenUp == 1) {
			green += 7;
		}
		else if (greenUp == 0) {
			green -= 7;
		}
}
	else if ((v == 0) && (index % 2 == 0) && (x > 0)) { //3rd is so doesnt say BLACK at start
		text('BLACK!', windowWidth / 2, windowHeight / 2);
		//black++;
	}
	else if ((v == 0) && (x > 0)) {
		text('RED!', windowWidth / 2, windowHeight / 2);
		//red++;
	}
}

function mouseClicked() {
	click++;
}

function keyPressed() {
	if (key === 'd') {
		debugM++;
	}
	if ((debugM % 2 == 1) && (key === 'a')) {
		automate++;
	}
}

function debug() {
	if (debugM % 2 == 1) {
		if (automate % 2 == 1) {
			text('automating', 100, 180);
			if (frameCount % 240 == 0) {
			click++;
			}
		}
		textSize(15);
		text('debug mode - A to automate', 100, 20);
		text(floor(x/(PI*2)), 100, 40);
		text(v, 100, 60);
		text(round(v,3), 100, 80);
		text(round(x,3), 100, 100);
		text(floor((x % (2*PI))/d), 100, 120);
		text(frameCount, 100, 140);
		text(greenUp, 100, 180);
		text(green, 100, 200);
	}
}

function draw() {
  windowResized()
	background(100);
	roulette();
	decor();
	spin();
	returnColor();
	x += round(v,3); //makes it spin
	debug();
}







