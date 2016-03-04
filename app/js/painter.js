define(function() {
    var canvas = document.getElementById("game");
    var ctx  = canvas.getContext("2d");

    var painter = {

        drawBG: function() {
            ctx.save();
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        },

        drawMatrices: function(ctrl) {
            ctx.save();
            for(var i = 0; i < ctrl.matrices.length; i++) {
                ctrl.matrices[i].draw(ctx);
            }
            ctx.restore();
        },

        drawPlayerData: function(ctrl) {
            ctx.fillText(ctrl.players[0].name, 250, 350);
            ctrl.players[0].matrix.draw(ctx);
            ctx.fillText(ctrl.players[0].matrix.trace(), 250, 550);
            ctx.fillText(ctrl.players[0].score, 250, 600);

            ctx.fillText(ctrl.players[1].name, 500, 350);
            ctrl.players[1].matrix.draw(ctx);
            ctx.fillText(ctrl.players[1].matrix.trace(), 500, 550);
            ctx.fillText(ctrl.players[1].score, 500, 600);
        },

        drawWaiting: function() {
            ctx.save();
            ctx.font = "40px Helvetica";
            ctx.fillText('Looking for opponent...', canvas.width/2, canvas.height/2);
            ctx.restore();
        },

        drawTurn: function(id) {
            ctx.save();
            if(id == 0) {
                ctx.fillText('Your Turn', 380, 310);
            } else {
                ctx.fillText('Opponent\'s Turn', 380, 310);
            }
            ctx.restore();
        },

        drawDisconnect: function() {
            ctx.save();
            ctx.font = "40px Helvetica";
            ctx.fillText('Your opponent has left the game.', canvas.width/2, canvas.height/2);
            ctx.restore();
        },

        defaultStyles: function() {
            ctx.fillStyle = "#000000";
            ctx.font = "24px Helvetica";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
        }
    };

    return painter;
});