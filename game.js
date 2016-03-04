var game = {
    waiter: -1,    // waiting player
    matches: {},    // matching reference table
    SIZE: 2,
    N: 8,

    // entry protocol
    join: function(newsocket, socketlist) {
        var you = newsocket.id;
        var opp = -1;

        // found waiting player
        if(this.waiter !== -1) {
            opp = this.waiter;
            this.waiter = -1;
            this.matches[opp] = you;
            this.matches[you] = opp;

            // randomize game board
            var turn = Math.floor(Math.random() * 2);
            var matrices = this.genN();

            socketlist[you].emit('matched', {
                turn: turn,
                matrices: matrices,
                m_size: this.SIZE
            });

            socketlist[opp].emit('matched', {
                turn: (turn + 1) % 2,
                matrices: matrices,
                m_size: this.SIZE
            });
        }

        // no one is waiting, start waiting
        if(opp === -1) {
            this.waiter = you;
        }

    },

    // send move to opponent
    move: function(socket, socketlist, move) {
        var opp = this.matches[socket.id]
        socketlist[opp].emit('move', move);
    },

    // exit protocol
    exit: function(socket) {
        // disconnecting client is the waiter, remove it from wait bench
        if(this.waiter === socket.id) {
            this.waiter = -1;
        }
    },

    // generate matrix values
    gen: function () {
        var m = [];
        for(var k = 0; k < this.SIZE; k++) {
            m.push([]);
            for(j = 0; j < this.SIZE; j++) {
                m[k].push(Math.floor(Math.random() * 5) - 1);
            }
        }
        return m;
    },

    genN: function() {
        var matrices = [];
        for(var i = 0; i < this.N; i++) {
            matrices[i] = this.gen();
        }
        return matrices;
    }
};

module.exports = game;