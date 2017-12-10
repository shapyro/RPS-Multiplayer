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

var wins = 0;
var losses = 0;
var num_players = 2;
//  var playerName;
var playerList = [];

//  get DOM ready for clicks
$(document).ready(function(){

  $('#playerName').click(function() {
    $('#playerName').val('');
  });

  //  Enter Player Name
  $('#submit').click(function(event){
    event.preventDefault();
    if (playerList.length <= 2){

    var playerName = $('#playerName').val().trim();
    var playerInfo = {
      name: playerName,
    };
    
    //  set playerInfo
    //  Array maybe in firebase?
    database.ref().push(playerInfo);  
    $('#playerName').val('');

  database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.key);
    console.log(childSnapshot.val());
    // console.log(childSnapshot.key());
    var playerName = childSnapshot.val().name;// .name;

    $('.playerInfo').empty();
    $('.playerInfo').append(`<h1>${playerName}</h1>`);
    }, function(errorObject) {
     console.log("The read failed: " + errorObject.code);
  });
  };
});

});