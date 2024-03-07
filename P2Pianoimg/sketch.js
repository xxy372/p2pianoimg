working 

let img;
let pianoSound;
let lastKeyPressTime;
let pauseTime = 0; // Variable to store the playback position when pausing

function preload() {
    img = loadImage('pianokeyboard.png');
    //pianoSound = loadSound('mozart.mp3'); // Replace with the actual filename of your audio file
}

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas-container');
    pianoSound = loadSound('mozart.mp3', loaded); // Load sound and call 'loaded' when done
    lastKeyPressTime = millis(); // Initialize the time of the last key press
}

function loaded() {
    // This function is called when the sound is loaded
    console.log('Sound loaded successfully!');
}

function draw() {
    // Set a transparent background
    background(0, 0); // The second argument (0) represents the alpha value (transparency)

    // Display the images with correct aspect ratio and dimensions

    // Display img1
    let aspectRatio = img.width / img.height;
    let maxWidth = min(width, img.width);
    let maxHeight = maxWidth / aspectRatio;
    let x1 = width / 2 - maxWidth / 2;
    let y1 = height / 2 - maxHeight / 2;
    image(img, x1, y1, maxWidth, maxHeight);

    // Add a title text above the images
    textAlign(CENTER, CENTER);
    textSize(31);
    fill(255); // Set text color to white
    text('Type Anything on Your keyboard, and you are a pianist!', width / 2, 50);

    // Check for keyboard input at all times
    if (keyIsPressed) {
        // Reset the timer when a key is pressed
        lastKeyPressTime = millis();
        // Play the audio if it's not already playing or paused
        if (pianoSound && !pianoSound.isPlaying() && !pianoSound.isPaused()) {
            pianoSound.play();
        }
    } else {
        // Check if one second has passed since the last key press
        if (millis() - lastKeyPressTime > 1000) {
            // Pause the audio if one second has passed with no key press
            if (pianoSound.isPlaying()) {
                pauseTime = pianoSound.currentTime(); // Store the current playback position
                pianoSound.pause();
            }
        }
    }
}

function keyPressed() {
    // Handle keyboard input here
    // Example: Play the piano sound on any key press
    // Note: This function will be called automatically due to p5.js
    // Resume the audio from the stored position
    if (pianoSound && pianoSound.isPaused()) {
        pianoSound.play();
        pianoSound.jump(pauseTime); // Set the playback time to the stored position
    }
}