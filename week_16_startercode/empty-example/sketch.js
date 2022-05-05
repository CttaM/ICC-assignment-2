//declares an emptry array
let ellipses = [];
//declares variables that are global
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
//preload specifies how the audio will be used, in this case it is assignmed to a variable
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
    //sets the cariable of c2 to a rgb value
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
            //
            line(0,y,width, y);
    }   
    //display start screen when screen = 1
    if(screen == 1){
    c1 = color(255);
    c2 = color(63, 191, 191);
    fill(0);
    textSize(50);
    textAlign(CENTER, CENTER);
    textFont(fontBold);
    text("Press 1 for easy mode", windowWidth/2, windowHeight/2);
    text("Press 2 for hard mode", windowWidth/2, (windowHeight/2)+50);
    
    //if 1 is pressed, then easy mode is selected, variable values are set to the following
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
    //if 2 is pressed, then hard mode is selected, variable values are set to the following
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
    //because easy mode was slected, screen = 2, so now will run easy mode code
    if(screen == 2){
        //
        if (frameCount % spawnRate == 0) {
            //count counts how many aliens have been drawn
            count ++;
            //every 10 aliens, the cloud drops down one level
            if(count % 10 == 0){
                size -= 10;
                spawnRate -= 5;
                level --;
                cloud.setLevel(level);
            }
            //draws a new alien
            ellipses.push(new Alien(size));
        }
        //for loop going through the entire array
        for(i = 0; i < ellipses.length; i++){
            //function used to move all ellipses in the array
            ellipses[i].move();
            //function used to draw all the ellipses in the array
            ellipses[i].display();
            //checks to see if the y position of the ellipses have gone off the bottom of the screen
            if(ellipses[i].y > windowHeight){
                //if above statement is true, then health to decrease by 1
                health -=1;
                //removes the ellipse from the array, so it is longer drawn
                ellipses.splice(i,1);
                //play sound called squelch
                squelch.play();
            }
        }
        //function to move cloud across the screen
        cloud.move();
        //function to draw the cloud
        cloud.display();
        //display the player's score for them to see
        fill(0);
        textSize(24);
        textAlign(LEFT, CENTER);
        text("Score:" + score, 10, (windowHeight-30));
        //displays the player's health for them to see
        fill(0);
        textSize(24);
        textAlign(RIGHT, CENTER);
        text("Health:" + health, (windowWidth-20), (windowHeight-30));
        //displays the level that the player is on
        fill(0);
        textSize(24);
        textAlign(CENTER, CENTER);
        text("Level:" + level, (windowWidth/2), (windowHeight-30));
        //checks the player's health, if health = 0 then game ends and goes to game over screen
        if(health <= 0){
            //plays souns called end
            end.play();
            screen = 4;
        }
        //checks what level the player is at, if level = 0 then game ends and goes to victory screen
        if(level == 0){
            //plays sound called victory
            victory.play();
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
        //if enter is pressed then start screen is displayed
        if (keyCode == ENTER){
            screen = 1;
            //clears the ellipses array, ready for the game to be played again
            ellipses = [];
        }
    }
}

//function called when mouse is pressed
function mousePressed(){
    //if cloud hit function is called, then exit out of mouse pressed function
    if(cloud.hit()){
        return;
    }
    //checks through the entire array to see if an ellipse has been clicked on
    for(i = 0; i < ellipses.length; i++){
        ellipses[i].hit();
    }
}
//creates a new class called Alien
class Alien{
    //constructor declares the initial variables for the Alien class
    constructor(size){
        //keyword "this", makes sure that the value of said variable is for each instance of Alien
        this.size = size;
        this.size = size;
        //randomly assigns x somewhere between 50 and 50 in from the right of the screen, this ensures that the Aliens are drawn on screen
        this.x = random((0 + 50), (windowWidth - 50));
        this.y = y;
    }
    //function hit is what enables the Aliens to be clicked on and destroyed
    hit(){
        //declares a new variable called d, which works out the distance between the mouse and the position of the Alien
        let d = dist(mouseX, mouseY, ellipses[i].x, ellipses[i].y);
        //if d is less than the size of the Alien
        if(d < ellipses[i].size){
            //the ellipse (Alien) that was clicked on will be removed from the ellipse
            ellipses.splice(i,1);
            //play sound called pop
            pop.play();
            //increase score by 1
            score +=1;
            //console.log(score);
        }
    }
    //moves Alien down the screen by 4
    move(){
        this.y+=4;
    }
    //draws the ellipses
    display(){
        //ellipses are coloured in white
        fill(255);
        //sets the origin of the ellipse and size
        ellipse(this.x, this.y, this.size, this.size);
    }
}
//creates a new class called Cloud
class Cloud{
    //constructor declares the initial variables for the Cloud class
    constructor(){
        this.init();
    }
    //need Dad
    init(){
        this.w = 150;
        this.h = 100;
        this.x = -150
        this.y = 0;
        this.vel = 4;
        this.setLevel(5);
    }
    //set level determines at what level the cloud will move across
    setLevel(level){
        this.y = (windowHeight/5) * (5-level);
    }
    //if the is over the cloud when pressed
    hit(){
        if(mouseX > this.x && mouseX < this.x + 150 && mouseY > this.y && mouseY < this.y + 100){
            return true;
        }else{
            return false;
        }
    }
    //function to move the cloud
    move(){
        //moves cloud on x axis by four(vel)
        this.x+= this.vel;
        //if cloud is going off screen, then reverse velocity
        if(this.x > windowWidth-150){
            this.vel = -4;
        }
        if(this.x < 0){
            this.vel = +4;
        }
    }
    //draws the cloud
    display(){
        //cloud is coloured red (rgb values)
        fill(255, 10, 2);
        rect(this.x, this.y, this.w, this.h);
    }
}