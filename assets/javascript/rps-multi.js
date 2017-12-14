
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
  var uidArray = [];
  var uid;
  var playerCount = 0;
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

  // connections
  connectedRef.on("value", function(snap){
    if (snap.val()) {
      
          // Add user to the connections list.
          var con = connectionsRef.push(true);
      
          // Remove user from the connection list when they disconnect.
          con.onDisconnect().remove();

        }
  })

  connectionsRef.on("value", function(snap) {
    
      // Display the viewer count in the html.
      // The number of online users is the number of children in the connections list.
      // $("#watchers").text(snap.numChildren());
      console.log(snap.numChildren())
      playerCount = snap.numChildren();
      console.log(playerCount);
    });

    //  load data from gameroom
    // gameroom.on("child_added", function(childSnapshot){
      //  player.name = childSnapshot.val().name;
      // console.log(childSnapshot.val());
      // console.log(childSnapshot.key);
      // let player = childSnapshot.val();
      // let uid = childSnapshot.key;
      // playerNode.push(player);
      // uidArray.push(uid);

      // if (playerNode[0]){
      //   let player1Name = playerNode[0].name;
      //   let player1Wins = playerNode[0].wins;
      //   let player1Losses = playerNode[0].losses;
      //   $('#player1').append(`<div id='playerinfo'>${player1Name}</div>`)
      //   $('#player1').append(`<div id='playerinfo'>${player1Wins}</div>`)
      //   $('#player1').append(`<div id='playerinfo'>${player1Losses}</div>`)
      // }

      // uid.push(childSnapshot.val().name);
      // uidNode.push(childSnapshot.val());
      // // console.log(uid);
      // player1 = uid[0];
      // player2 = uid[1];
    // }, function(errorObject) {
    // console.log("The read failed: " + errorObject.code);
    // });


      // for (i=0; i < playerNode.length; i++) {
      //   console.log(playerNode[i]);
      //   console.log(playerNode[i].name)
      //   console.log(playerNode[i].wins)
      //   console.log(playerNode[i].losses)

        // while (i < 2){
          // if (playerNode.name = uidArray[0]){
          // $('#player1').append(`<div id='playerinfo'>${playerNode.name}</div>`)
          // console.log(playerNode.name);
          // $('#player1').append(`<div id='playerinfo'>wins ${playerNode.wins}</div>`)
          // $('#player1').append(`<div id='playerinfo'>losses ${playerNode.losses}</div>`)
          // player1 = playerNode.name;
          // console.log(playerNode[i].losses);
          // // wins = playerNode.wins;
          // // losses = playerNode.losses;
          // console.log("player1 is " + player1);
          // console.log("wins " + wins);
          // console.log("losses " + losses);
        // }
        // if (playerNode.name = uidArray[1]){
        //   $('#player2').append(`<div id='playerinfo'>${playerNode.name}</div>`)
        //   console.log(playerNode.name);
        //   // player2 = playerNode.name;
        //   // // wins = playerNode.wins;
        //   // // losses = playerNode.losses;
        //   // console.log("player2 is " + player2);
        //   // console.log("wins " + wins);
        //   // console.log("losses " + losses);
        // }
        // i++;
      // }

        // counts.push(keys[i].wordcount);
    // }   

    // if (playerNode.legth === 1){
    //   console.log(playerNode[0]);
    //   console.log(playerNode[0].name);
    //   let player1Name = playerNode[0].name;
    //   let player1Wins = playerNode[0].wins;
    //   let player1Losses = playerNode[0].losses;
    //   $('#player1').append(`<div id='playerinfo'>${player1Name}</div>`)
    //   $('#player1').append(`<div id='playerinfo'>${player1Wins}</div>`)
    //   $('#player1').append(`<div id='playerinfo'>${player1Losses}</div>`)
    // }

    // if (playerNode.length === 2){
    //   console.log(playerNode[1]);
    //   console.log(playerNode[1].name);
    //   let player2Name = playerNode[1].name;
    //   let player2Wins = playerNode[1].wins;
    //   let player2Losses = playerNode[1].losses;
    //   $('#player2').append(`<div id='playerinfo'>${player2Name}</div>`)
    //   $('#player2').append(`<div id='playerinfo'>${player2Wins}</div>`)
    //   $('#player2').append(`<div id='playerinfo'>${player2Losses}</div>`)
    // }

    // console.log(playerNode);
    // $('#player1').html(`<div id='playerinfo'>${playerNode[0].name}</div>`)
    // $('#player2').html(`<div id='playerinfo'>${playerNode[1]}</div>`)


    // console.log(playerNode);
    // console.log(uidArray);
    // $('#player1').html(`<div id='playerinfo'>${playerNode[0].name}</div>`)
    // $('#player2').html(`<div id='playerinfo'>${playerNode[1](1)}</div>`)

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
          gameroom.child("player1").set(player); 
        } else {
          gameroom.child("player2").set(player); 
        }
    });

        //  checking for player1 and player2
        gameroom.on("value", function(snapshot){
          if (snapshot.child("player1").exists()){
            console.log(snapshot.val().player1);
            player1 = snapshot.val().player1;
            $('#player1').append(`<div id='playerinfo'>${player1.name}</div>`)
            $('#player1').append(`<div id='playerinfo'>${player1.wins}</div>`)
            $('#player1').append(`<div id='playerinfo'>${player1.losses}</div>`)

          }
          if (snapshot.child("player2").exists()){
            console.log(snapshot.val().player2);
            player2 = snapshot.val().player2;
            $('#player2').append(`<div id='playerinfo'>${player2.name}</div>`)
            $('#player2').append(`<div id='playerinfo'>${player2.wins}</div>`)
            $('#player2').append(`<div id='playerinfo'>${player2.losses}</div>`)
          }
          
          // snapshot.forEach(function(childSnapshot){
          //   // console.log(childSnapshot.val());
          //   // console.log(childSnapshot.val().name);
          //   // console.log(childSnapshot.val().wins);
          //   player = childSnapshot.val();
          //   uid = childSnapshot.key;
          //   playerNode.push(player);
          //   uidArray.push(uid);
          //   console.log(playerNode);
          //   console.log(uidArray);
            

          //   // console.log(uidArray[0]);
          //   // console.log(uidArray[1]);
          //   // player1 = (playerNode[0]);
          //   // player2 = (playerNode[1]);
          //   // console.log(player1);
          //   // console.log(player2);

          //   // console.log(uidArray);
          //   // uidNode.push(childSnapshot.val());
          //   // console.log(uidNode);
          //   // console.log(uidNode[0]);
          //   // console.log(uidNode[1]);
          //   // if (childSnapshot.val().name = player1){
          //   //   console.log(childSnapshot.val());
          //   //   console.log(childSnapshot.val().name);
          //   //   console.log(childSnapshot.val().wins);
          //   // }
          // // }, function(errorObject) {
          // //   console.log("The read failed: " + errorObject.code);
          //   });

            
          });
});


// $('.playerInfo').empty();
// $('.playerInfo').append(`<div id='player'>${player.name}</div>`)
