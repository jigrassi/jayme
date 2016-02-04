// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// #######################################################
var PADDING = 20;

function Matrix(rows, columns, values) {
    this.rows = rows;
    this.columns = columns;
    this.values = values;
};

Matrix.prototype.drawNums = function(x,y) {
    for(i = 0; i < this.rows; i++) {
        for(j = 0; j < this.columns; j++) {
            ctx.fillText(this.values[i][j], x + i*PADDING, y + j*PADDING);
        }
    }
};
// MAIN LOOP STUFF ########################################



// Draw everything
var render = function () {
    ctx.fillStyle = "#000000";
    var m = new Matrix(2,2,[[1,0],[2,3]]);
    ctx.fillRect(100,100)
    m.drawNums(100,100);
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    //update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var then = Date.now();
main();