let ellipses = [];
let level;
let size;
let health;
let spawnRate;
let count;
let y = 0;
let score = 0;
let screen = 1;
let pop;
let end;
let squelch;
let victory;

function preload(){
    pop = loadSound('530830-Cartoon_Vacuum_Pop.wav');
    end = loadSound('273689-Retro-Game-Over-4.wav');
    squelch = loadSound('542677-zapsplat-foley-wet-cloth-dab-squelch-soft-single-005-66315.wav');
    victory = loadSound('17300-trumpets_fanfar_2.wav');
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
        count = 0;
        score = 0;
        size = 100;
        spawnRate = 50;
        health = 3;
        level = 5;
    }
    if(keyCode === 50){
        screen = 2;
        count = 0;
        score = 0;
        size = 75;
        spawnRate = 15;
        health = 1;
        level = 5;
    }
    }
    //game running (easy mode)
    if(screen == 2){
        if (frameCount % spawnRate == 0) {
            
            count ++;

            if(count % 10 == 0){
                size -= 10;
                level --;
            }
            ellipses.push(new Alien(size));
        }

        for(i = 0; i < ellipses.length; i++){
            ellipses[i].move();
            ellipses[i].display();

            if(ellipses[i].y > windowHeight){

                health -=1;
                ellipses.splice(i,1);
                squelch.play();
            }
        }

        fill(0);
        textSize(24);
        textAlign(LEFT, CENTER);
        text("Score:" + score, 10, (windowHeight-30));
        
        fill(0);
        textSize(24);
        textAlign(RIGHT, CENTER);
        text("Health:" + health, (windowWidth-20), (windowHeight-30));

        fill(0);
        textSize(24);
        textAlign(CENTER, CENTER);
        text("Level:" + level, (windowWidth/2), (windowHeight-30));

        if(health <= 0){
            end.play();
            screen = 4;
        }
        if(level == 0){
            victory.play();
            screen = 5;
        }
    }
    
    //game over screen 
    if(screen == 4){
        fill(0);
        textSize(50);
        textAlign(CENTER, CENTER);
        textFont(fontBold);
        text("Game Over", windowWidth/2, windowHeight/2);
        textSize(30);
        text("Press Enter to return to menu", windowWidth/2, (windowHeight/2)+40);

        if (keyCode == ENTER){
            screen = 1;
            ellipses = [];
        }
    }

    if(screen == 5){
        fill(0);
        textSize(50);
        textAlign(CENTER, CENTER);
        textFont(fontBold);
        text("You win!", windowWidth/2, windowHeight/2);
        textSize(30);
        text("Press Enter to return to menu", windowWidth/2, (windowHeight/2)+40);

        if (keyCode == ENTER){
            screen = 1;
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