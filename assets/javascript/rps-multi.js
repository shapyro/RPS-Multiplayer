//  enter username
//    write to Firebase
//    write to DOM
//    log who is connected
//  pick Rock Paper OR Scissors
//    write to Firebase
//    write to DOM
//    Which Player won?
//      display winner
//  Display Who won
//    Track Wins
//    Track Losses
//    Show which choice trumped the other
//  --------------------------------------
//  is there a timer?
//    click draw for who wins most clicks in 10 seconds?
//  is there a chat app
//  
$(document).ready(function(){

  //  dbconfig
  var config = {
    apiKey: "AIzaSyDnH8rHXPVRXREfAZd6fltrfQDvliOScV8",
    authDomain: "rps-multiplayer-c3f4a.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-c3f4a.firebaseio.com",
    projectId: "rps-multiplayer-c3f4a",
    storageBucket: "rps-multiplayer-c3f4a.appspot.com",
    messagingSenderId: "334508367375"
  };
  firebase.initializeApp(config);

  //  establish db
  var database = firebase.database();
  // var chats = database.ref("chat");
  var connections = database.ref("/connected");

  // '.info/connected' is a special location provided by Firebase that is updated every time
  // the client's connection state changes.
  // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
  // var connectedRef = database.ref(".info/connected");

  var player = {
    number: '0',
    name: '',
    wins: '0',
    losses: '0',
    choice: ''
  }

  var opponent = {
    number: '0',
    name: '',
    wins: '0',
    losses: '0',
    choice: ''
  }

  $('#playerName').click(function() {
    $('#playerName').val('');
  });

  $('#submit').click(function(event){

      //  take player name from input
      player.name = $('#playerName').val().trim();
      player.number = number
      //  set player info in datbase
      database.ref("/gameroom").push(player);  
      $('.playerInfo').empty();
      $('.playerInfo').append(`<div id='player'>${player.name}</div>`)
  
  
    // opponent.name = $('#playerName').val().trim();
    // //  set opponent info in datbase
    // database.ref().push(opponent);  
    // $('.playerInfo').empty();
    // $('.playerInfo').append(`<div id='opponent'>${opponent.name}</div>`);


    database.ref("/gameroom").on("child_added", function(childSnapshot){
      player.name = childSnapshot.val().name;
      console.log(childSnapshot.key);
      // console.log(childSnapshot.key().name);
    }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
    });

  });

  $('#resetDB').on('click', function(){
    clearDB();
  })

  function clearDB(){
    database.remove(childSnapshot);
    // database.childSnapshot.key.remove();
  }

});