// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Draw everything
var render = function () {
    ctx.fillStyle = "#FF55A0";
    ctx.fillRect(0,0,150,75);
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