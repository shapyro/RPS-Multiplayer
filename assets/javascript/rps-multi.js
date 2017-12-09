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
//  is there a chat app

var config = {
  apiKey: "AIzaSyDnH8rHXPVRXREfAZd6fltrfQDvliOScV8",
  authDomain: "rps-multiplayer-c3f4a.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-c3f4a.firebaseio.com",
  projectId: "rps-multiplayer-c3f4a",
  storageBucket: "rps-multiplayer-c3f4a.appspot.com",
  messagingSenderId: "334508367375"
};
firebase.initializeApp(config);

var database = firebase.database();

var wins = 0;
var losses = 0;

$(document).ready(function(){

  $('#playerName').click(function() {
    $('#playerName').val('');
  });

  //  Enter Player Name
  $('#submit').click(function(event){
    event.preventDefault();

    var playerName = $('#playerName').val().trim();

    var playerInfo = {
      name: playerName
    };

    //  set playerInfo
    database.ref().set(playerInfo);
    
    $('#playerName').val('');

  });
    
  //  write player name to db and DOM
  database.ref().on("value", function(snapshot){
    console.log(snapshot);
    var playerName = snapshot.val().name;
    console.log(playerName);
    $('#playerInfo').empty();
    $('#playerInfo').append(`<h1>${playerName}</h1>`);

    }, function(errorObject) {
     console.log("The read failed: " + errorObject.code);
  });

});