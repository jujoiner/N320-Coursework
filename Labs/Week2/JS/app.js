class Drop {
    constructor(){
        this.x = Math.random()*700;
        this.y = 0;
    }

    update(){
        this.y++;
        fill(0,0,255);
        circle(this.x, this.y, 5);
        
    }
}

var d = new Drop();

function setup(){
createCanvas(700,300);
}

function draw(){
d.update();
}

class RainMaker {
    constructor(){
        this.drops = [];
        this.b = new Ground();
    }
    createDrop(){
        //make a new drop
        var newDrop = new Drop();
        
        //add this drop to our collection of drops
        this.drops.push(newDrop);
    }

    update() {
        for(var i = 0; i < this.drops.length; i++) {
            if(this.drops[i].y == 300){
                this.b.hitGround();
            }
            this.drops[i].update();
            this.b.draw();
        }
    }
}

class Ground {
    constructor(){
        this.x = 710;
        this.y = 10;
        this.groundColor = 60;
        this.dropcount = 0;
    }
    //set the starting color
    //start the drop hit count
    
    draw(){
    fill(50,0, this.groundColor);
    rect(0,295, this.x, this.y);
    }

    //drop hit - called when a rain drop gets low enough (how do you inform it?)
   hitGround(){
       this.dropcount++;
       if (this.dropcount %10 ==0){
           this.groundColor+=5;
       }
       
    }
    //change the color for every ten rain drops hit

}




//global variables
var rainMaker = new RainMaker();

//Run once before the application starts
function setup() {
    createCanvas(400,300);
}

//runs 60 times a second, or so
function draw() {

    //clear out background
    background(255,55,0);

    //create a new drop on a 19% chance
    if(Math.random() < .19) {
        rainMaker.createDrop();
    }
    
    

    rainMaker.update();
}
