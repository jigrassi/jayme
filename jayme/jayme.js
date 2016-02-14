  // Create the canvas
var w = window;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = w.innerWidth;
canvas.height = w.innerHeight;
document.body.appendChild(canvas);

requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

w.onload = function() {
  prepareEventHandlers();
}

// default styles
ctx.fillStyle = "#000000";
ctx.font = "24px Helvetica";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

// MATRIX #######################################################
var PADDING = 20;
var WIDTH = PADDING*2;
var BORDER_WIDTH = 3;

function Matrix(rows, cols, vals, posx, posy) {
    this.rows = rows;
    this.cols = cols;
    this.vals = vals;
    this.posx = posx;
    this.posy = posy;
};

Matrix.prototype.mult = function(other) {
    if (this.cols != other.rows) {
        throw "error: incompatible sizes";
    }

    var result = [];
    for (var i = 0; i < this.rows; i++) {
        result[i] = [];
        for (var j = 0; j < other.cols; j++) {
            var sum = 0;
            for (var k = 0; k < this.cols; k++) {
                sum += this.vals[i][k] * other.vals[k][j];
            }
            result[i][j] = sum;
        }
    }
    return new Matrix(result);
}

Matrix.prototype.trace = function() {
    var result = 0;
    for (var i = 0; i < this.rows; i++) {
        result += this.vals[i][i];
    }
    return result;
}

Matrix.prototype.draw = function() {
    // draw numbers
    for(var i = 0; i < this.rows; i++) {
        ctx.fillRect(this.posx, this.posy + i*PADDING*2, this.cols*PADDING*2, BORDER_WIDTH);
        for(var j = 0; j < this.cols; j++) {
            ctx.fillRect(this.posx + j*PADDING*2, this.posy, BORDER_WIDTH, this.rows*PADDING*2);
            ctx.fillText(this.vals[i][j], this.posx + i*PADDING*2 + PADDING, this.posy + j*PADDING*2 + PADDING);
        }
    }
    // + extra BORDER_WIDTH is needed to fill out the corner
    ctx.fillRect(this.posx, this.posy + this.rows*PADDING*2, this.cols*PADDING*2+BORDER_WIDTH, BORDER_WIDTH);
    ctx.fillRect(this.posx + this.rows*PADDING*2, this.posy, BORDER_WIDTH, this.cols*PADDING*2);
};

// MATRIX CONTROL ##################################################
function Ctrl(matrices, size) {
  this.matrices = matrices;
  this.m_size = size;
};

Ctrl.prototype.push = function(matrix) {
  this.matrices.push(matrix);
};

Ctrl.prototype.pop = function(index) {
  index = index || 0
  this.matrices.splice(index,1)
};

Ctrl.prototype.select = function(x,y) {
  for(var i = 0; i < this.matrices.length; i++) {
    if(x >= this.matrices[i].posx
      && x <= this.matrices[i].posx + WIDTH*this.m_size
      && y >= this.matrices[i].posy
      && y <= this.matrices[i].posy + WIDTH*this.m_size) {
      return i;
    }
  }
};

Ctrl.prototype.arrange = function(f) {
  // call the function rearrange matrices on the canvas
  f(this.matrices);
}

// CLICKING #######################################################

// called by window.onload, to make sure canvas is loaded before attaching listener
function prepareEventHandlers() {
  var canvasPosition = {
    x: canvas.offsetLeft,
    y: canvas.offsetTop
  };

  canvas.addEventListener('click', function(e) {
    var mouse = {
        x: e.pageX - canvasPosition.x,
        y: e.pageY - canvasPosition.y
    };

    m_id = ctrl.select(mouse.x, mouse.y);

    if(m_id || m_id == 0) {
      ctrl.pop(m_id);
    }
  }, false);
}

// VIEWS ######################################################

// background
var drawBG = function() {
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

// matrices
function drawMatrices() {
  ctx.save();
  for(var i = 0; i < ctrl.matrices.length; i++) {
    ctrl.matrices[i].draw();
  }
  ctx.restore();
};

// MAIN LOOP STUFF ##############################################

// Draw everything
var render = function () {
    drawBG();
    drawMatrices();
};

function genMatrixVals(size) {
  var m = [];
  for(var k = 0; k < size; k++) {
    m.push([]);
    for(j = 0; j < size; j++) {
      m[k].push(Math.floor(Math.random()*5)-1);
    }
  }
  return m;
}

function init_matrices() {
  for(var i = 0; i < N; i++) {
    ctrl.matrices.push(new Matrix(SIZE, SIZE, genMatrixVals(SIZE), 80*i, 80*i));
  }
}

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

var N = 8;
var SIZE = 2;
ctrl = new Ctrl([], SIZE);
var then = Date.now();
init_matrices();
main();
