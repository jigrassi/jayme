// Create the canvas
var w = window;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = w.innerWidth;
canvas.height = w.innerHeight;
document.body.appendChild(canvas);

requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

ctx.translate(canvas.width/2, canvas.height/2);

// default styles
ctx.fillStyle = "#000000";
ctx.font = "24px Helvetica";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

// MATRIX #######################################################
var PADDING = 20;

function Matrix(rows, columns, values) {
    this.rows = rows;
    this.columns = columns;
    this.values = values;
};

// returns a new matrix
Matrix.prototype.mult = function(other) {
    if (this.columns != other.rows) {
        throw "error: incompatible sizes";
    }
 
    var result = [];
    for (var i = 0; i < this.rows; i++) {
        result[i] = [];
        for (var j = 0; j < other.columns; j++) {
            var sum = 0;
            for (var k = 0; k < this.columns; k++) {
                sum += this.values[i][k] * other.values[k][j];
            }
            result[i][j] = sum;
        }
    }
    return new Matrix(result); 
}

Matrix.prototype.trace = function() {
    var result = 0;
    for (var i = 0; i < this.rows; i++) {
        result += this.values[i][i];
    }
    return result;
}
 

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

// CLICKING #######################################################

// calculate position of the canvas DOM element on the page

var canvasPosition = {
    x: canvas.offset().left,
    y: canvas.offset().top
};

canvas.on('click', function(e) {

    // use pageX and pageY to get the mouse position
    // relative to the browser window

    var mouse = {
        x: e.pageX - canvasPosition.x,
        y: e.pageY - canvasPosition.y
    }

    // now you have local coordinates,
    // which consider a (0,0) origin at the
    // top-left of canvas element
});

// MAIN LOOP STUFF ##############################################

var drawBG = function() {
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

// Draw everything
var render = function () {
    drawBG();
    var m = new Matrix(3,3,[[1,0,4],[2,3,2],[1,1,1]]);
    m.draw(100, 100);
    ctx.rotate(0.01)
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


var then = Date.now();
main();