let ellipses = [];
//let e1;
let y = 0;
let score = 0;
let easyHealth = 5;
let hardHealth = 1;
let screen = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);

    //start screen
    if(screen == 1){
    fill(0);
    textSize(50);
    textAlign(LEFT, CENTER);
    text("Press 1 for easy mode", windowWidth/2, windowHeight/2);
    text("Press 2 for hard mode", windowWidth/2, (windowHeight/2)+50);

    if(keyCode === 49){
        screen = 2;
    }
    if(keyCode === 50){
        screen = 3;
    }
    }
    //game running (easy mode)
    if(screen == 2){
        if (frameCount % 25 == 0) {
            ellipses.push(new Alien);
        }

        for(i = 0; i < ellipses.length; i++){
            ellipses[i].move();
            ellipses[i].display();

            if(ellipses[i].y > windowHeight){

                easyHealth -=1;
                ellipses.splice(i,1);
            }
        }

        fill(0);
        textSize(24);
        textAlign(LEFT, CENTER);
        text("Score:" + score, 10, 30);
        
        fill(0);
        textSize(24);
        textAlign(LEFT, CENTER);
        text("Health:" + easyHealth, 10, 60);

        if(easyHealth <= 0){
            screen = 4;
        }
    }
    
        //game running (hard mode)
        else if(screen == 3){
            if (frameCount % 15 == 0) {
                ellipses.push(new Alien);
            }
    
            for(i = 0; i < ellipses.length; i++){
                ellipses[i].move();
                ellipses[i].display();
    
                if(ellipses[i].y > windowHeight){
    
                    hardHealth -=1;
                    ellipses.splice(i,1);
                }
            }
    
            fill(0);
            textSize(24);
            textAlign(LEFT, CENTER);
            text("Score:" + score, 10, 30);
            
            fill(0);
            textSize(24);
            textAlign(LEFT, CENTER);
            text("Health:" + hardHealth, 10, 60);
    
            if(hardHealth <= 0){
                screen = 4;
            }
        

    //game over screen 
    }else if(screen == 4){
        fill(0);
        textSize(50);
        textAlign(LEFT, CENTER);
        text("Game Over", windowWidth/2, windowHeight/2);
    }
}

function mousePressed(){

    for(i = 0; i < ellipses.length; i++){
        let d = dist(mouseX, mouseY, ellipses[i].x, ellipses[i].y);

        if(d < ellipses[i].a){
            ellipses.splice(i,1);
            score +=1;
            console.log(score);
        }
    }
}

class Alien{

    constructor(){
        this.a = 100;
        this.b = 100;
        this.x = random(0, windowWidth);
        this.y = y;
    }

    move(){
        this.y+=4;
    }

    display(){
        fill(255);
        ellipse(this.x, this.y, this.a, this.b);
        
    }
}