var state = {
  games: []
}

$('document').ready(function () {

  $('.preloader').hide()

    // Your web app's Firebase configuration
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

  console.log(user)

  $('.card-display').on('doubleTap','.card', function(){
    $(this).children('i').addClass('heart-anim');

    var gameRef = state.games[$(this).attr('value')]
    console.log(gameRef);
    var id = gameRef.id;  
    var name = gameRef.name; 
    var price = gameRef.price; 
    var image = gameRef.image; 
    var desc = gameRef.description; 
    var release_date = gameRef.release_date;

    setObject = {
      name : name, 
      price : price , 
      image : image, 
      desc : desc, 
      release_date : release_date
      }

    database.ref(`${user.email.replace('@','').replace('.','')}/favourites/${id}`).set(setObject);
                                                    
  });
  $('.card-display').on('dblclick','.card', function(){
    $(this).children('i').addClass('heart-anim');
  });

  // $('.card-display').on('tap','.card', function(){
  //   $(this).children('i').attr({
  //     'data-toggle':'modal',
  //     'data-target':'.bd-example-modal-lg'
  //   })
  // });
  // $('.card-display').on('click','.card', function(){
  //   $(this).children('i').attr({
  //     'data-toggle':'modal',
  //     'data-target':'.bd-example-modal-lg'
  //   })
  // });


  $('.submit-button').on('click', function (e) {
    e.preventDefault();

    var categoryVal = $('#category-selector').val();
    var genreVal = $('#genre-selector').val();

    $('.preloader').show()

    $.ajax({
        url: `https://steam.cmandersen.com/apps?limit=9&random=1&category=${categoryVal}&genre=${genreVal}&free=0&_=${Date.now()}`,
        method: 'GET'
      })
      .then(function(resp){
        $('.preloader').hide()
        $('.card-display').empty()
        console.log(resp)
        if (resp.length !== 0) {
          resp.forEach((card, index) => {
            state.games.push(card);

            var appendCard = $('<div>').attr({
                class: 'card',
                value: index,
                id: card.id,
                "data-toggle": "modal",
                "data-toggle": ".bd-example-modal-lg"
              }).html(`<h5>${card.name.toUpperCase()}</h5><i class="fa fa-heart"></i>`)
              .css({
                'background-image': `url('${card.image}')`
              })

            $('.card-display').append(appendCard)
          })
        }
      })
      .fail(function(error){
        alert(error);
      })
  })

});