
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

  var uidArray = [];
  // var playerCount = 0;
  var playerNode = [];
  var player1;
  var player2;

  var player = {
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
      // console.log(uid);
      //  set player info in datbase
      gameroom.child(player.name).set(player); 
  });

    //  load data from gameroom
    // gameroom.on("child_added", function(childSnapshot){
    //   //  player.name = childSnapshot.val().name;
    //   // console.log(childSnapshot.val());
    //   // console.log(childSnapshot.key);
    //   uid.push(childSnapshot.val().name);
    //   uidNode.push(childSnapshot.val());
    //   // console.log(uid);
    //   player1 = uid[0];
    //   player2 = uid[1];
    // }, function(errorObject) {
    // console.log("The read failed: " + errorObject.code);
    // });

    //  checking for player1 and player2
    gameroom.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        // console.log(childSnapshot.val());
        // console.log(childSnapshot.val().name);
        // console.log(childSnapshot.val().wins);
        let player = childSnapshot.val();
        // uid.key = childSnapshot.key;
        playerNode.push(player);
        // console.log(uid);
        // console.log(uidArray);
        // uidNode.push(childSnapshot.val());
        // console.log(uidNode);
        // console.log(uidNode[0]);
        // console.log(uidNode[1]);
        // if (childSnapshot.val().name = player1){
        //   console.log(childSnapshot.val());
        //   console.log(childSnapshot.val().name);
        //   console.log(childSnapshot.val().wins);
        // }
      });
      for (i=0; i < playerNode.length; i++) {
        console.log(playerNode[i]);
        // counts.push(keys[i].wordcount);
    }   

    }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
    });

});


// $('.playerInfo').empty();
// $('.playerInfo').append(`<div id='player'>${player.name}</div>`)
