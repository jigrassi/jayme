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

Matrix.prototype.draw = function(x,y) {
    // draw numbers
    for(i = 0; i < this.rows; i++) {
        ctx.fillRect(x, y + i*PADDING*2, this.columns*PADDING*2, 3);
        for(j = 0; j < this.columns; j++) {
            ctx.fillRect(x + j*PADDING*2, y, 3, this.rows*PADDING*2);
            ctx.fillText(this.values[i][j], x + i*PADDING*2 + PADDING, y + j*PADDING*2 + PADDING);
        }
    }
    ctx.fillRect(x, y + this.rows*PADDING*2, this.columns*PADDING*2, 3);
    ctx.fillRect(x + this.rows*PADDING*2, y, 3, this.columns*PADDING*2);
};
// MAIN LOOP STUFF ########################################



// Draw everything
var render = function () {
    ctx.fillStyle = "#000000";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var m = new Matrix(3,3,[[1,0,4],[2,3,2],[1,1,1]]);
    m.draw(100,100);
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