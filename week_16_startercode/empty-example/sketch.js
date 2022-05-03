let ellipses = [];
let clouds;
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
let c1, c2;

function preload(){
    pop = loadSound('530830-Cartoon_Vacuum_Pop.wav');
    end = loadSound('273689-Retro-Game-Over-4.wav');
    squelch = loadSound('542677-zapsplat-foley-wet-cloth-dab-squelch-soft-single-005-66315.wav');
    victory = loadSound('17300-trumpets_fanfar_2.wav');
    fontBold = loadFont('Cairo-VariableFont_wght.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    cloud = new Cloud;
    c1 = color(255);
    c2 = color(63, 191, 191);
}

function draw() {
 for(let y=0; y<height; y++){
            n = map(y,0,height,0,1);
            let newc = lerpColor(c1,c2,n);
            stroke(newc);
            line(0,y,width, y);
    }   
    //start screen
    if(screen == 1){
    c1 = color(255);
    c2 = color(63, 191, 191);
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
        c1 = color(255);
        c2 = color(234, 205, 86);
        cloud.init();
    }
    if(keyCode === 50){
        screen = 2;
        count = 0;
        score = 0;
        size = 75;
        spawnRate = 30;
        health = 3;
        level = 5;
        c1 = color(255);
        c2 = color(230, 57, 89);
        cloud.init();
    }
}
    //game running (easy mode)
    if(screen == 2){
        if (frameCount % spawnRate == 0) {
            
            count ++;

            if(count % 10 == 0){
                size -= 10;
                spawnRate -= 5;
                level --;
                cloud.setLevel(level);
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

        cloud.move();
        cloud.display();
        
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
    if(cloud.hit()){
        return;
    }

    for(i = 0; i < ellipses.length; i++){
        ellipses[i].hit();
    }
}

class Alien{

    constructor(size){
        this.size = size;
        this.size = size;
        this.x = random((0 + 50), (windowWidth - 50));
        this.y = y;
    }

    hit(){
        let d = dist(mouseX, mouseY, ellipses[i].x, ellipses[i].y);

        if(d < ellipses[i].size){
            ellipses.splice(i,1);
            pop.play();
            score +=1;
            console.log(score);
        }
    }

    move(){
        this.y+=4;
    }

    display(){
        fill(255);
        ellipse(this.x, this.y, this.size, this.size);
    }
}

class Cloud{

    constructor(){
        this.init();
    }

    init(){
        this.w = 150;
        this.h = 100;
        this.x = -150
        this.y = 0;
        this.vel = 4;
        this.setLevel(5);
    }

    setLevel(level){
        this.y = (windowHeight/5) * (5-level);
    }

    hit(){
        if(mouseX > this.x && mouseX < this.x + 150 && mouseY > this.y && mouseY < this.y + 100){
            return true;
        }else{
            return false;
        }
    }

    move(){
        this.x+= this.vel;
        if(this.x > windowWidth-150){
            this.vel = -4;
        }
        if(this.x < 0){
            this.vel = +4;
        }
    }

    display(){
        fill(255, 10, 2);
        rect(this.x, this.y, this.w, this.h);
    }
}