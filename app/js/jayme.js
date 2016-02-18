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
        this.matrix = new Matrix(SIZE, SIZE, [[1, 0], [0, 1]], 0, 0);
        this.score = 0;
    };

    // MATRIX CONTROL ##################################################
    function Ctrl(matrices, size, players) {
        this.matrices = matrices;
        this.m_size = size;
        this.players = players;
        this.turn = 0; // alternates between 0 and 1
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
                && x <= this.matrices[i].posx + Matrix.WIDTH * this.m_size
                && y >= this.matrices[i].posy
                && y <= this.matrices[i].posy + Matrix.WIDTH * this.m_size) {
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
                console.log(ctrl.players[ctrl.turn].matrix);
                ctrl.players[ctrl.turn].matrix.mult(ctrl.matrices[m_id]);
                ctrl.pop(m_id);
                ctrl.turn = (ctrl.turn + 1) % ctrl.players.length
            }
        }, false);
    }

    // MAIN LOOP STUFF ##############################################

    // Draw everything
    var render = function () {
        painter.drawBG();
        painter.drawMatrices(ctrl);
        painter.drawPlayerData(ctrl);
    };

    function genMatrixVals(size) {
        var m = [];
        for(var k = 0; k < size; k++) {
            m.push([]);
            for(j = 0; j < size; j++) {
                m[k].push(Math.floor(Math.random() * 5) - 1);
            }
        }
        return m;
    }

    function genMatrices() {
        var matrices = [];
        var rowSize = Math.ceil(N / 2);
        for(var i = 0; i < N; i++) {
            matrices.push(new Matrix(SIZE, SIZE, genMatrixVals(SIZE),
                          100 + 150 * (i % rowSize), 50 + 150 * Math.floor(i / rowSize)));
        }
        return matrices;
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
    var players = [new Player("Adam"), new Player("Yibo")];
    players[0].matrix.posx = 210;
    players[0].matrix.posy = 400;
    players[1].matrix.posx = 460;
    players[1].matrix.posy = 400;
    ctrl = new Ctrl(genMatrices(), SIZE, players);
    var then = Date.now();

    function run() {
        main();
    }

    return {
        run: run
    };
});