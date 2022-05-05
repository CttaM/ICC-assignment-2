//declares an empty array
let aliens = [];
//declares global variable
let clouds;
let level;
let size;
let health;
let spawnRate;
let count;
let y = 0;
let score = 0;
let screen = 1; //selects which screen is currently visible
let pop;
let end;
let squelch;
let victory;
let c1, c2;
//preload audio resources into variable that can be used later
function preload(){
    pop = loadSound('530830-Cartoon_Vacuum_Pop.wav');
    end = loadSound('273689-Retro-Game-Over-4.wav');
    squelch = loadSound('542677-zapsplat-foley-wet-cloth-dab-squelch-soft-single-005-66315.wav');
    victory = loadSound('17300-trumpets_fanfar_2.wav');
    //preloading font ensures that the font is avaible first, and so ready for the first screen render
    fontBold = loadFont('Cairo-VariableFont_wght.ttf');
}
//set up function is only executed once at the start of the page loading up
function setup() {
    //creates a canvas for the game to display on, it is the same size as the browser window
    createCanvas(windowWidth, windowHeight);
    //initialises the Cloud class under the variable of cloud
    cloud = new Cloud;
    //sets variable c1 to a value of 255(white)
    c1 = color(255);
    //sets the variable of c2 to a rgb value(blue)
    c2 = color(63, 191, 191);
}
//draw function is called for a every frame
function draw() {
    //for loop creating the gradient background
    for(let y=0; y<height; y++){
            n = map(y,0,height,0,1);
            //lerp color will create a colour from c1 and c2 with n being the increment
            let newc = lerpColor(c1,c2,n);
            //sets the stroke colour to newc, the value of which is set by the lerpColor function
            stroke(newc);
            //draw line on background using colour newc
            line(0,y,width, y);
    }   
    //Start screen
    if(screen == 1){
    c1 = color(255);
    c2 = color(63, 191, 191);

    fill(0);
    textSize(80);
    textAlign(CENTER, CENTER);
    textFont(fontBold);
    //display game title
    text("Bubble Pop", windowWidth/2, 50);

    fill(0);
    textSize(50);
    textAlign(CENTER, CENTER);
    textFont(fontBold);
    //display user commands
    text("Press 1 for easy mode", windowWidth/2, windowHeight/2);
    text("Press 2 for hard mode", windowWidth/2, (windowHeight/2)+50);

    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    textFont(fontBold);
    //display game instruction
    text("Click on the falling circles before they reach the bottom.", windowWidth/2, (windowHeight/2)+120);
    
    //if 1 is pressed, then easy mode is selected, game parameters are set accordingly
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
    //if 2 is pressed, then hard mode is selected, game parameters are set accordingly
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
    //Play mode
    if(screen == 2){
        //create a new alien when frame count is divisible by spawnRate
        if (frameCount % spawnRate == 0) {
            //count how many aliens have been drawn
            count ++;
            //every 10 aliens increases difficulty
            if(count % 10 == 0){
                //reduce size of alien
                size -= 10;
                //reduce spawn period of aliens
                spawnRate -= 5;
                //lower the cloud level
                level --;
                cloud.setLevel(level);
            }
            //create a new alien and add to array
            aliens.push(new Alien(size));
        }
        //loop through the alien array
        for(i = 0; i < aliens.length; i++){
            //move all aliens in the array
            aliens[i].move();
            //draw all the aliens in the array
            aliens[i].display();
            //check if alien has dropped off bottom of screen
            if(aliens[i].y > windowHeight){
                //decrease health by 1 because alien got past
                health -=1;
                //removes the alien from array, so it is no longer displayed
                aliens.splice(i,1);
                //play squelch sound
                squelch.play();
            }
        }
        //move cloud across the screen
        cloud.move();
        //draw the cloud
        cloud.display();
        //display score
        fill(0);
        textSize(24);
        textAlign(LEFT, CENTER);
        text("Score:" + score, 10, (windowHeight-30));
        //display health
        fill(0);
        textSize(24);
        textAlign(RIGHT, CENTER);
        text("Health:" + health, (windowWidth-20), (windowHeight-30));
        //display level
        fill(0);
        textSize(24);
        textAlign(CENTER, CENTER);
        text("Level:" + level, (windowWidth/2), (windowHeight-30));
        //check health, if health = 0 then game end
        if(health <= 0){
            //play end sound
            end.play();
            //change to game over screen
            screen = 4;
        }
        //check level, if level = 0 then no more levels, game finishes
        if(level == 0){
            //plays sound called victory
            victory.play();
            //change to victory screen
            screen = 5;
        }
    }
    
    //game over screen 
    if(screen == 4){
        //displays game over text
        fill(0);
        textSize(50);
        textAlign(CENTER, CENTER);
        textFont(fontBold);
        text("Game Over", windowWidth/2, windowHeight/2);
        textSize(30);
        text("Press Enter to return to menu", windowWidth/2, (windowHeight/2)+40);
        //if enter is pressed then start screen is displayed
        if (keyCode == ENTER){
            screen = 1;
            //clears the ellipses array, ready for the game to be played again
            aliens = [];
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
        //if enter is pressed then start screen is displayed
        if (keyCode == ENTER){
            screen = 1;
            //clears the ellipses array, ready for the game to be played again
            aliens = [];
        }
    }
}

//called when mouse is pressed
function mousePressed(){
    //if cloud was hit, ignore mouse pressed
    if(cloud.hit()){
        return;
    }
    //checks through the entire array to see if an alien has been clicked on
    for(i = 0; i < aliens.length; i++){
        aliens[i].hit();
    }
}
//creates a new class called Alien. Aliens are items that fall and the user needs to click them tto destroy them
class Alien{
    //constructor declares the initial variables for the Alien class
    constructor(size){
        //keyword "this", makes sure that the value of said variable is for each instance of Alien
        this.size = size;
        this.size = size;
        //randomly assigns x ensuring it won't overlap with the sides of the window
        this.x = random((0 + 50), (windowWidth - 50));
        this.y = y;
    }
    //function hit, checks if mouse pressed has hit this alien
    hit(){
        //declares a new variable called d, which works out the distance between the mouse and the position of the Alien
        let d = dist(mouseX, mouseY, aliens[i].x, aliens[i].y);
        //if d is less than the size of the Alien
        if(d < aliens[i].size){
            //the ellipse (Alien) that was clicked on will be removed from the aliens array
            aliens.splice(i,1);
            //play pop sound
            pop.play();
            //increase score by 1
            score +=1;
        }
    }
    //moves Alien down the screen
    move(){
        this.y+=4;
    }
    //draws the alien as a circle
    display(){
        //ellipses are coloured in white
        fill(37, 190, 48);
        //sets the origin of the ellipse and size
        ellipse(this.x, this.y, this.size, this.size);
    }
}
//creates a new class called Cloud. Cloud class obstructs the player from clicking on aliens
class Cloud{
    //constructor declares the initial variables for the Cloud class
    constructor(){
        this.init();
    }
    //initialise clous parameters, this is called each time a game is started
    init(){
        this.w = 150;
        this.h = 100;
        this.x = -150
        this.y = 0;
        this.vel = 4;
        this.setLevel(5);
    }
    //set level determines at what level the cloud will move across the window
    setLevel(level){
        this.y = (windowHeight/5) * (5-level);
    }
    //check if mouse was pressed on the cloud
    hit(){
        if(mouseX > this.x && mouseX < this.x + 150 && mouseY > this.y && mouseY < this.y + 100){
            return true;
        }else{
            return false;
        }
    }
    //move the cloud
    move(){
        //moves cloud on x axis by vel
        this.x+= this.vel;
        //if cloud is going off right side of screen, make cloud go left
        if(this.x > windowWidth-150){
            this.vel = -4;
        }
        //if cloud is going off left side of screen, make cloud go right
        if(this.x < 0){
            this.vel = +4;
        }
    }
    //draw the cloud
    display(){
        //cloud is coloured grey (rgb values)
        fill(150, 150, 150);
        rect(this.x, this.y, this.w, this.h);
    }
}