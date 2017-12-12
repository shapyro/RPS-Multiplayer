
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
    apiKey: "AIzaSyBcYypDm_8zwvKXYzCacsL05Bw1wevMktI",
    authDomain: "rps-round2.firebaseapp.com",
    databaseURL: "https://rps-round2.firebaseio.com",
    projectId: "rps-round2",
    storageBucket: "rps-round2.appspot.com",
    messagingSenderId: "491313456890"
  };
  firebase.initializeApp(config);

  //  establish db
  var database = firebase.database();
  var gameroom = database.ref("/gameroom");

  var uid = [];
  playerCount = 0;

  var player = {
    number: '0',
    name: '',
    wins: '0',
    losses: '0',
    choice: ''
  }

  // var opponent = {
  //   number: '0',
  //   name: '',
  //   wins: '0',
  //   losses: '0',
  //   choice: ''
  // }

  $('#playerName').click(function() {
    $('#playerName').val('');
  });

  $('#submit').click(function(event){
      //  take player name from input
      player.name = $('#playerName').val().trim();
      // console.log(uid);
      //  set player info in datbase
      gameroom.child(player.name).set(player); 
      $('.playerInfo').empty();
      $('.playerInfo').append(`<div id='player'>${player.name}</div>`)
  
  
    // opponent.name = $('#playerName').val().trim();
    // //  set opponent info in datbase
    // database.ref().push(opponent);  
    // $('.playerInfo').empty();
    // $('.playerInfo').append(`<div id='opponent'>${opponent.name}</div>`);
  });

    //  pull data from gameroom
    gameroom.on("child_added", function(childSnapshot){
      player.name = childSnapshot.val().name;
      console.log(player.name);
      console.log(childSnapshot.key);
      
    }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
    });


    gameroom.on("value", function(snapshot){
      // console.log(player);
      console.log(snapshot.key);
      console.log(snapshot.val());
      // console.log(snapshot.val();
      // uid.push(snapshot.key);
    }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
    });

});
