define(['matrix','painter'], function (Matrix, painter) {

      // Create the canvas
    var w = window;
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    canvas.width = w.innerWidth;
    canvas.height = w.innerHeight;
    painter.defaultStyles();

    requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

    if (document.readyState === "complete") { prepareEventHandlers(); }

    function Player(name) {
        this.name = name;
        this.score = 0;
    };

    // MATRIX CONTROL ##################################################
    function Ctrl(matrices, size, players) {
        this.matrices = matrices;
        this.m_size = size;
        this.players = players;
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
                && x <= this.matrices[i].posx + Matrix.WIDTH*this.m_size
                && y >= this.matrices[i].posy
                && y <= this.matrices[i].posy + Matrix.WIDTH*this.m_size) {
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



    // MAIN LOOP STUFF ##############################################

    // Draw everything
    var render = function () {
        painter.drawBG();
        painter.drawMatrices(ctrl);
        painter.drawScores(ctrl);
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

        requestAnimationFrame(main);
    };

    var N = 8;
    var SIZE = 2;
    ctrl = new Ctrl([], SIZE, [new Player("Adam"), new Player("Yibo")]);
    var then = Date.now();

    function run() {
        init_matrices();
        main();
    }

    return {
        run: run
    };
});