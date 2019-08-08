$('document').ready(function () {


  var firebaseConfig = {
    apiKey: "AIzaSyBQfhwOmLs8gR69DQayZ5pZpOpZTq2qw2I",
    authDomain: "dis-connect.firebaseapp.com",
    databaseURL: "https://dis-connect.firebaseio.com",
    projectId: "dis-connect",
    storageBucket: "",
    messagingSenderId: "25885376183",
    appId: "1:25885376183:web:d3e09c857764dc9d"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  database.ref(`${user.id}/favourites`).on("value", function (snapshot) {
    ;
    var ids = Object.keys(snapshot.val());
    var sv = snapshot.val();

    console.log(sv);
    console.log(ids);


    for (i = 0; i < ids.length; i++) {
      var id = ids[i];
      var game = sv[id];
      var desc = game.desc;
      var image = game.image;
      var name = game.name;
      var price = game.price;
      var release_date = game.release_date;
      console.log(release_date);


      $('#faves-section').append(
        ` <div class="card mb-3">
          <div class="row no-gutters">
              <div class="col-md-3">
                  <img src="${image}"
                      class="card-img" alt="...">
              </div>
              <div class="col-md-9">
                  <div class="card-body">
                      <h5 class="card-title">${name}</h5>
                      <p class="card-text price">${price}</p>
                      <p class="card-text release_date">${release_date}</p>

                  </div>
              </div>
                              
              </div>
          </div>
      </div>`)
    }



    $('#faves-section').append(appendFave);
  });


})


;