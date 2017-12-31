
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
    opponent: '',
    uid: '',
    number: '',
    name: '',
    wins: '0',
    losses: '0',
    choice: ''
  }

    
  $('#playerName').click(function() {
    $('#playerName').val('');
  });
  
  //  add player
  $('#submit').click(function(event){
    event.preventDefault();
    // $('#playerName').val('');

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).then(function() {

    return firebase.auth().signInAnonymously()})
    
    .then(function (data){
      // console.log("signed in");
      // console.log(data);

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  });
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    // return firebase.auth().signInWithEmailAndPassword(email, password);


  // })
  // .catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  // });

    

    //  connections
  connectedRef.on("value", function(snap){
    if (snap.val()) {
      
          // Add user to the connections list.
          var con = connectionsRef.push(true);
          // console.log(snap.key);
          
          // Remove user from the connection list when they disconnect.
          con.onDisconnect().remove();

        }
  });

  // connectionsRef.on("value", function(snap) {
  //   // console.log(snap.numChildren())
  //   playerCount = snap.numChildren();
  //   // console.log(playerCount);
  //   // console.log(snap.key);
  //   // uidArray.push(snap.key);
    
  // });

  // connectionsRef.on("child_added", function(snap) {
  //   // console.log(snap.key);
  // });
  //   //  take player name from input
  //   player.name = $('#playerName').val().trim();
  //   //  set player info in datbase
  //   if (playerCount === 1){
  //     player.number = 1;
  //     // player.key = uidArray[0];
  //     gameroom.child("player1").set(player); 
  //   } else {
  //     player.number = 2;
  //     // player.key = uidArray[1];
  //     gameroom.child("player2").set(player);
  //   }
  // });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      // console.log("UID: " + uid);
      // console.log(user);
      player.uid = uid;
      player.name = $('#playerName').val().trim();
      gameroom.push(player);
      gameroom.orderByChild("opponent").on("value", function(snap){
          
          console.log(snap.val());
          console.log(Object.keys(snap.val()).length);
          console.log(Object.keys(snap.val()));
          for (key in snap.val()) {
            // console.log(snap.val()[player]);
            var player = snap.val()[key];
            var opponent;
            console.log(player);
            console.log(player.opponent);

            if (player.opponent === "" && player.uid !== user.uid) {
              // player.opponent = this.uid;
              player.opponent = user.uid;
              console.log (player);
              // gameroom.set(player);
            } 
            if (user.uid === player.opponent) {
              // player.opponent = player.uid
              console.log(player)
              console.log(player.uid)
              opponent = player.uid;
              console.log(opponent)
            }
            if (user.uid === player.uid) {
              player.opponent = opponent;
              console.log(player);
            }

          }
    
            
          //   console.log(snap.val());
          // }
          //  iterate through data
          //  check each player for opponent
          //  if any player has no opponent, then input current player's uid
          //    player.opponent = this uid
          //  exit loop once player is found (break)
        
          //  condition before adding player
          //  gameroom.push(player);
        });
      // ...
    } else {
      // User is signed out.
      console.log("signed out");
    }
    // ...
  });

  // firebase.auth().signOut().then(function() {
  //   // Sign-out successful.
  //   var user = firebase.auth().currentUser;

  //   user.delete().then(function() {
  //   // User deleted.
  //   }).catch(function(error) {
  //   // An error happened.
  //   });

  // });
});
