var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var randomNum = require('./public/random-num');

//globals
var rando = -1;
var objectToCheck = null;
var min = -1;
var max = -1;

// uses
app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// spin up server
app.listen( 3000, function(){
  console.log( 'server up on:', 3000 );
});

app.post('/game', function(req, res){
  var data = req.body;
  function checkFunc (number){
    number = parseInt(number);
    rando = parseInt(rando);
    if (number === rando){
      console.log('correct');
      return 'correct :)';
    } else if (number > rando && number <= max){
      console.log('high');
      return 'too high :/';
    } else if(number < rando && number >= min) {
      console.log('low');
      return 'too low :(';
    }
    else if (number > max){
      console.log('max indicator');
      return 'Entry out of bounds (too high)!! >:(';
    }
    else if(number < min){
      console.log('min indicator');
      return 'Entry out of bounds (too low)!! >:(';
    }
  } // end checkFunc
  objectToCheck = {
  firsty: checkFunc(data.first),
  secondy: checkFunc(data.second),
  thirdy: checkFunc(data.third),
  fourthy: checkFunc(data.fourth)
  };
});

app.post('/somethingElse', function (req, res) {
  console.log(req.body.min,req.body.max);
  rando = randomNum(parseInt(req.body.min), parseInt(req.body.max));
  min = req.body.min;
  max = req.body.max;
  console.log(rando);
  res.sendStatus(200);
});



app.get('/game', function(req, res){
  console.log('/game');
  //res.sendStatus(200);
  res.send(objectToCheck);
});
