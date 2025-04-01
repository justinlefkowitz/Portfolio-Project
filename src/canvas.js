//initialize canvas
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('dice'))
const ctx = canvas.getContext("2d");



//set variables
const rows = 40;
const columns = 80;
const width = canvas.width / columns;
const height = canvas.height / rows;
const radius = 2.5 ;
const padding = 5 ;

const backgroundColor = "rgb(222,199,160)";

const shadowOffset = 1;
const shadowColor = "black";

const drawBorders = false;

var dice;


//Dice class with constructor, draw and roll methods
class Dice {

    constructor(n, x, y, size, padding, radius, rotate, color, shadowOffset, shadowColor, isBorder) {
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

    }

    drawCircle(x,y,r) {
        ctx.beginPath()
        ctx.arc(x,y,r,0,2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    drawShadow() {
        ctx.fillStyle = this.shadowColor;

        if (this.n == 1) {

            this.drawCircle(this.x + this.width/2 + this.shadowOffset, this.y + this.height/2 + this.shadowOffset, this.radius);

        } else if (this.n == 2) {

            if (this.rotate == true) {
                this.drawCircle(this.x + this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
                this.drawCircle(this.x + this.width - this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            } else {
                this.drawCircle(this.x + this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
                this.drawCircle(this.x + this.width - this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
            }
            
        } else if (this.n == 3) {

            this.drawCircle(this.x + this.width/2 + this.shadowOffset, this.y + this.height/2 + this.shadowOffset, this.radius);

            if (this.rotate == true) {
                this.drawCircle(this.x + this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
                this.drawCircle(this.x + this.width - this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            } else {
                this.drawCircle(this.x + this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
                this.drawCircle(this.x + this.width - this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
            }
            
        } else if (this.n == 4) {

            this.drawCircle(this.x + this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
            this.drawCircle(this.x + this.width - this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            this.drawCircle(this.x + this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            this.drawCircle(this.x + this.width - this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);

        } else if (this.n == 5) {
            
            this.drawCircle(this.x + this.width/2 + this.shadowOffset, this.y + this.height/2 + this.shadowOffset, this.radius);
            this.drawCircle(this.x + this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
            this.drawCircle(this.x + this.width - this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            this.drawCircle(this.x + this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            this.drawCircle(this.x + this.width - this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
            
        } else if (this.n == 6) {

            this.drawCircle(this.x + this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
            this.drawCircle(this.x + this.width - this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            this.drawCircle(this.x + this.padding + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            this.drawCircle(this.x + this.width - this.padding + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);

            if (this.rotate == true) {
                this.drawCircle(this.x + this.width/2 + this.shadowOffset, this.y + this.padding + this.shadowOffset, this.radius);
                this.drawCircle(this.x + this.width/2 + this.shadowOffset, this.y + this.height - this.padding + this.shadowOffset, this.radius);
            } else {
                this.drawCircle(this.x + this.padding + this.shadowOffset, this.y + this.height/2 + this.shadowOffset, this.radius);
                this.drawCircle(this.x + this.width - this.padding + this.shadowOffset, this.y + this.height/2 + this.shadowOffset, this.radius);
            }
        }
    }
    drawDice() {

        ctx.fillStyle = backgroundColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        if (this.isBorder) {
            ctx.strokeStyle = "black";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        
        this.drawShadow()
        //color setting
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;

        //dice value drawing
        if (this.n == 1) {

            this.drawCircle(this.x + this.width/2, this.y + this.height/2, this.radius);

        } else if (this.n == 2) {

            if (this.rotate == true) {
                this.drawCircle(this.x + this.padding, this.y + this.padding, this.radius);
                this.drawCircle(this.x + this.width - this.padding, this.y + this.height - this.padding, this.radius);
            } else {
                this.drawCircle(this.x + this.padding, this.y + this.height - this.padding, this.radius);
                this.drawCircle(this.x + this.width - this.padding, this.y + this.padding, this.radius);
            }
            
        } else if (this.n == 3) {

            this.drawCircle(this.x + this.width/2, this.y + this.height/2, this.radius);

            if (this.rotate == true) {
                this.drawCircle(this.x + this.padding, this.y + this.padding, this.radius);
                this.drawCircle(this.x + this.width - this.padding, this.y + this.height - this.padding, this.radius);
            } else {
                this.drawCircle(this.x + this.padding, this.y + this.height - this.padding, this.radius);
                this.drawCircle(this.x + this.width - this.padding, this.y + this.padding, this.radius);
            }
            
        } else if (this.n == 4) {

            this.drawCircle(this.x + this.padding, this.y + this.padding, this.radius);
            this.drawCircle(this.x + this.width - this.padding, this.y + this.height - this.padding, this.radius);
            this.drawCircle(this.x + this.padding, this.y + this.height - this.padding, this.radius);
            this.drawCircle(this.x + this.width - this.padding, this.y + this.padding, this.radius);

        } else if (this.n == 5) {
            
            this.drawCircle(this.x + this.width/2, this.y + this.height/2, this.radius);
            this.drawCircle(this.x + this.padding, this.y + this.padding, this.radius);
            this.drawCircle(this.x + this.width - this.padding, this.y + this.height - this.padding, this.radius);
            this.drawCircle(this.x + this.padding, this.y + this.height - this.padding, this.radius);
            this.drawCircle(this.x + this.width - this.padding, this.y + this.padding, this.radius);
            
        } else if (this.n == 6) {

            this.drawCircle(this.x + this.padding, this.y + this.padding, this.radius);
            this.drawCircle(this.x + this.width - this.padding, this.y + this.height - this.padding, this.radius);
            this.drawCircle(this.x + this.padding, this.y + this.height - this.padding, this.radius);
            this.drawCircle(this.x + this.width - this.padding, this.y + this.padding, this.radius);

            if (this.rotate == true) {
                this.drawCircle(this.x + this.width/2, this.y + this.padding, this.radius);
                this.drawCircle(this.x + this.width/2, this.y + this.height - this.padding, this.radius);
            } else {
                this.drawCircle(this.x + this.padding, this.y + this.height/2, this.radius);
                this.drawCircle(this.x + this.width - this.padding, this.y + this.height/2, this.radius);
            }
        }

    }

    rollDice() {
            
        if (this.n <= 6 && this.n > 0) {
            this.n++;
            if (this.n == 7) {
                this.n = 1;
            }
            console.log("Dice at (" + Math.floor(this.x/this.width) + ", " + Math.floor(this.y/this.height) +") incremented");
            this.drawDice(ctx);
        } else {
            console.log("oopsies dice out of bounds here");
        }
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

    dice[i-b][j-a].rollDice();


    
});

    
//sets dice matrix
function initialize() {
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
                if (Math.random() > .92 && i + 1 < columns && j + 1 < rows && dice[i][j+1] == 0) {
                    dice[i][j] = new Dice(Math.round(6 * Math.random() + .5), i*width, j*height, 2, padding, radius, Math.round(Math.random()), `rgb( ${87 + (168 * ((i + j)/(columns + rows)))},${12 + (243 * ((i + j)/(columns + rows)))},${160 - (160 * ((i + j)/(columns + rows)))})`, shadowOffset, shadowColor, drawBorders);
                    dice[i][j+1] = -1;
                    dice[i+1][j] = -2;
                    dice[i+1][j+1] = -3;
                } else {
                    dice[i][j] = new Dice(Math.round(6 * Math.random() + .5), i*width, j*height, 1, padding, radius, Math.round(Math.random()), `rgb( ${87 + (168 * ((i + j)/(columns + rows)))},${12 + (243 * ((i + j)/(columns + rows)))},${160 - (160 * ((i + j)/(columns + rows)))})`, shadowOffset, shadowColor, drawBorders);
                }
            }
            
        }
        
    }
    console.log(dice);
}

//renders entire dice matrix
function render() {

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {

            if (dice[i][j] != -1 && dice[i][j] != -2 && dice[i][j] != -3) { 
                dice[i][j].drawDice();
            }
            
            
            
            /*
            let r = Math.round(Math.random());
            let color = `rgb( ${87 + (168 * ((i + j)/(columns + rows)))},${12 + (243 * ((i + j)/(columns + rows)))},${160 - (160 * ((i + j)/(columns + rows)))})`;
            
            if (dice[i][j] > 6) {
                drawDice(dice[i][j] - 6, i*width + shadowOffset*2, j*height + shadowOffset*2, width*2, height*2, padding*2, radius*2, r, shadowColor);
                drawDice(dice[i][j] - 6, i*width, j*height, width*2, height*2, padding*2, radius*2, r, color);
            } else {
                drawDice(dice[i][j], i*width + shadowOffset, j*height + shadowOffset, width, height, padding, radius, r, shadowColor);
                drawDice(dice[i][j], i*width, j*height, width, height, padding, radius, r, color);
            }
            */

            
            
        }
    }
}



initialize();
render()

