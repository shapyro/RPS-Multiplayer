
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
  var connectionsRef = database.ref("/connections");
  var connectedRef = database.ref(".info/connected");
  // var uidArray = [];
  // var uid;
  var playerCount = 0;
  // var playerNode = [];
  var player1;
  var player2;

  var player = {
    number: '',
    name: '',
    wins: '0',
    losses: '0',
    choice: ''
  }

  // connections
  connectedRef.on("value", function(snap){
    if (snap.val()) {
      
          // Add user to the connections list.
          var con = connectionsRef.push(true);
          console.log(snap.key);
          
          // Remove user from the connection list when they disconnect.
          con.onDisconnect().remove();

        }
  })

  connectionsRef.on("value", function(snap) {
    console.log(snap.numChildren())
    playerCount = snap.numChildren();
    console.log(playerCount);
    // console.log(snap.key);
    // uidArray.push(snap.key);
    
  });

  connectionsRef.on("child_added", function(snap) {
    console.log(snap.key);
    
  });
    
  $('#playerName').click(function() {
    $('#playerName').val('');
  });
  
  //  add player
  $('#submit').click(function(event){
    event.preventDefault();
    //  take player name from input
    player.name = $('#playerName').val().trim();
    //  set player info in datbase
    if (playerCount === 1){
      player.number = 1;
      // player.key = uidArray[0];
      gameroom.child("player1").set(player); 
    } else {
      player.number = 2;
      // player.key = uidArray[1];
      gameroom.child("player2").set(player);
    }
  });

  //  show game is in session if two players
  // if ($('#player2info').length){
  //   $("#playerID").empty();
  //   $("#playerID").append("<div id='session'>Game In Session</div>");
  // }

  //  checking for player1 and player2
  gameroom.on("value", function(snapshot){


  if (snapshot.child("player1").exists()){
    console.log(snapshot.val().player1);
    player1 = snapshot.val().player1;
    if ($('#player1info').length){
      $('#player1').html(`<div id='player1info'>${player1.name}</div>`)
      $('#player1').html(`<div id='player1info'>${player1.wins}</div>`)
      $('#player1').html(`<div id='player1info'>${player1.losses}</div>`)
    } else{
      $('#player1').append(`<div id='player1info'>${player1.name}</div>`)
      $('#player1').append(`<div id='player1info'>${player1.wins}</div>`)
      $('#player1').append(`<div id='player1info'>${player1.losses}</div>`)
    }
  }
  if (snapshot.child("player2").exists()){
    console.log(snapshot.val().player2);
    player2 = snapshot.val().player2;
    if ($('#player2info').length){
      $('#player2').html(`<div id='player1info'>${player2.name}</div>`)
      $('#player2').html(`<div id='player1info'>${player2.wins}</div>`)
      $('#player2').html(`<div id='player1info'>${player2.losses}</div>`)
    } else{
      $('#player2').append(`<div id='player2info'>${player2.name}</div>`)
      $('#player2').append(`<div id='player2info'>${player2.wins}</div>`)
      $('#player2').append(`<div id='player2info'>${player2.losses}</div>`)
    }
  }
                  
  });
  
});
