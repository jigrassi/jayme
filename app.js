var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var game = require('./game.js');
// middleware
app.use(function(req, res, next) {
    console.log(`${req.method} request for '${req.url}`);
    next();
});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('./app'));

// socket.io
// =============================================================================
io.on('connection', function(socket){
    game.join(socket, io.sockets.connected);
    socket.on('move', function(move) {
        game.move(socket, io.sockets.connected, move);
    });

    socket.on('disconnect', function() {
        game.exit(socket, io.sockets.connected);
    })
});

// router
// =============================================================================

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

var exec = require('child_process').exec;

// receive json from git webhook
router.route('/push').post(function(req, res) {
    exec('git pull && sleep 5 && pm2 restart app', function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
    res.sendStatus(200);
});

app.use('/api', router);

http.listen(3000, function() {
    console.log('app running in port 3000');
})

module.exports = app;
