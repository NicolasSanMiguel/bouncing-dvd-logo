let x, y;
let logo;
let colorkey = 'white_key'; // sets the default color key
let c1, c2, c3;
let xspeed = 1;
let yspeed = 1;      // y is down and x is to the right
let button1, button2, button3, speed_slider, speed_from_slider;

function preload() {
    logo = loadImage("dvd_logo.png");
}

// randomly assigns color values based on the color mode selected
function random_color(colorkey) {
    if (colorkey == 'rgb_key') {
        c1 = random(100,256);
        c2 = random(100,256);
        c3 = random(100,256);
    } else if (colorkey == 'hsb_key') {
        c1 = random(0,255);
        c2 = random(0,100);
        c3 = 100
    } else {
        c1 = 255;
        c2 = 255;
        c3 = 255;
    }
}

// setup the screen 
function setup() {
    // createCanvas(windowWidth,windowHeight);
    createCanvas(800,600);
    colorMode(RGB); // default color mode

    x = random(width-logo.width);
    y = random(height-logo.height);
    random_color(colorkey);

    button1 = createButton('Change to RGB');
    button1.mousePressed(set_rgb_key);
    button2 = createButton('Change to HSB');
    button2.mousePressed(set_hsb_key);
    button3 = createButton('Change to White');
    button3.mousePressed(set_white_key);

    speed_slider = createSlider(-10, 50, 5, 1); // (min_val, max_val, start_val, increment)
}

// these are all the functions that are called when the buttons are pressed to change the color mode
function set_rgb_key() {
    colorMode(RGB);
    colorkey = 'rgb_key';
}
function set_hsb_key() {
    colorMode(HSB);
    colorkey = 'hsb_key';
}
function set_white_key() {
    colorMode(RGB);
    colorkey = 'white_key';
}

// this redraws the frame every iteration
function draw() {
    background(0); // sets a black bacground
    tint(c1,c2,c3); // adds a color tint with colors assigned based on colorkey
    image(logo,x,y); // draws the logo at x and y
    speed_mag = speed_slider.value(); // magnitude of the speed from slider

    // adjust box position based on the speed and the magnitude from the slider
    x += xspeed*speed_mag;
    y += yspeed*speed_mag;

    // if the logo reached the edge of the screen, it reverses direction
    if (x + logo.width >= width || x <= 0) {
        xspeed *= -1;
        random_color(colorkey);
    }
    if (y + logo.height >= height || y <= 0) {
        yspeed *= -1;
        random_color(colorkey);
    }
}