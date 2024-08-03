let video;

function setup() {
  createCanvas(640, 480);
  video = createVideo(['assets/testvideo.mp4'], videoLoaded); // Load the video with a callback
  video.size(640, 480);
  video.hide(); // Hide the default video controls
}

function videoLoaded() {
  console.log('Video loaded successfully');
}

function draw() {
  background(220);
  if (video) {
    image(video, 0, 0); // Display the video
  } else {
    console.log('Video not loaded yet');
  }
}

function mousePressed() {
  if (video && video.elt.paused) {
    video.play(); // Play the video on mouse press
  } else if (video) {
    video.pause(); // Pause the video if it's playing
  }
}