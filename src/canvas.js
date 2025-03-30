const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('dice'))
const ctx = canvas.getContext("2d");




const rows = 40;
const columns = 40;
const width = canvas.width / columns;
const height = canvas.height / rows;
const radius = 2.5;
const padding = 5;

const backgroundColor = "rgb(222,199,160)";

const shadowOffset = 1.4;
const shadowColor = "black"

var dice = Array.from({ length: rows }, () => Array.from({ length: columns }, () => 0)); // Initialize with 0;

for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
        if (dice[i][j] == 0) {
            if (Math.random() > .9 && i + 1 < columns && j + 1 < rows && dice[i][j+1] == 0) {
                dice[i][j] = Math.round(6 * Math.random() + .5) + 6;
                dice[i][j+1] = -1;
                dice[i+1][j] = -2;
                dice[i+1][j+1] = -3;
            } else {
                dice[i][j] = Math.round(6 * Math.random() + .5);
            }
        }  
    }
}

canvas.addEventListener("click", function (e) {
    const x = e.offsetX;
    const y = e.offsetY;

    console.log("Clicked at (" + x + ", " + y + ")");
    rollDice(Math.floor(x/width), Math.floor(y/height));
});




function drawCircle(x,y,r) {
    ctx.beginPath()
    ctx.arc(x,y,r,0,2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function drawDice(n, x, y, width, length, padding, radius, rotate, color) {

    //outline border
    //ctx.strokeStyle = "black";
    //ctx.strokeRect(x,y, width, length);

    

    //color setting
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    //dice value drawing
    if (n == 1) {

        drawCircle(x + width/2, y + length/2, radius, color);

    } else if (n == 2) {

        if (rotate == true) {
            drawCircle(x + padding, y + padding, radius);
            drawCircle(x + width - padding, y + length - padding, radius);
        } else {
            drawCircle(x + padding, y + length - padding, radius);
            drawCircle(x + width - padding, y + padding, radius);
        }
        
    } else if (n == 3) {

        drawCircle(x + width/2, y + length/2, radius, color);

        if (rotate == true) {
            drawCircle(x + padding, y + padding, radius);
            drawCircle(x + width - padding, y + length - padding, radius);
        } else {
            drawCircle(x + padding, y + length - padding, radius);
            drawCircle(x + width - padding, y + padding, radius);
        }
        
    } else if (n == 4) {

        drawCircle(x + padding, y + padding, radius);
        drawCircle(x + width - padding, y + length - padding, radius);
        drawCircle(x + padding, y + length - padding, radius);
        drawCircle(x + width - padding, y + padding, radius);

    } else if (n == 5) {
        
        drawCircle(x + width/2, y + length/2, radius, color);
        drawCircle(x + padding, y + padding, radius);
        drawCircle(x + width - padding, y + length - padding, radius);
        drawCircle(x + padding, y + length - padding, radius);
        drawCircle(x + width - padding, y + padding, radius);
        
    } else if (n == 6) {

        drawCircle(x + padding, y + padding, radius);
        drawCircle(x + width - padding, y + length - padding, radius);
        drawCircle(x + padding, y + length - padding, radius);
        drawCircle(x + width - padding, y + padding, radius);

        if (rotate == true) {
            drawCircle(x + width/2, y + padding, radius);
            drawCircle(x + width/2, y + length - padding, radius);
        } else {
            drawCircle(x + padding, y + length/2, radius);
            drawCircle(x + width - padding, y + length/2, radius);
        }
    }


}

function rollDice(i, j) {
    
    if (dice[i][j] <= 6 && dice[i][j] > 0) {
        dice[i][j]++;
        if (dice[i][j] == 7) {
            dice[i][j] = 1;
        }
        console.log("Dice at (" + i + ", " + j +") incremented");
        renderRoll(i,j);
    }
    
}

function render() {

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
    
            let r = Math.round(Math.random());
            let color = `rgb( ${87 + (168 * ((i + j)/(columns + rows)))},${12 + (243 * ((i + j)/(columns + rows)))},${160 - (160 * ((i + j)/(columns + rows)))})`;
            
            if (dice[i][j] > 6) {
                drawDice(dice[i][j] - 6, i*width + shadowOffset*2, j*height + shadowOffset*2, width*2, height*2, padding*2, radius*2, r, shadowColor);
                drawDice(dice[i][j] - 6, i*width, j*height, width*2, height*2, padding*2, radius*2, r, color);
            } else {
                drawDice(dice[i][j], i*width + shadowOffset, j*height + shadowOffset, width, height, padding, radius, r, shadowColor);
                drawDice(dice[i][j], i*width, j*height, width, height, padding, radius, r, color);
            }
            
        }
    }
}

function renderRoll(i, j) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(i*width, j*height, width, height)

    let r = Math.round(Math.random());
    let color = `rgb( ${87 + (168 * ((i + j)/(columns + rows)))},${12 + (243 * ((i + j)/(columns + rows)))},${160 - (160 * ((i + j)/(columns + rows)))})`;
    

    drawDice(dice[i][j], i*width + shadowOffset, j*height + shadowOffset, width, height, padding, radius, r, shadowColor);
    drawDice(dice[i][j], i*width, j*height, width, height, padding, radius, r, color);
}


render()
