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
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {
  // console.log(snap.numChildren());

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#watchers").text(snap.numChildren());
});

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
    // playerList.push(playerName);
    $('#playerName').val('');
    var connectedRef = database.ref(".info/connected");
    // console.log(connectedRef.key);

    $.extend(playerInfo,{status: connectedRef.key});
    // console.log(playerInfo);
    database.ref().push(playerInfo);  
    

  database.ref().on("child_added", function(childSnapshot, prevChildKey){
    // console.log(childSnapshot.key);
    // console.log(childSnapshot.val().name);
    // console.log(childSnapshot.key());
    var playerName = childSnapshot.val().name;// .name;
    var playerID = childSnapshot.key;


    $('.playerInfo').empty();
    $('.playerInfo').append(`<h1>${playerName}</h1>`);
    }, function(errorObject) {
     console.log("The read failed: " + errorObject.code);
  });
  };
});

});