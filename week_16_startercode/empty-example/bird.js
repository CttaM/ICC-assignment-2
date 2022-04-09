// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

class Bird  {
//setting initial variables for the bird class
  constructor() {
    this.y = height/2;
    this.x = 64;

    this.gravity = 0.5;
    this.lift = -7;
    this.velocity = 0;
  }
  
//similar to draw function?
  show() {
    noStroke();
    fill("#Ce1ab7");
    rect(this.x, this.y, 32, 32);
  }
//when executed, makes bird go up
  up() {
    this.velocity += this.lift;
  }
//called when each frame is executed
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
//checks to see if player has reached top of screen
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
//checks to see if player has reached bottom of screen
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }

}
