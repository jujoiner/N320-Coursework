//designing the ball and where it will spawn
//also calls world object if ball goes beyond canvas
class Ball {
  
    constructor() {
      this.position = { x: 100, y: 100 };
      this.velocity = { x: 10, y: 0 };
      this.squash = new Box();
    }
    
    update() {
      
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      
      circle(this.position.x, this.position.y, 20);
      
      if(this.position.x < 0 || this.position.x > 400) {
        this.squash.hitGround;
        World.ballBeyond(this);
      }
      this.squash.draw();
    }
    
  }
  
  //object that holds the background color and the speed/direction the ball travels
  var World = {
    bgcolor: [237, 119, 83],

    ballBeyond: function(whichBall) {
      this.bgcolor = [ Math.random()*255, Math.random()*255, 83 ];
      whichBall.position.x = 100;
      whichBall.velocity.x = (Math.random() - .5) * 20;
    }
  }
  
  //class for a box
  //Grows in size every time a ball hits an edge and is reset
  class Box{
    constructor(){
      this.x=200;
      this.y=150;
      this.dropcount = 0;
      this.boxsize = 0;
      this.z = 100;
    }
    draw(){
      fill(50,0, 88);
      rect(this.x, this.y, this.z,this.z);
      }

      hitGround(){

        this.dropcount++;
        
        if (this.dropcount == this.boxsize){
            this.z+=10;
            this.boxsize++;
        }
        
     }
  }
  // "For fun": multiple balls
  
  //global variable
  var ball = new Ball();
  
  
  //run once before the application starts to make the canvas
  function setup() {
    createCanvas(400,300);  
  }
  
  //runs 60 times a second
  function draw() {
    //changes the background to the color in the world variable
    background( World.bgcolor );
    
    //creates new ball
    ball.update();
  }