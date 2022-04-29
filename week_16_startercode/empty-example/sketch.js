let ellipses = [];
let size;
let y = 0;
let score = 0;
let easyHealth = 5;
let hardHealth = 1;
let screen = 1;
let pop;
let end;
let squelch;

function preload(){
    pop = loadSound('530830-Cartoon_Vacuum_Pop.wav');
    end = loadSound('273689-Retro-Game-Over-4.wav');
    squelch = loadSound('542677-zapsplat-foley-wet-cloth-dab-squelch-soft-single-005-66315.wav');
    fontBold = loadFont('Cairo-VariableFont_wght.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

}

function draw() {
    background(255);

    //start screen
    if(screen == 1){
    fill(0);
    textSize(50);
    textAlign(CENTER, CENTER);
    textFont(fontBold);
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
        size = 100;
        if (frameCount % 25 == 0) {
            ellipses.push(new Alien(size));
        }

        for(i = 0; i < ellipses.length; i++){
            ellipses[i].move();
            ellipses[i].display();

            if(ellipses[i].y > windowHeight){

                easyHealth -=1;
                ellipses.splice(i,1);
                squelch.play();
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
            end.play();
            screen = 4;
        }
    }
    
        //game running (hard mode)
        else if(screen == 3){
            size = 50;
            if (frameCount % 15 == 0) {
                ellipses.push(new Alien(size));
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
                end.play();
                screen = 4;
            }
        

    //game over screen 
    }else if(screen == 4){
        fill(0);
        textSize(50);
        textAlign(CENTER, CENTER);
        textFont(fontBold);
        text("Game Over", windowWidth/2, windowHeight/2);
        //fill(0);
        textSize(30);
        //textAlign(CENTER, CENTER);
        //textFont(fontBold);
        text("Press Enter to return to menu", windowWidth/2, (windowHeight/2)+40);

        if (keyCode == ENTER){
            screen = 1;
            easyHealth = 5;
            hardHealth = 1;
            score = 0;
            ellipses = [];
        }
    }
}

function mousePressed(){
    for(i = 0; i < ellipses.length; i++){
        let d = dist(mouseX, mouseY, ellipses[i].x, ellipses[i].y);

        if(d < ellipses[i].size){
            ellipses.splice(i,1);
            pop.play();
            score +=1;
            console.log(score);
        }
    }
}

class Alien{

    constructor(size){
        this.size = size;
        this.size = size;
        this.x = random((0 + 50), (windowWidth - 50));
        this.y = y;
    }

    move(){
        this.y+=4;
    }

    display(){
        fill(255);
        ellipse(this.x, this.y, this.size, this.size);
    }
}