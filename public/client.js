$(document).ready(onReady);
console.log('in client');
var count = 0;


function onReady(){
  $('#start').on('click', startGame);
  $('.container').on('click','#submit',submit);
  $('.quit').on('click','#quit',quitFunction);
  $("#autoplay").get(0).play();
} // end onReady

function startGame() {
  $('.container').append('<p><input name="Player One" type="text" id="first" value=""><span id="firsty"></span></p>');
  $('.container').append('<p><input name ="Player Two" type="text" id="second" value=""><span id="secondy"></span></p>');
  $('.container').append('<p><input name="Player Three" type="text" id="third" value=""><span id="thirdy"></span></p>');
  $('.container').append('<p><input name="Player Four" type="text" id="fourth" value=""><span id="fourthy"></span></p>');
  $('.container').append('<button type="button" id="submit">Submit</button>');
  $('.quit').append('<button type="button" id="quit">Abandon/Quit Game</button>');
  $('.quit').append('<p>Total guesses: <span id="count">0</span></p>');
  var range = [0];
  if ($('.drop-down').val()=== 'small') {
    range.push(10);
  } else if ($('.drop-down').val()=== 'medium') {
    range.push(100);
  } else {
    range.push(1000);
  }
  var rando = range;
  console.log(rando);
  var numberToSend = {min: range[0], max: range[1]};
  console.log(numberToSend);

  $.ajax({
    url: '/somethingElse',
    method: 'POST',
    data: numberToSend,
    success: function(response){
      console.log(response);
    }
  });
} // end startGame


function submit(){
  count += 4;
  if(count > 12){
    quitFunction();
  }
  $('#count').text(count);
  var objectToSend = {
    first: $('#first').val(),
    second: $('#second').val(),
    third: $('#third').val(),
    fourth: $('#fourth').val()
  };

  $.ajax({
    url: '/game',
    method: 'POST',
    data: objectToSend,
    success: function (response) {
      console.log (response);
    }
  });

  // won't have the vals yet.?.
  $.ajax({
    url: '/game',
    method: 'GET',
    success: function(response){
      console.log(response);
      $('#firsty').text(' '+ response.firsty);
      $('#secondy').text(' ' + response.secondy);
      $('#thirdy').text(' ' + response.thirdy);
      $('#fourthy').text(' ' + response.fourthy);

    }
  });
} // end submit

function quitFunction(){
  $('.container').empty();
  $('.quit').empty();
  count = 0;
} // end quitFunction
