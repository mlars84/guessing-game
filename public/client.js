$(document).ready(onReady);
console.log('in client');


function onReady(){
  $('#start').on('click', startGame);
  $('.container').on('click','#submit',submit);
} // end onReady

function startGame() {
  $('.container').append('<p><input type="text" id="first" value=""></p>');
  $('.container').append('<p><input type="text" id="second" value=""></p>');
  $('.container').append('<p><input type="text" id="third" value=""></p>');
  $('.container').append('<p><input type="text" id="fourth" value=""></p>');
  $('.container').append('<button type="button" id="submit">Submit</button>');
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
      $('.container').append(response.firsty);
    }
  });

  $.ajax({
    url: '/somethingElse',
    method: 'GET',
    success: function(response){
      console.log(response);
    }

  });
} // end submit
