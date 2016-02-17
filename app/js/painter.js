define([],function() {
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

        drawScores: function(ctrl) {
            ctx.fillText(ctrl.players[0].name, 100, 500);
            ctx.fillText(ctrl.players[0].score, 100, 550);

            ctx.fillText(ctrl.players[1].name, 300, 500);
            ctx.fillText(ctrl.players[1].score, 300, 550);
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