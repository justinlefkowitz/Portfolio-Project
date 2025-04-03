//initialize canvas
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('dice'))
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



//set variables
const width = 20;
const height = 20;
var rows = canvas.height / height;
var columns = canvas.width / width;
const radius = Math.min(width, height) / 10; 
const padding = Math.min(width, height) / 5; 

const backgroundColor = "rgb(222,199,160)";

const shadowOffset = radius / 2;
const shadowColor = "black";

const drawBorders = false;

const largeDicePercentage = .05;

const isTargeted = false;
const isRandom = true;


var dice;






//Dice class with constructor, draw and roll methods
class Dice {

    constructor(n, x, y, size, padding, radius, rotate, color, shadowOffset, shadowColor, isBorder, isTargeted, isRandom) {
        this.n = n;
        this.x = x;
        this.y = y;
        this.size = size;
        this.radius = radius * size;
        this.padding = padding * size;
        this.rotate = rotate;
        this.color = color;  
        this.shadowOffset = shadowOffset * size;
        this.shadowColor = shadowColor;
        this.isBorder = isBorder;
        this.width = width * size;
        this.height = height * size;

        this.target = 6;
        this.isTargeted = isTargeted;
        this.isRandom = isRandom;

    }

    drawCircle(context, x,y,r) {
        context.beginPath()
        context.arc(x,y,r,0,2 * Math.PI);
        context.fill();
        context.stroke();
    }

    drawShadow(context) {
        context.fillStyle = this.shadowColor;
        context.strokeStyle = this.shadowColor;

        if (this.n == 1) {

            this.drawCircle(context, this.x + this.width/2 + this.shadowOffset, this.y + this.height/2 + this.shadowOffset, this.radius);

        } else if (this.n == 2) {

            if (this.rotate == true) {
                this.drawCircle(context, this.x + this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
                this.drawCircle(context, this.x + this.width - this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            } else {
                this.drawCircle(context, this.x + this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
                this.drawCircle(context, this.x + this.width - this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
            }
            
        } else if (this.n == 3) {

            this.drawCircle(context, this.x + this.width/2 + this.shadowOffset, this.y + this.height/2 + this.shadowOffset, this.radius);

            if (this.rotate == true) {
                this.drawCircle(context, this.x + this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
                this.drawCircle(context, this.x + this.width - this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            } else {
                this.drawCircle(context, this.x + this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
                this.drawCircle(context, this.x + this.width - this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
            }
            
        } else if (this.n == 4) {

            this.drawCircle(context, this.x + this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
            this.drawCircle(context, this.x + this.width - this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            this.drawCircle(context, this.x + this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            this.drawCircle(context, this.x + this.width - this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);

        } else if (this.n == 5) {
            
            this.drawCircle(context, this.x + this.width/2 + this.shadowOffset, this.y + this.height/2 + this.shadowOffset, this.radius);
            this.drawCircle(context, this.x + this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
            this.drawCircle(context, this.x + this.width - this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            this.drawCircle(context, this.x + this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            this.drawCircle(context, this.x + this.width - this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
            
        } else if (this.n == 6) {

            this.drawCircle(context, this.x + this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
            this.drawCircle(context, this.x + this.width - this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            this.drawCircle(context, this.x + this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            this.drawCircle(context, this.x + this.width - this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);

            if (this.rotate == true) {
                this.drawCircle(context, this.x + this.width/2 + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
                this.drawCircle(context, this.x + this.width/2 + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            } else {
                this.drawCircle(context, this.x + this.padding + this.shadowOffset, this.y + this.height/2 + this.shadowOffset, this.radius);
                this.drawCircle(context, this.x + this.width - this.padding + this.shadowOffset, this.y + this.height/2 + this.shadowOffset, this.radius);
            }
        }
    }

    draw(context) {

        context.fillStyle = backgroundColor;
        context.fillRect(this.x, this.y, this.width, this.height);

        if (this.isBorder) {
            context.strokeStyle = "black";
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        
        this.drawShadow(context)
        //color setting
        context.fillStyle = this.color;
        context.strokeStyle = this.color;

        //dice value drawing
        if (this.n == 1) {

            this.drawCircle(context, this.x + this.width/2, this.y + this.height/2, this.radius);

        } else if (this.n == 2) {

            if (this.rotate == true) {
                this.drawCircle(context, this.x + this.padding, this.y + this.padding, this.radius);
                this.drawCircle(context, this.x + this.width - this.padding, this.y + this.height - this.padding, this.radius);
            } else {
                this.drawCircle(context, this.x + this.padding, this.y + this.height - this.padding, this.radius);
                this.drawCircle(context, this.x + this.width - this.padding, this.y + this.padding, this.radius);
            }
            
        } else if (this.n == 3) {

            this.drawCircle(context, this.x + this.width/2, this.y + this.height/2, this.radius);

            if (this.rotate == true) {
                this.drawCircle(context, this.x + this.padding, this.y + this.padding, this.radius);
                this.drawCircle(context, this.x + this.width - this.padding, this.y + this.height - this.padding, this.radius);
            } else {
                this.drawCircle(context, this.x + this.padding, this.y + this.height - this.padding, this.radius);
                this.drawCircle(context, this.x + this.width - this.padding, this.y + this.padding, this.radius);
            }
            
        } else if (this.n == 4) {

            this.drawCircle(context, this.x + this.padding, this.y + this.padding, this.radius);
            this.drawCircle(context, this.x + this.width - this.padding, this.y + this.height - this.padding, this.radius);
            this.drawCircle(context, this.x + this.padding, this.y + this.height - this.padding, this.radius);
            this.drawCircle(context, this.x + this.width - this.padding, this.y + this.padding, this.radius);

        } else if (this.n == 5) {
            
            this.drawCircle(context, this.x + this.width/2, this.y + this.height/2, this.radius);
            this.drawCircle(context, this.x + this.padding, this.y + this.padding, this.radius);
            this.drawCircle(context, this.x + this.width - this.padding, this.y + this.height - this.padding, this.radius);
            this.drawCircle(context, this.x + this.padding, this.y + this.height - this.padding, this.radius);
            this.drawCircle(context, this.x + this.width - this.padding, this.y + this.padding, this.radius);
            
        } else if (this.n == 6) {

            this.drawCircle(context, this.x + this.padding, this.y + this.padding, this.radius);
            this.drawCircle(context, this.x + this.width - this.padding, this.y + this.height - this.padding, this.radius);
            this.drawCircle(context, this.x + this.padding, this.y + this.height - this.padding, this.radius);
            this.drawCircle(context, this.x + this.width - this.padding, this.y + this.padding, this.radius);

            if (this.rotate == true) {
                this.drawCircle(context, this.x + this.width/2, this.y + this.padding, this.radius);
                this.drawCircle(context, this.x + this.width/2, this.y + this.height - this.padding, this.radius);
            } else {
                this.drawCircle(context, this.x + this.padding, this.y + this.height/2, this.radius);
                this.drawCircle(context, this.x + this.width - this.padding, this.y + this.height/2, this.radius);
            }
        }

    }

    increment() {
        if (this.n <= 6 && this.n > 0) {
            this.n++;
            this.rotate = Math.round(Math.random());
            if (this.n == 7) {
                this.n = 1;
            }
            console.log("Dice at (" + Math.floor(this.x/this.width) + ", " + Math.floor(this.y/this.height) +") incremented");
        } else {
            console.log("oopsies dice out of bounds here");
        }
    }

    random() {
        this.n = Math.round(6 * Math.random() + .5);
        this.rotate = Math.round(Math.random());
    }

    setColor(color) {
        this.color = color
    }

    set(num) {
        this.n = num;
    }

    setTarget(num) {
        this.target = num;
    }
    

    update(context) {
        if (this.velocity > 1) {
            
            
            setTimeout(() => { 

                if (this.isRandom) {
                    this.random();
                } else {
                    this.increment();
                }
                
                this.draw(context);

            }, 2000 / this.velocity);
            this.velocity -= this.acceleration;
            
        } 
        else if (this.isRolling && this.isTargeted) { 
            console.log("yo");
            this.isRolling = false;
            setTimeout(() => { 

                this.set(this.target);
                this.draw(context);

            }, 2000);
        } 

    }



    roll() {
        this.acceleration = .1 + (Math.random() * 0.1);
        this.velocity = 5 * Math.random() + 20;
        this.isRolling = true;
    }
}

//mouse click listener to roll selected dice
canvas.addEventListener("click", function (e) {
    let a = 0;
    let b = 0;


    const i = Math.floor(e.offsetX/width)
    const j = Math.floor(e.offsetY/height);
    if (dice[i][j] == -1) {
        a = 1;
    } else if (dice[i][j] == -2) {
        b = 1;
    } else if (dice[i][j] == -3) {
        a = 1;
        b = 1;
    } 

    dice[i-b][j-a].roll();


    
});

//prevents window resizing by wheel
document.addEventListener("wheel", (e) => {
    if (e.ctrlKey) {
        e.preventDefault();
    }
        
    
}, { passive: false });


//prevent window resizing using crtl + plus or crtl + minus
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=') || (e.key === '_' )) {
        e.preventDefault();
    }
}, { passive: false });



//resizes canvas on window resize
window.addEventListener("resize", function (e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / width;
    rows = canvas.height / height;
    updateDiceMatrix();
    render()
}, { passive: true });



function initialize() {
    initializeDiceMatrix()
    render();
}

//initialize dice matrix to random values on page load
function initializeDiceMatrix() {
    dice = []

    for (let i = 0; i < columns; i++) {
        dice[i] = [];
        for (let j = 0; j < rows; j++) {

            dice[i][j] = 0;

        } 
    }

    
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (dice[i][j] != -1 && dice[i][j] != -2 && dice[i][j] != -3) {
                if (Math.random() > (1-largeDicePercentage) && i + 1 < columns && j + 1 < rows && dice[i][j+1] == 0) {
                    dice[i][j] = new Dice(Math.round(6 * Math.random() + .5), i*width, j*height, 2, padding, radius, Math.round(Math.random()), `rgb( ${87 + (168 * ((i + j)/(columns + rows)))},${12 + (243 * ((i + j)/(columns + rows)))},${160 - (160 * ((i + j)/(columns + rows)))})`, shadowOffset, shadowColor, drawBorders, isTargeted, isRandom);
                    dice[i][j+1] = -1;
                    dice[i+1][j] = -2;
                    dice[i+1][j+1] = -3;
                } else {
                    dice[i][j] = new Dice(Math.round(6 * Math.random() + .5), i*width, j*height, 1, padding, radius, Math.round(Math.random()), `rgb( ${87 + (168 * ((i + j)/(columns + rows)))},${12 + (243 * ((i + j)/(columns + rows)))},${160 - (160 * ((i + j)/(columns + rows)))})`, shadowOffset, shadowColor, drawBorders, isTargeted, isRandom);
                }
            }
            
        }
        
    }
    render()
}



//called upon window resizing to generate newdice beyond the window size
function updateDiceMatrix() {

    for (let i = 0; i < columns; i++) {
        if (dice[i+1] == undefined) {
            dice[i+1] = [];

        }
        for (let j = 0; j < rows; j++) {
            if (dice[i][j] == undefined) {
    
                if (Math.random() > (1-largeDicePercentage) && i + 1 < columns && j + 1 < rows && dice[i][j+1] == undefined) {
                    dice[i][j] = new Dice(Math.round(6 * Math.random() + .5), i*width, j*height, 2, padding, radius, Math.round(Math.random()), `rgb( ${87 + (168 * ((i + j)/(columns + rows)))},${12 + (243 * ((i + j)/(columns + rows)))},${160 - (160 * ((i + j)/(columns + rows)))})`, shadowOffset, shadowColor, drawBorders, isTargeted, isRandom);
                    dice[i][j+1] = -1;
                    dice[i+1][j] = -2;
                    dice[i+1][j+1] = -3;
                } else {
                    dice[i][j] = new Dice(Math.round(6 * Math.random() + .5), i*width, j*height, 1, padding, radius, Math.round(Math.random()), `rgb( ${87 + (168 * ((i + j)/(columns + rows)))},${12 + (243 * ((i + j)/(columns + rows)))},${160 - (160 * ((i + j)/(columns + rows)))})`, shadowOffset, shadowColor, drawBorders, isTargeted, isRandom);
                }
            
            } else if (dice[i][j] != -1 && dice[i][j] != -2 && dice[i][j] != -3) {
                dice[i][j].setColor(`rgb( ${87 + (168 * ((i + j)/(columns + rows)))},${12 + (243 * ((i + j)/(columns + rows)))},${160 - (160 * ((i + j)/(columns + rows)))})`)
            }
        }

    }

}

//renders entire dice matrix
function render() {

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {

            if (dice[i][j] != -1 && dice[i][j] != -2 && dice[i][j] != -3) { 
                dice[i][j].draw(ctx);
            }
            

        }
    }
}

//animation loop that updates dice based on their state, and requests the next animation frame
function updateDice(){
    requestAnimationFrame(updateDice);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (dice[i][j].isRolling) { 
                dice[i][j].update(ctx);
            }
        }
    }
}


initialize();
updateDice();